import {
  getLmsRepaymentSchedule,
  updateLmsLoanApplication,
  createLmsCustomer,
  createLmsCustomersForLoanApplication,
  createLmsLoanApplication,
  updateLmsCustomer,
  getLmsLoanDetails
} from '../lmsController'
const buildError = e => {
  return {
    status: 'error',
    errorMessage: e.message,
    code: e.code
  }
}

/** Pre Processor Actions */
export const customerPreProcessor = async (
  data,
  action,
  validationScmema,
  loanApplicationCallback
) => {
  const response = await loanApplicationCallback(
    { customerId: data.customerId },
    'getCustomer'
  )
  if (response.status === 'error') {
    throw new Error(response.errorMessage)
  }
  return {
    customer: response
  }
}

export const companyPreProcessor = async (
  data,
  action,
  validationScmema,
  loanApplicationCallback
) => {
  const response = await loanApplicationCallback(
    { companyId: data.companyId },
    'getCompany'
  )
  if (response.status === 'error') {
    throw new Error(response.errorMessage)
  }
  return {
    company: response
  }
}

export const loanApplicationPreProcessor = async (
  data,
  action,
  validationScmema,
  loanApplicationCallback
) => {
  const response = await loanApplicationCallback(
    { loanApplicationId: data.loanApplicationId },
    'getLoanApplication'
  )
  if (response.status === 'error') {
    throw new Error(response.errorMessage)
  }
  return {
    loanApplication: response
  }
}

export const loanPreProcessor = async (
  data,
  action,
  validationScmema,
  loanApplicationCallback,
  loanCallback
) => {
  const response = await loanCallback(
    { loanId: data.loanId },
    'getLoan'
  )
  if (response.status === 'error') {
    throw new Error(response.errorMessage)
  }
  return {
    loan: response
  }
}

export const customersAndLoanApplicationPreProcessor = async (
  data,
  action,
  validationScmema,
  loanApplicationCallback
) => {
  const { customerId, coBorrowerId, companyId, loanApplicationId } = data
  const customer = await customerPostProcessor(
    { customerId },
    'getCustomer',
    validationScmema,
    loanApplicationCallback
  )
  const coBorrower = await customerPostProcessor(
    { coBorrowerId },
    'getCustomer',
    validationScmema,
    loanApplicationCallback
  )
  const company = await companyPreProcessor(
    { companyId },
    'getCompany',
    validationScmema,
    loanApplicationCallback
  )
  const loanApplication = await loanApplicationPreProcessor(
    { loanApplicationId },
    'getLoanApplication',
    validationScmema,
    loanApplicationCallback
  )
  loanApplication.customer = customer
  loanApplication.coBorrower = coBorrower
  loanApplication.company = company
  return loanApplication
}

/** Execute Actions */
export const ceateLmsCompanyAction = async (
  { company },
  loaApplicationRpcCallback
) => {
  return { company }
}

