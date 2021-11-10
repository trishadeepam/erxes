import { loanDetails } from '../../api/services'
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
const loanApplication = async (root, args, ctxt) => {
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
  const { loanApplicationId } = args
  const loanApplication = await models.loanApplications.findOne({ _id: loanApplicationId })
  return loanApplication
}
const lmsLoan = async (root, args, ctxt) => {
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
  const loanDeatails = await loanDetails(args)
  return loanDeatails
}
export default [
  {
    type: 'Loan',
    field: 'lmsLoan',
    handler: lmsLoan
  },
  {
    type: 'Loan',
    field: 'loanApplication',
    handler: loanApplication
  },
  {
    type: 'Loan',
    field: 'primaryBorrower',
    handler: primaryBorrower
  },
  {
    type: 'Loan',
    field: 'coBorrower',
    handler: coBorrower
  },
  {
    type: 'Loan',
    field: 'company',
    handler: company
  },
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
