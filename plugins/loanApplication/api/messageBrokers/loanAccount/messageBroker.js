import { isUndefined } from 'lodash'
import actionMap from './messageBrokerActions'
const sendError = message => ({
  status: 'error',
  errorMessage: message
})

const sendSuccess = data => ({
  status: 'success',
  data
})
/*
data should contain {
  user: ...
  customer / company / loanApplication / deal etc
}
*/
const init = resolvers => {
  const handler = async (message, context) => {
    const { action, data } = message
    if (isUndefined(actionMap[action])) {
      return sendError('ACTION_NOT_SUPPORTED')
    }
    try {
      const response = await actionMap[action].handler(data, resolvers, context)
      return sendSuccess(response)
    } catch (e) {
      return sendError(e.message)
    }
    // send response
  } // message broker handler
  return {
    method: 'RPCQueue',
    channel: 'integrations:loanAccount',
    handler: handler
  }
}

export default {
  init,
  channel: 'integrations:loanAccount'
}
