import { isNull } from 'lodash'
import * as moment from 'moment'
import { APPLICATION_CLOSE_TAT } from '../../pluginConstants'

const createCustomer = async (
  models,
  customer,
  user,
  graphqlPubsub,
  logUtils
) => {
  const isExisting = await models.Customers.findOne({
    primaryPhone: customer.primaryPhone
  })
  if (!isNull(isExisting)) {
    throw new Error('CUSTOMER_ALREADY_EXISTS')
  }
  const newCustomer = await models.Customers.createCustomer(customer, user)
  await logUtils.putCreateLog(
    {
      type: 'customer',
      newData: customer,
      object: newCustomer
    },
    user
  )
  await registerOnboardHistories(models, 'customer', user, graphqlPubsub)
}

const createCompany = async (
  models,
  company,
  primaryBorrowerId,
  user,
  graphqlPubsub,
  logUtils
) => {
  try {
    const customer = await models.findOne({ _id: primaryBorrowerId })
    if (isNull(customer)) {
      throw new Error('PRIMARY_BORROWER_DOES_NOT_EXIST')
    }
    company.customerIds = [primaryBorrowerId]
    const newCompany = await models.Companies.createCompany(customer, user)
    await logUtils.putCreateLog(
      {
        type: 'customer',
        newData: customer,
        object: newCompany
      },
      user
    )
    return newCompany
  } catch (e) {
    throw new Error(e.message)
  }
}

const registerOnboardHistories = async (models, type, user, graphqlPubsub) => {
  try {
    const response = await models.OnboardingHistories.getOrCreate({
      type,
      user
    })
    if (response.status === 'created') {
      graphqlPubsub.publish('onboardingChanged', {
        onboardingChanged: { userId: user._id, type }
      })
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

// FIXME: Develop better logic for close dates based on SLAs
const getCloseDateForApplication = application => {
  return moment().day() === 0
    ? moment()
        .add(APPLICATION_CLOSE_TAT[application.borrowerType] + 1, 'day')
        .endOf('day')
    : moment()
        .add(APPLICATION_CLOSE_TAT[application.applicationType], 'day')
        .endOf('day')
}

const buildDeal = ({
  application,
  board,
  pipeline,
  user,
  product,
  stage
}) => {
  const { productType, currentLoanOffer } = application
  const deal = {
    loanApplicationId: application._id,
    name: `Application - ${application.applicationNumber}`,
    createdAt: new Date(),
    closeDate: getCloseDateForApplication(application),
    customerIds: [application.primaryBorrowerId],
    companyIds: application.companyId ? [application.companyId] : [],
    assignedUserIds: [],
    watchedUserIds: [user._id],
    notifiedUserIds: [user._id],
    description: `${productType} Loan`,
    modifiedAt: new Date(),
    isComplete: false,
    pipelineId: pipeline._id,
    stageId: stage._id,
    boardId: board._id,
    priority: 'low',
    status: 'active',
    processId: Math.random(),
    userId: user._id,
    labelIds: buildLabelIdsForDeal(),
    assignedUserIds: buildAssignedUsersForDeal(),
    productsData: buildProductData(currentLoanOffer, product),
    paymentsData: buildPaymentsData(currentLoanOffer, product)
  }
  return deal
}
const editDeal = (deal, loanApplication) => {
  deal.productData = buildProductData(loanApplication.currentLoanOffer)
  if (loanApplication.coBorrowerId) {
    deal.customerIds.push(loanApplication.coBorrowerId)
  }
  deal.processId = Math.random()
  return deal
}
const validateLoanApplication = (existing, newApp) => {
  if (newApp.primaryBorrowerId !== existing.primaryBorrowerId) {
    throw new Error('CANNOT_CHANGE_PRIMARY_BORROWER_ID')
  }
  // FIXME: Do we allow company change in application
  if (newApp.companyId !== existing.companyId) {
    throw new Error('CANNOT_CHANGE_COMPANY_ID')
  }
}
const buildProductData = (currentLoanOffer, product) => {
  return [{
    productId: product.id,
    quantity: 1,
    unitPrice: 1,
    taxPercent: 0,
    tax: 0,
    discountPercent: 0,
    discount: 0,
    amount: currentLoanOffer.loanAmount,
    loanAmount: currentLoanOffer.loanAmount,
    processingFees: currentLoanOffer.processingFees,
    interestRate: currentLoanOffer.interestRate,
    loanTenureInMonths: currentLoanOffer.loanTenureInMonths,
    interestFrequency: currentLoanOffer.interestFrequency
  }]
}

// FIXME: Need to build this data for pd agent.
const buildPaymentsData = (productData, product) => {
  const { productCode } = productData
  return []
}
const buildAssignedUsersForTasks = () => {
  return []
}
const buildAssignedUsersForDeal = () => {
  return []
}
const buildLabelIdsForTask = () => {
  return []
}
const buildLabelIdsForDeal = () => {

}
export default {
  createCustomer,
  createCompany,
  getCloseDateForApplication,
  buildDeal,
  validateLoanApplication,
  editDeal,
  buildAssignedUsersForTasks,
  buildAssignedUsersForDeal,
  buildLabelIdsForTask
}
