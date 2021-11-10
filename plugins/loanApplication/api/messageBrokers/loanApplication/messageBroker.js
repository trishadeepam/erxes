import { isUndefined } from 'lodash'
import actionMap from './messageBrokerActions'
const sendError = message => ({
  status: 'error',
  errorMessage: message
})

const sendSuccess = (data) => {
  const response = {
    status: 'success',
    data
  }
  return response
}
/*
data should contain {
  user: ...
  customer / company / loanApplication / deal etc
}
*/
const init = resolvers => {
  const handler = async (message, context) => {
    const { action, data } = message
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(action)
    if (isUndefined(actionMap[action])) {
      return sendError(`ACTION_NOT_SUPPORTED ${action}`)
    }
    try {
      const response = await actionMap[action].handler(data, resolvers, context)
      return sendSuccess(response, action)
    } catch (e) {
      return sendError(e.message)
    }
    // send response
  } // message broker handler
  return {
    method: 'RPCQueue',
    channel: 'integrations:loanApplication',
    handler: handler
  }
}

export default {
  init,
  channel: 'integrations:loanApplication'
}