export const createLmsCustomerAction = async (
  { customer },
  loaApplicationCallback
) => {
  try {
    const lmsCustomer = await createLmsCustomer(customer)
    const messageResponse = await loaApplicationCallback(
      { customer: lmsCustomer },
      'updateCustomer'
    )
    if (messageResponse.status === 'error') {
      // FIXME: Rollback transaction. But we cannot do that as there are no api's exposed.
    }
    return messageResponse
  } catch (e) {
    return buildError(e)
  }
}
export const createCustomersForLoanApplicationAction = async ({
  loanApplication,
  loaApplicationCallback
}) => {
  try {
    const lmsLoanApplication = await createLmsCustomersForLoanApplication(
      loanApplication
    )
    const { customer, coBorrower, ...rest } = lmsLoanApplication
    let messageResponse = await loaApplicationCallback(
      { customer },
      'updateCustomer'
    )
    if (messageResponse.status === 'error') {
      return messageResponse
    }
    messageResponse = await loaApplicationCallback(
      { customer: coBorrower },
      'updateCustomer'
    )
    if (messageResponse.status === 'error') {
      return messageResponse
    }
    messageResponse = await loaApplicationCallback(
      { loanApplication: rest },
      'updateLoanApplication'
    )
    if (messageResponse.status === 'error') {
      return messageResponse
    }
    return {
      customer,
      coBorrower,
      loanApplication: rest
    }
  } catch (e) {
    return buildError(e)
  }
}
export const createLmsLoanApplicationAction = async ({
  loanApplication,
  loaApplicationCallback
}) => {
  try {
    const lmsLoanApplication = await createLmsLoanApplication(loanApplication)
    const messageResponse = await loaApplicationCallback(
      { loanApplication: lmsLoanApplication },
      'updateLoanApplication'
    )
    if (messageResponse.status === 'error') {
      //FIXME: Rollback transaction. But we cannot do that as there are no api's exposed.
    }
    return messageResponse
  } catch (e) {
    buildError(e)
  }
}
export const updateLmsCustomerAction = async (
  { customer },
  loaApplicationCallback
) => {
  const lmsCustomer = await updateLmsCustomer(customer)
  const messageResponse = await loaApplicationCallback(
    { customer: lmsCustomer },
    'updateCustomer'
  )
  if (messageResponse.status === 'error') {
    // FIXME: Rollback transaction. But we cannot do that as there are no api's exposed.
  }
  return messageResponse
}
// FIXME: Not implemented
export const udateLmsCompanyAction = async ({ company }) => {
  return { company }
}
export const upateLmsLoanApplicationAction = async (
  { loanApplication },
  loaApplicationCallback
) => {
  const lmsLoanApplication = await updateLmsLoanApplication(loanApplication)
  const messageResponse = await loaApplicationCallback(
    { loanApplication: lmsLoanApplication },
    'updateLoanApplication'
  )
  if (messageResponse.status === 'error') {
    // FIXME: Rollback transaction. But we cannot do that as there are no api's exposed.
  }
  return messageResponse
}

export const disburseLmsLoan = async (
  { loanApplication },
  loanApplicationCallback,
  loanCallback
) => {
  const lmsLoanApplication = await disburseLmsLoan(loanApplication)
  const updatedLoanApplication = await loanApplicationCallback(
    { loanApplication: lmsLoanApplication },
    'updateLoanApplication'
  )
  const messageResponse = await loanCallback(
    { loanApplication: updatedLoanApplication },
    'createLoan'
  )
  if (messageResponse.status === 'error') {
    // FIXME: Rollback transaction. But we cannot do that as there are no api's exposed.
  }
  return messageResponse
}

export const getLmsLoanDetailsAction = async (
  { loan },
  loanApplicationRpcCallback,
  loanCallback
) => {
  const lmsLoan = await getLmsLoanDetails(loan)
  const messageResponse = await loanCallback({ loan: lmsLoan }, 'updateLoan')
  if (messageResponse.status === 'error') {
    // FIXME: Rollback transaction. But we cannot do that as there are no api's exposed.
  }
  return messageResponse
}
export const getLmsRepaymentScheduleAction = async (
  { loan },
  loanApplicationRpcCallback,
  loanCallback
) => {
  const lmsLoan = await getLmsRepaymentSchedule(loan)
  const messageResponse = await loanCallback({ loan: lmsLoan }, 'updateLoan')
  if (messageResponse.status === 'error') {
    //FIXME: Rollback transaction. But we cannot do that as there are no api's exposed.
  }
  return messageResponse
}

/**Post Processors */

export const customerPostProcessor = response => {
  return {
    customerId: response._id,
    customer: response
  }
}
export const companyPostProcessor = response => {
  return {
    companyId: response._id,
    company: response
  }
}
export const loanApplicationPostProcessor = response => {
  return {
    loanApplicationId: response.loanApplication._id,
    dealId: response.deal._id,
    loanApplication: response.loanApplication,
    deal: response.deal
  }
}
export const createCustomersPostProcessor = response => {
  const { customer, coBorrower, loanApplication } = response
  return {
    loanApplicationId: loanApplication._id,
    primaryBorrower: {
      primaryBorrowerId: customer._id,
      lmsPrimaryBorrowerId: customer.lmsCustomerId,
      lmsPrimaryBorrowerFormattedId: customer.lmsFormattedId
    },
    coBorrower: {
      coBorrowerId: coBorrower._id,
      lmsCoBorrowerId: coBorrower.lmsCustomerId,
      lmsCoBorrowerFormattedId: coBorrower.lmsFormattedId
    },
    customers: {
      primaryBorrower: customer,
      coBorrower
    }
  }
}
export const loanPostProcessor = response => {
  const { _id, loanApplicationId } = response
  return {
    loanApplicationId,
    loanId: _id,
    loan: response
  }
}
