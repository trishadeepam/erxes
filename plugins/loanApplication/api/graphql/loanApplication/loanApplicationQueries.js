import { APPLICATION_STATUSES } from '../../pluginConstants'
import { values } from 'lodash'
// FIXME: We can introduce permissions later
const getLoanApplication = async (root, args, ctxt) => {
  const {
    models,
    memoryStorage,
    graphqlPubsub,
    checkLogin,
    checkPermission,
    messageBroker,
    logUtils,
    ...context // Graphql context
  } = ctxt

  const { user, commonQuerySelector } = context
  checkLogin(user)
  const { _id, applicationNumber } = args
  try {
    let application
    if (_id) {
      application = await models.LoanApplications.findOne({ _id })
      return application
    } else if (applicationNumber) {
      application = await models.LoanApplications.findOne({ applicationNumber })
    }
    return application
  } catch (e) {
    throw new Error(e.message)
  }
}
const getLoanApplications = async (root, args, ctxt) => {
  const {
    models,
    memoryStorage,
    graphqlPubsub,
    checkLogin,
    checkPermission,
    messageBroker,
    logUtils,
    ...context // Graphql context
  } = ctxt
  const { user } = context
  const { status } = args
  checkLogin(user)
  try {
    if (values(APPLICATION_STATUSES.ACTIVE).indexOf(status) === -1) {
      throw new Error('APPLICATION_STATUS_NOT_VALID')
    }
    const query = { applicationStatus: status }
    const activeApplications = await models.LoanApplications.find(query)
    return activeApplications
  } catch (e) {
    throw new Error(e.message)
  }
}

export default [
  {
    name: 'getLoanApplication',
    handler: getLoanApplication
  },
  {
    name: 'getLoanApplications',
    handler: getLoanApplications
  }
]
