import {
  createCustomer,
  updateCustomer,
  createLoanApplication,
  updateLoanApplication,
  getLoanAccountOverviewDetails,
  getLoanAccountBasicDetails,
  getLoanAccountRepaymentScheduleDetails
} from './lmsService'
export const createLmsCustomersForLoanApplication = async loanApplication => {
  const { customer, coBorrower, company } = loanApplication
  try {
    const [customerResponse, coBorrowerResponse] = await Promise.all([
      createCustomer(customer),
      createCustomer(coBorrower)
    ])
    if (customerResponse.response_status.status.toLowerCase() === 'error') {
      throw new Error({
        message: 'CREATE_BORROWER_FAILED',
        code: customerResponse.code
      })
    }
    if (coBorrowerResponse.response_status.status.toLowerCase() === 'error') {
      throw new Error({
        message: 'CREATE_CO_BORROWER_FAILED',
        code: coBorrowerResponse.code
      })
    }
    customer.lmsCustomerId = customerResponse.id
    customer.lmsFormattedId = customerResponse.formatted_id
    coBorrower.lmsCustomerId = coBorrowerResponse.id
    customer.lmsFormattedId = coBorrowerResponse.formatted_id
    loanApplication.lmsPrimaryBorrowerId = customerResponse.id
    loanApplication.lmsCoBorrowerId = coBorrowerResponse.id
    loanApplication.lmsPrimaryBorrowerFormattedId = customerResponse.id
    loanApplication.lmsCoBorrowerFormattedId = coBorrowerResponse.id
    loanApplication.lmsCompanyId = 'NA'
    return loanApplication
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: createCustomer')
  }
}
export const createLmsCustomer = async customer => {
  try {
    const response = await createCustomer(customer)
    if (response.response_status.status.toLowerCase() === 'success') {
      customer.lmsCustomerId = response.id
      customer.lsmFormattedId = response.formatted_id
      return customer
    } else {
      throw new Error({
        message: 'CUSTOMER_UPDATE_FAILED',
        code: response.code
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: CreateCustomer')
  }
}
export const updateLmsCustomer = async customer => {
  try {
    const response = await updateCustomer(customer)
    if (response.response_status.status.toLowerCase() === 'success') {
      return customer
    } else {
      throw new Error({
        message: 'CUSTOMER_UPDATE_FAILED',
        code: response.code
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: updateCustomer')
  }
}

export const createLmsLoanApplication = async loanApplication => {
  try {
    const response = await createLoanApplication(loanApplication)
    if (response.response_status.status.toLowerCase() === 'success') {
      loanApplication.lmsLoanApplicationId = response.loan_application_id
      loanApplication.lmsLoanAccountNumber = response.account_number
      return loanApplication
    } else {
      throw new Error({
        message: 'CREATE_LOAN_APPLICATION_FAILED',
        code: response.code
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: updateCustomer')
  }
}

export const updateLmsLoanApplication = async loanApplication => {
  try {
    const response = await updateLoanApplication(loanApplication)
    if (response.response_status.status.toLowerCase() === 'success') {
      return loanApplication
    } else {
      throw new Error({
        message: 'UPDATE_LOAN_APPLICATION_FAIED',
        code: response.code
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: updateCustomer')
  }
}

export const disburseLoan = async loanApplication => {
  try {
    const response = await disburseLoan(loanApplication)
    if (response.response_status.status.toLowerCase() === 'success') {
      loanApplication.isLoanDisbursed = true
      return loanApplication
      // FIXME: This has to create a loan Account in erxes
    } else {
      throw new Error({
        message: 'LOAN_DISBURSEMENT_FAILED',
        code: response.code
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: disburseLoan')
  }
}
export const getLmsLoanDetails = async loan => {
  try {
    const [
      repaymentSchedule,
      accountOverview,
      basicDetails
    ] = await Promise.all([
      getLoanAccountRepaymentScheduleDetails(loan),
      getLoanAccountOverviewDetails(loan),
      getLoanAccountBasicDetails(loan)
    ])
    if (repaymentSchedule.response_status.status.toLowerCase !== 'success') {
      throw new Error({
        message: 'CANNOT_GET_REPAYMENT_SCHEDULE',
        code: repaymentSchedule.code
      })
    }
    if (accountOverview.response_status.status.toLowerCase !== 'success') {
      throw new Error({
        message: 'CANNOT_GET_ACCOUNT_OVERVIEW',
        code: accountOverview.code
      })
    }
    if (basicDetails.response_status.status.toLowerCase !== 'success') {
      throw new Error({
        message: 'CANNOT_GET_BASIC_DETAILS',
        code: basicDetails.code
      })
    }
    delete basicDetails.response_status
    delete accountOverview.response_status
    delete repaymentSchedule.response_status
    const loanDetails = {
      ...basicDetails,
      ...accountOverview,
      ...repaymentSchedule
    }
    return Object.assign(loan, loanDetails)
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: getLmsCurrentLoanDetails')
  }
}

export const getLmsRepaymentSchedule = async loan => {
  try {
    const response = await getLoanAccountRepaymentScheduleDetails(loan)
    if (response.response_status.status !== 'success') {
      throw new Error({
        message: 'CANNOT_GET_LOAN_REPAYMENT_SCHEDULE',
        code: response.code
      })
    }
    delete response.response_status
    loan.loan_repayment_schedule_list = response.loan_repayment_schedule_list
    return loan
  } catch (e) {
    console.log(e)
    throw new Error('LMS_API_CALL_ERROR: getLmsRepaymentSchedule')
  }
}
