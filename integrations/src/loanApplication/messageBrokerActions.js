
import {
  createTaskPreProcessor,
  createLoanAplicationPreProcessor,
  loanApplicationPostProcessor,
  customerPostProcessor,
  companyPostProcessor
} from './messageActions/actions'

export const SUPPORTED_ACTIONS = {
  createCustomer: {
    schema: {},
    preProcessor: (data, action) => data,
    postProcessor: customerPostProcessor
  }, // JSON Schema validation of data
  createCompany: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: companyPostProcessor
  },
  createLoanApplication: {
    schema: {},
    preprocessor: createLoanAplicationPreProcessor,
    postProcessor: loanApplicationPostProcessor
  },
  updateCustomer: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: customerPostProcessor
  },
  updateCompany: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: companyPostProcessor
  },
  updateLoanApplication: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: companyPostProcessor
  },
  getLoanApplication: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: (response) => response
  },
  updateApplicationStatus: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: loanApplicationPostProcessor
  },
  createTask: {
    schema: {},
    preprocessor: createTaskPreProcessor,
    postProcessor: (response) => response
  },
  upadateTask: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: (response) => response
  },
  sendNotification: {
    schema: {},
    preprocessor: (data, action) => data,
    postProcessor: (response) => response
  }
}
