import {isNull} from 'lodash'
import * as moment from 'moment'
import {APPLICATION_CLOSE_TAT} from '../../pluginConstants'

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
    const customer = await models.findOne({_id: primaryBorrowerId})
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
        onboardingChanged: {userId: user._id, type}
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

const buildDeal = ({application, board, pipeline, user, product, stage}) => {
  const {productType, currentLoanOffer} = application
  const deal = {
    loanApplicationId: application._id,
    name: `Application - ${application.applicationNumber}`,
    createdAt: new Date(),
    closeDate: getCloseDateForApplication(application),
    customerIds: application.coBorrowerId
        ? [application.primaryBorrowerId, application.coBorrowerId]
        : [application.primaryBorrowerId, application.coBorrowerId],
    companyIds: application.companyId ? [application.companyId] : [],
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
    paymentsData: buildPaymentsData(product)
  }
  return deal
}

const editDeal = (deal, loanApplication) => {
  //deal.productData = buildProductData(loanApplication.currentLoanOffer)
  if (loanApplication.coBorrowerId != undefined &&
      loanApplication.coBorrowerId) {
    deal.customerIds.push(loanApplication.coBorrowerId)
  }
  if (loanApplication.stageId != undefined &&
      loanApplication.stageId) {
    deal.stageId = loanApplication.stageId
  }
  deal.processId = Math.random()
  return deal
}



const validateLoanApplication = (existing, newApp) => {
  if ((newApp.primaryBorrowerId != undefined)
      && (newApp.primaryBorrowerId !== existing.primaryBorrowerId)) {
    throw new Error('CANNOT_CHANGE_PRIMARY_BORROWER_ID')
  }
  // FIXME: Do we allow company change in application
  if ((newApp.companyId != undefined)
      && (newApp.companyId !== existing.companyId)) {
    throw new Error('CANNOT_CHANGE_COMPANY_ID')
  }
}

const updatedBusinessDetails = (application, newApp) => {

  if (newApp != undefined && newApp.loanApplication != undefined){

    let businessDetails = application._doc.businessDetails

    if (businessDetails == undefined){
      businessDetails = {}
    }

    if (newApp.loanApplication.primaryName != undefined){

      businessDetails.businessName = newApp.loanApplication.primaryName
    }
    if (newApp.loanApplication.businessVintage != undefined){

      businessDetails.businessVintage = newApp.loanApplication.businessVintage
    }
    if (newApp.loanApplication.annualSales != undefined){

      businessDetails.annualSales = newApp.loanApplication.annualSales
    }
    if (newApp.loanApplication.businessAddress != undefined){

      const businessAddr = newApp.loanApplication.businessAddress
      const address = {
        address1: businessAddr.address1,
        address2: businessAddr.address2,
        country: businessAddr.country,
        state: businessAddr.state,
        city: businessAddr.city,
        zipcode: businessAddr.zipcode
      }
      businessDetails.businessAddress = address
    }
    if (newApp.loanApplication.storeCategory != undefined){

      businessDetails.storeCategory = newApp.loanApplication.storeCategory
    }
    if (newApp.loanApplication.storeOwnership != undefined){

      businessDetails.storeOwnership = newApp.loanApplication.storeOwnership
    }
    if (newApp.loanApplication.storeSize != undefined){

      businessDetails.storeSize = newApp.loanApplication.storeSize
    }
    if (newApp.loanApplication.ownOtherStores != undefined){

      businessDetails.ownOtherStores = newApp.loanApplication.ownOtherStores
    }
    if (newApp.loanApplication.numberOfEarningMembers != undefined){

      businessDetails.numberOfEarningMembers = newApp.loanApplication.numberOfEarningMembers
    }
    if (newApp.loanApplication.monthlyIncome != undefined){

      businessDetails.monthlyIncome = newApp.loanApplication.monthlyIncome
    }
    if (newApp.loanApplication.monthlyRent != undefined){

      businessDetails.monthlyRent = newApp.loanApplication.monthlyRent
    }


    return businessDetails
  }
  return null

}

const updatedPersonalDetails = (application, newApp) => {

  if (newApp != undefined && newApp.loanApplication != undefined){

    let personalDetails = application._doc.personalDetails
    if (personalDetails == undefined){
      personalDetails = {}
    }

    if (newApp.loanApplication.dob != undefined){

      personalDetails.dob = newApp.loanApplication.dob
    }

    if (newApp.loanApplication.numberOfDependents != undefined){

      personalDetails.numberOfDependents =newApp.loanApplication.numberOfDependents
    }

    if (newApp.loanApplication.userEducation != undefined){

      personalDetails.userEducation =newApp.loanApplication.userEducation
    }

    if (newApp.loanApplication.userEthnicity != undefined){

      personalDetails.userEthnicity =newApp.loanApplication.userEthnicity
    }

    if (newApp.loanApplication.sex != undefined){

      personalDetails.sex =newApp.loanApplication.sex
    }

    if (newApp.loanApplication.maritalStatus != undefined){

      personalDetails.maritalStatus =newApp.loanApplication.maritalStatus
    }
    return personalDetails

  }
  return null
}

const getUpdatedLoanApplication = (application, newApp) => {

  if (newApp.loanApplication != undefined ){

    if (newApp.loanApplication.loanAmount != undefined && newApp.loanApplication.loanPurpose != undefined){

      const loanDetails = {
        loanAmount: newApp.loanApplication.loanAmount,
        loanPurpose: newApp.loanApplication.loanPurpose
      }

      application._doc.loanDetails = loanDetails

    }
    const businessDetails = updatedBusinessDetails(application, newApp)

    if (businessDetails!= undefined && businessDetails != null){

        application._doc.businessDetails = businessDetails
    }

    const personalDetails = updatedPersonalDetails(application, newApp)

    if (personalDetails!= undefined && personalDetails != null){

      application._doc.personalDetails = personalDetails
    }
  }
  return application

}

const buildProductData = (currentLoanOffer, product) => {
  return [
    {
      productId: product.id,
      quantity: 1,
      unitPrice: 1,
      taxPercent: 0,
      tax: 0,
      discountPercent: 0,
      discount: 0,
      amount: currentLoanOffer == undefined ? 0 : currentLoanOffer.loanAmount,
      loanAmount: currentLoanOffer == undefined ? 0 : currentLoanOffer.loanAmount,
      processingFees: currentLoanOffer == undefined ? 0 : currentLoanOffer.processingFees,
      interestRate: currentLoanOffer == undefined ? 0 : currentLoanOffer.interestRate,
      loanTenureInMonths: currentLoanOffer == undefined ? 0 : currentLoanOffer.loanTenureInMonths,
      interestFrequency: currentLoanOffer == undefined ? "per-month" : currentLoanOffer.interestFrequency
    }
  ]
}

// FIXME: Need to build this data for pd agent.
const buildPaymentsData = (product) => {
  const {code} = product
  return []
}
const buildAssignedUsersForTasks = (assignedUsers) => {
  return assignedUsers
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
  buildLabelIdsForTask,
  getUpdatedLoanApplication
}
