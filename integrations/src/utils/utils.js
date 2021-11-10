import { isNull } from 'underscore'
import { LosIntergation } from './models'
const verifyMessageQueueToken = async (messageQueueToken, kind) => {
  const integration = await LosIntergation.findOne({
    kind,
    messageQueueToken
  })
  if (isNull(integration)) {
    throw new Error('MESAGE_TOKEN_INVALID')
  }
}
const verifyToken = async (apiToken, kind) => {
  const integration = await LosIntergation.findOne({
    kind,
    apiToken
  })
  if (isNull(integration)) {
    throw new Error('API_TOKEN_INVALID')
  }
}
const validateData = (data, schema) => {
  return true
}
export default {
  verifyMessageQueueToken,
  verifyToken,
  validateData
}
