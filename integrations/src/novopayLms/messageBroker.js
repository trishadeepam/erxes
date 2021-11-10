import { isUndefined, isNull } from 'underscore'
import messageBroker from 'erxes-message-broker'
import { debugError, debugLoan } from '../debuggers'
import {
  REQUEST_KINDS,
  LOAN_APPLICATION_QUEUE,
  LOAN_APPLICATION_QUEUE_RESPONSE,
  LOAN_PLUGIN_QUEUE,
  LOAN_APPLICATION_PLUGIN_QUEUE
} from './constants'
import { SUPPORTED_ACTIONS } from './messageBrokerActions'
import { LmsInterationLogs } from './models'
import { Integrations } from '../models'
let rabbitMqClient
const getMessageBrokerClient = async app => {
  if (isUndefined(rabbitMqClient)) {
    rabbitMqClient = await messageBroker({
      name: 'lms-integration',
      app,
      envs: process.env
    })
  }
  return rabbitMqClient
}
const sendError = async (
  message,
  errorMessage,
  errorCode,
  sendResponseMessage
) => {
  await LmsInterationLogs.create({
    kind: message.kind,
    requestKind: REQUEST_KINDS.MESSAGE,
    action: message.action,
    request: message,
    response: {
      status: 'error',
      errorMessage,
      errorCode
    }
  })
  await sendResponseMessage({
    status: 'error',
    errorMessage,
    requestData: message
  })
}
const sendSuccess = async (message, response, sendResponseMessage) => {
  await LmsInterationLogs.create({
    kind: message.kind,
    requestKind: REQUEST_KINDS.MESSAGE,
    action: message.action,
    request: message,
    response
  })
  await sendResponseMessage({
    status: 'success',
    response,
    requestData: message
  })
}
const initLmsMessageBroker = async app => {
  const client = await getMessageBrokerClient()
  const { consumeQueue, sendMessage, sendRPCMessage } = client
  const sendResponseMessage = async responseMsg => {
    try {
      await sendMessage(LOAN_APPLICATION_QUEUE_RESPONSE, responseMsg)
    } catch (e) {
      console.log(e.stack)
    }
  }
  await consumeQueue(LOAN_APPLICATION_QUEUE, async message => {
    let { action, data, messageQueueToken, kind, userId } = message
    if (!isUndefined(SUPPORTED_ACTIONS[action])) {
      try {
        debugLoan(
          `Recieved action: ${action}, kind:${kind}, userId:${userId} token: ${messageQueueToken}`
        )
        const integration = await Integrations.findOne({ kind })
        console.log(integration)
        // This message is for us
        if (isNull(integration)) {
          debugError('INTEGRATON_NOT_DEFINED_FOR_KIND')
          return sendError(
            message,
            'INTEGRATON_NOT_DEFINED_FOR_KIND',
            undefined,
            sendResponseMessage
          )
        }
        // Callback used to get data from loan entity
        const loanCallback = async (data, action) => {
          data.userId = userId
          data.integrationId = integration._id
          try {
            const rpcResponse = await sendRPCMessage(LOAN_PLUGIN_QUEUE, {
              data,
              action
            })
            return rpcResponse
          } catch (e) {
            return {
              status: 'error',
              errorMessage: e.message
            }
          }
        }
        // callback to load data from loanApplication entity
        const loanApplicationCallback = async (data, action) => {
          data.userId = userId
          data.integrationId = integration._id
          try {
            const rpcResponse = await sendRPCMessage(
              LOAN_APPLICATION_PLUGIN_QUEUE,
              {
                data,
                action
              }
            )
            return rpcResponse
          } catch (e) {
            console.log(e.stack)
            return {
              status: 'error',
              errorMessage: e.message
            }
          }
        }
        // Validate the data coming
        try {
          const validationSchema = SUPPORTED_ACTIONS[action].schema
          data = await SUPPORTED_ACTIONS[action].preProcessor(
            data,
            action,
            validationSchema,
            loanApplicationCallback,
            loanCallback
          )
        } catch (e) {
          debugError(`Recieved action: ${action}, kind:${kind}, ${e.message}`)
          return sendError(message, e.message, e.code, sendResponseMessage)
        }
        let response
        try {
          const messageResponse = await SUPPORTED_ACTIONS[action].executeAction(
            data,
            loanApplicationCallback,
            loanCallback
          )
          if (messageResponse.status === 'error') {
            debugError(
              `action: ${action}, errorMessage: ${messageResponse.errorMessage}`
            )
            return sendError(
              message,
              messageResponse.errorMessage,
              messageResponse.code,
              sendResponseMessage
            )
          } else {
            response = SUPPORTED_ACTIONS[action].postProcessor(messageResponse)
            return sendSuccess(message, response, sendResponseMessage)
          }
        } catch (e) {
          return sendError(message, e.message, e.code, sendResponseMessage)
        }
      } catch (e) {
        console.log(e.stack)
        await sendError(message, e.message, e.code, sendResponseMessage)
      }
    }
    // Log the request
  })
  debugLoan(`Listening messages on ${LOAN_APPLICATION_QUEUE}`)
}

export default initLmsMessageBroker
