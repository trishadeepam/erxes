const primaryBorrower = async (root, args, ctxt) => {
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
  const { primaryBorrowerId } = args
  const primaryBorrower = await models.Customers.findOne({ _id: primaryBorrowerId })
  return primaryBorrower
}
const coBorrower = async (root, args, ctxt) => {
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
  const { coBorrowerId } = args
  const coBorrower = await models.Customers.findOne({ _id: coBorrowerId })
  return coBorrower
}
const company = async (root, args, ctxt) => {
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
  const { companyId } = args
  const company = await models.Companies.findOne({ _id: companyId })
  return company
}

export default [
  {
    type: 'LoanApplication',
    field: 'primaryBorrower',
    handler: primaryBorrower
  },
  {
    type: 'LoanApplication',
    field: 'coBorrower',
    handler: coBorrower
  },
  {
    type: 'LoanApplication',
    field: 'company',
    handler: company
  }
]
