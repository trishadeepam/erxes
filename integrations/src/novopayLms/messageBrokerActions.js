import { loanApplicationPostProcessor } from '../loanApplication/messageActions/actions'
import {
  createLmsCustomerAction,
  createLmsCompanyAction,
  createCustomersForLoanApplicationAction,
  createLmsLoanApplicationAction,
  updateLmsCustomerAction,
  updateLmsCompanyAction,
  updateLmsLoanApplicationAction,
  getLmsLoanDetailsAction,
  gtLmsRepaymentScheduleAction,
  disburseLmsLoan,
  customerPostProcessor,
  companyPostProcessor,
  createCustomersPostProcessor,
  customerPreProcessor,
  companyPreProcessor,
  customersAndLoanApplicationPreProcessor,
  loanApplicationPreProcessor,
  loanPreProcessor,
  loanPostProcessor
} from './messageActions/actions'

export const SUPPORTED_ACTIONS = {
  createLmsCustomer: {
    schema: {},
    preProcessor: customerPreProcessor,
    executeAction: createLmsCustomerAction,
    postProcessor: customerPostProcessor
  }, // JSON Schema validation of data
  createLmsCompany: {
    schema: {},
    executeAction: createLmsCompanyAction,
    preProcessor: companyPreProcessor,
    postProcessor: companyPostProcessor
  },
  createCustomersForLoanApplication: {
    schema: {},
    executeAction: createCustomersForLoanApplicationAction,
    preProcessor: customersAndLoanApplicationPreProcessor,
    postProcessor: createCustomersPostProcessor
  },
  createLmsLoanApplication: {
    schema: {},
    losActions: [],
    executeAction: createLmsLoanApplicationAction,
    preProcessor: loanApplicationPreProcessor,
    postProcessor: loanApplicationPostProcessor
  },
  updateLmsCustomer: {
    schema: {},
    executeAction: updateLmsCustomerAction,
    preProcessor: customerPreProcessor,
    postProcessor: customerPostProcessor
  },
  updateLmsCompany: {
    schema: {},
    executeAction: updateLmsCompanyAction,
    preProcessor: companyPreProcessor,
    postProcessor: companyPostProcessor
  },
  updateLmsLoanApplication: {
    schema: {},
    executeAction: updateLmsLoanApplicationAction,
    preProcessor: loanApplicationPreProcessor,
    postProcessor: loanApplicationPostProcessor
  },
  disburseLmsLoan: {
    schema: {},
    executeAction: disburseLmsLoan,
    preProcessor: loanApplicationPreProcessor,
    postProcessor: loanPostProcessor
  },
  getLmsLoanDetails: {
    schema: {},
    executeAction: getLmsLoanDetailsAction,
    preProcessor: loanPreProcessor,
    postProcessor: loanPostProcessor
  },
  getLmsRepaymentSchedule: {
    schema: {},
    executeAction: gtLmsRepaymentScheduleAction,
    preProcessor: loanPreProcessor,
    postProcessor: loanPostProcessor
  }
}
