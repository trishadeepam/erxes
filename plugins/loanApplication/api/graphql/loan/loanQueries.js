import { isNull } from 'lodash'
// FIXME: We can introduce permissions later
const getLoan = async (root, args, ctxt) => {
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
  const { _id } = args
  try {
    if (_id) {
      const loan = await models.loans.findOne({ _id })
      if (isNull(loan)) {
        return {}
      }
      return loan
    } else {
      return {}
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
const getLoansForCustomer = async (root, args, ctxt) => {
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
  const { customerId } = args
  try {
    if (customerId) {
      const loans = await models.loans.find({ primaryBorrowerId: customerId })
      return loans
    } else {
      return []
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export default [
  {
    name: 'getLoan',
    handler: getLoan
  },
  {
    name: 'getLoansForCustomer',
    handler: getLoansForCustomer
  }
]
