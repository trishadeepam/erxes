import mutationUtils from './mutationUtils'

const editLoanApplication = async (root, args, ctxt) => {
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
  checkLogin(user)
  try {
    return mutationUtils.editApplication(models, user, args, logUtils)
  } catch (e) {
    throw new Error(e.message)
  }
}
const deleteLoanApplication = async (root, args, ctxt) => {
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
  checkLogin(user)
  try {
    return mutationUtils.deleteApplication(models, user, args, logUtils)
  } catch (e) {
    throw new Error(e.message)
  }
}
const createLoanApplication = async (root, args, ctxt) => {
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
  checkLogin(user)
  try {
    return mutationUtils.createApplication(models, user, args, logUtils)
  } catch (e) {
    throw new Error(e.message)
  }
}

export default [
  {
    name: 'createLoanApplication',
    handler: createLoanApplication
  },
  {
    name: 'editLoanApplication',
    handler: editLoanApplication
  },
  {
    name: 'deleteLoanApplication',
    handler: deleteLoanApplication
  }
]
