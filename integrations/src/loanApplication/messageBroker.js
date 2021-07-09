import { isUndefined, isNull } from 'underscore'
import messageBroker from 'erxes-message-broker'
import { debugError, debugLoanApplication } from '../debuggers'
import {
  REQUEST_KINDS,
  RPC_LOAN_APPLICATION_QUEUE,
  RPC_LOAN_APPLICATION_QUEUE_RESPONSE,
  INTEGRATION_PLUGIN_QUEUE
} from './constants'
import SUPPORTED_ACTIONS from './messageBrokerActions'
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
const sendError = async (message, errorMessage) => {
  await LosInterationLogs.create({
    kind: message.kind,
    requestKind: REQUEST_KINDS.RPC,
    action: message.action,
    request: message,
    response: {
      status: 'error',
      errorMessage
    }
  })
  return {
    status: 'error',
    errorMessage,
    requestData: message
  }
}
const sendSuccess = async (message, response) => {
  await LosInterationLogs.create({
    kind: message.kind,
    requestKind: REQUEST_KINDS.RPC,
    action: message.action,
    request: message,
    response
  })
  return {
    status: 'success',
    response,
    requestData: message
  }
}
const initLosMessageBroker = async app => {
  const client = await getMessageBrokerClient()
  const { consumeQueue, sendMessage, sendRPCMessage } = client
  // Listed to loan account related messages
  await consumeQueue(RPC_LOAN_APPLICATION_QUEUE, async message => {
    let { action, data, messageQueueToken, kind, userId } = message
    debugLoanApplication(`Recieved action: ${action}, kind:${kind}, userId:${userId} token: ${messageQueueToken}`)
    const integration = await Integrations.findOne({ kind })
    // This message is for us
    if (isNull(integration)) {
      debugError('INTEGRATON_NOT_DEFINED_FOR_KIND')
      return sendMessage(RPC_LOAN_APPLICATION_QUEUE_RESPONSE, sendError(message, 'INTEGRATON_NOT_DEFINED_FOR_KIND'))
    }
    // try {
    //   await utils.verifyMessageQueueToken(messageQueueToken, kind)
    // } catch (e) {
    //   debugError(e.message)
    //   return sendError(e.message)
    // }
    if (isUndefined(SUPPORTED_ACTIONS[action])) {
      debugError(`action: ${action}, kind:${kind}, ACTION_NOT_SUPPORTED`)
      return sendMessage(RPC_LOAN_APPLICATION_QUEUE_RESPONSE, sendError(message, 'ACTION_NOT_SUPPORTED'))
    }
    // Validate the data coming
    data.integrationId = integration._id
    data.userId = userId
    try {
      const validationSchema = SUPPORTED_ACTIONS[action].schema
      data = SUPPORTED_ACTIONS[action].preProcessor(
        data,
        action,
        validationSchema
      )
    } catch (e) {
      debugError(`Recieved action: ${action}, kind:${kind}, ${e.message}`)
      return sendMessage(RPC_LOAN_APPLICATION_QUEUE_RESPONSE, sendError(message, e.message))
    }
    const messageResponse = await sendRPCMessage(INTEGRATION_PLUGIN_QUEUE, {
      data,
      action
    })
    let response
    if (messageResponse.error) {
      debugError(`action: ${action}, errorMessage: ${response.errorMessage}`)
      return sendMessage(RPC_LOAN_APPLICATION_QUEUE_RESPONSE, sendError(message, messageResponse.error))
    } else {
      response = SUPPORTED_ACTIONS[action].postProcessor(messageResponse)
    }
    // Log the request
    return sendMessage(RPC_LOAN_APPLICATION_QUEUE_RESPONSE, sendSuccess(message, response))
  })
  debugLoanApplication(`Listening messages on ${RPC_LOAN_APPLICATION_QUEUE}`)
}

export default initLosMessageBroker
