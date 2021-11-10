import messageBrokerUtils from './messageBrokerUtils'
import { isNull } from 'lodash'

async function createLoan (data, resolvers, { models }) {
  const { loanApplication, integrationId, userId } = data
  try {
    let root
    const isExisting = await models.Loans.findOne({
      _id: loanApplication.applictionId
    })
    if (!isNull(isExisting)) {
      throw new Error('LOAN_ALREADY_EXISTS')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error(`USER_DOES_NOT_EXIST - ${userId}`)
    }
    const loan = messageBrokerUtils.buildLoan(loanApplication, userId)
    loan.integrationId = integrationId
    const newLoan = await resolvers.Mutation.loansAdd(root, loan, {
      docModifier: doc => doc,
      user
    })
    return newLoan
  } catch (e) {
    throw new Error(e.message)
  }
}

async function updateLoan (data, resolvers, { models }) {
  const { loan, integrationId, userId } = data
  try {
    let root
    const isExisting = await models.Loans.findOne({
      _id: loan._id
    })
    if (isNull(isExisting)) {
      throw new Error('LOAN_DOES_NOT_EXIST')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error(`USER_DOES_NOT_EXIST - ${userId}`)
    }
    loan.integrationId = integrationId
    const newLoan = await resolvers.Mutation.customersEdit(root, loan, {
      docModifier: doc => doc,
      user
    })
    return newLoan
  } catch (e) {
    throw new Error(e.message)
  }
}

const getLoan = async (data, resolvers, { models }) => {
  const { userId, loanId } = data
  const user = await models.Users.findOne({ _id: userId })
  if (isNull(user)) {
    throw new Error('USER_DOES_NOT_EXIST')
  }
  const loan = await models.Loans.findOne({
    _id: loanId
  })
  if (isNull(loan)) {
    throw new Error('INVALID_CUSTOMER_ID')
  }
  return loan
}
export default {
  createLoan,
  updateLoan,
  getLoan
}
