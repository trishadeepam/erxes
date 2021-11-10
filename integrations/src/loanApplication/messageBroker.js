import { isUndefined, isNull } from 'underscore'
import messageBroker from 'erxes-message-broker'
import { debugError, debugLoanApplication } from '../debuggers'
import {
  REQUEST_KINDS,
  LOAN_APPLICATION_QUEUE,
  LOAN_APPLICATION_QUEUE_RESPONSE,
  INTEGRATION_PLUGIN_QUEUE
} from './constants'
import { SUPPORTED_ACTIONS } from './messageBrokerActions'
import { LosInterationLogs } from './models'
import { Integrations } from '../models'
let rabbitMqClient
const getMessageBrokerClient = async app => {
  if (isUndefined(rabbitMqClient)) {
    rabbitMqClient = await messageBroker({
      name: 'los-integration',
      app,
      envs: process.env
    })
  }
  return rabbitMqClient
}
const sendError = async (message, errorMessage, sendResponseMessage) => {
  await LosInterationLogs.create({
    kind: message.kind,
    requestKind: REQUEST_KINDS.MESSAGE,
    action: message.action,
    request: message,
    response: {
      status: 'error',
      errorMessage
    }
  })
  await sendResponseMessage({
    status: 'error',
    errorMessage,
    requestData: message
  })
}
const sendSuccess = async (message, response, sendResponseMessage) => {
  await LosInterationLogs.create({
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
const initLosMessageBroker = async app => {
  const client = await getMessageBrokerClient()
  const { consumeQueue, sendMessage, sendRPCMessage } = client
  // Listed to loan account related messages
  const sendResponseMessage = async (responseMsg) => {
    try {
      await sendMessage(LOAN_APPLICATION_QUEUE_RESPONSE, responseMsg)
    } catch (e) {
      console.log(e.stack)
    }
  }
  await consumeQueue(LOAN_APPLICATION_QUEUE, async message => {
    let { action, data, messageQueueToken, kind, userId } = message
    if (!isUndefined(SUPPORTED_ACTIONS[action])) {
      debugLoanApplication(
        `Recieved action: ${action}, kind:${kind}, userId:${userId} token: ${messageQueueToken}`
      )
      try {
        const integration = await Integrations.findOne({ kind })
        // This message is for us
        if (isNull(integration)) {
          debugError('INTEGRATON_NOT_DEFINED_FOR_KIND')
          return sendError(message, 'INTEGRATON_NOT_DEFINED_FOR_KIND', sendResponseMessage)
        }
        // Validate the data coming
        try {
          const validationSchema = SUPPORTED_ACTIONS[action].schema
          data = SUPPORTED_ACTIONS[action].preProcessor(
            data,
            action,
            validationSchema
          )
        } catch (e) {
          console.log(e.stack)
          debugError(`Recieved action: ${action}, kind:${kind}, ${e.message}`)
          return sendError(message, e.message, sendResponseMessage)
        }

        data.userId = userId
        data.integrationId = integration._id
        try {
          const messageResponse = await sendRPCMessage(
            INTEGRATION_PLUGIN_QUEUE,
            {
              data,
              action
            }
          )
          const response = SUPPORTED_ACTIONS[action].postProcessor(messageResponse)
          // Log the request
          return sendSuccess(message, response, sendResponseMessage)
        } catch (e) {
          debugError(`action: ${action}, errorMessage: ${e.message}`)
          return sendError(message, e.message, sendResponseMessage)
        }
      } catch (e) {
        console.log(e.stack)
      }
    }
  })
  debugLoanApplication(`Listening messages on ${LOAN_APPLICATION_QUEUE}`)
}

export default initLosMessageBroker
