import * as axiosRetry from 'axios-retry'
import axios from 'axios'
import { getDomain, buildHeader, getAuthHeader } from './constants'
import { mapCustomer } from './mappers/customerMapper'
import { mapLoanApplication } from './mappers/loanApplicationMapper'

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay })

const endpoints = {
  getLoanProductList: 'getLoanProductList',
  getLoanProductDetails: 'getLoanProductDetails',
  getProductSchemeDetails: 'getProductSchemeDetails',
  createOrUpdateCustomer: 'createOrUpdateCustomer',
  getDatatypeMaster: 'getDatatypeMaster',
  createOrUpdateLoanApplication: 'createOrUpdateLoanApplication',
  disburseLoan: 'disburseLoan',
  getLoanAccountOverviewDetails: 'getLoanAccountOverviewDetails',
  getLoanAccountBasicDetails: 'getLoanAccountBasicDetails',
  getLoanAccountRepaymentScheduleDetails:
    'getLoanAccountRepaymentScheduleDetails'
}
const buildEndpoint = endpoint => {
  const domain = getDomain()
  return `${domain}/${endpoints[endpoint]}`
}
export const getMetadata = async (datatype, datasubtype) => {
  const endpoint = buildEndpoint('getDatatypeMaster')
  const response = await axios({
    method: 'POST',
    url: endpoint,
    headers: getAuthHeader(),
    data: {
      header: buildHeader(),
      request: {
        datatype,
        datasubtype
      }
    },
    responseType: true
  })
  if (response.statusText === 'OK') {
    return response.data
  } else {
    return {}
  }
}

export const getLoanProductList = async () => {
  const response = await axios({
    url: buildEndpoint('getLoanProductList'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers: buildHeader(),
      request: {
        search_criteria: {},
        sort_criteria: {},
        page_size: '20',
        offset: '0'
      }
    }
  })
  if (response.statusText === 'OK') {
    return response.data
  } else {
    return {}
  }
}

export const getLoanProductDetails = async (id, code) => {
  const response = await axios({
    url: buildEndpoint('getLoanProductDetails'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers: buildHeader(),
      request: {
        id
      }
    }
  })
  if (response.statusText === 'OK') {
    return response.data
  } else {
    return {}
  }
}
export const createCustomer = async customer => {
  const lmsCustomer = mapCustomer(customer)
  const headers = buildHeader()
  headers.function_code = 'DEFAULT'
  headers.function_sub_code = 'CREATE'
  const response = await axios({
    url: buildEndpoint('createOrUpdateCustomer'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: lmsCustomer
    }
  })
  if (response.statusText === 'OK') {
    return response.data
  }
}
export const updateCustomer = async customer => {
  const lmsCustomer = mapCustomer(customer)
  const headers = buildHeader()
  headers.function_code = 'DEFAULT'
  headers.function_sub_code = 'UPDATE'
  const response = await axios({
    url: buildEndpoint('createOrUpdateCustomer'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: lmsCustomer
    }
  })
  if (response.statusText === 'OK') {
    return response.data
  }
}

export const createLoanApplication = async loanApplication => {
  const lmsApplication = mapLoanApplication(loanApplication)
  const headers = buildHeader()
  headers.function_code = 'DEFAULT'
  headers.function_sub_code = 'CREATE'
  const response = await axios({
    url: buildEndpoint('createOrUpdateLoanApplication'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: lmsApplication
    }
  })
  if (response.statusText === 'OK') {
    return response.data
  }
}

export const updateLoanApplication = async loanApplication => {
  const lmsApplication = mapLoanApplication(loanApplication)
  const headers = buildHeader()
  headers.function_code = 'DEFAULT'
  headers.function_sub_code = 'UPDATE'
  const response = await axios({
    url: buildEndpoint('createOrUpdateLoanApplication'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: lmsApplication
    }
  })
  if (response.statusText === 'OK') {
    return response.data
  }
}

export const disburseLoan = async (
  { lmsLoanAccountNumber },
  disbursementReferenceNumber,
  isReSubmit
) => {
  const headers = buildHeader()
  headers.function_code = isReSubmit ? 'RESUBMIT' : 'DEFAULT'
  headers.function_sub_code = 'DEFAULT'
  const response = await axios({
    url: buildEndpoint('disburseLoan'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: {
        account_number: lmsLoanAccountNumber,
        client_reference_number: disbursementReferenceNumber
      }
    }
  })
  if (response.status === 'OK') {
    return response.data
  }
}

export const getLoanAccountOverviewDetails = async ({ lmsCustomerId }) => {
  const headers = buildHeader()
  headers.function_code = 'DEFAULT'
  headers.function_sub_code = 'DEFAULT'
  const response = await axios({
    url: buildEndpoint('getLoanAccountOverviewDetails'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: {
        account_number: lmsCustomerId
      }
    }
  })
  if (response.status === 'OK') {
    return response.data
  }
}

export const getLoanAccountBasicDetails = async ({ lmsCustomerId }) => {
  const headers = buildHeader()
  headers.function_code = 'DEFAULT'
  headers.function_sub_code = 'DEFAULT'
  const response = await axios({
    url: buildEndpoint('getLoanAccountOverviewDetails'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: {
        account_number: lmsCustomerId
      }
    }
  })
  if (response.status === 'OK') {
    return response.data
  }
}

export const getLoanAccountRepaymentScheduleDetails = async ({
  lmsCustomerId
}) => {
  const headers = buildHeader()
  headers.function_code = 'DEFAULT'
  headers.function_sub_code = 'DEFAULT'
  const response = await axios({
    url: buildEndpoint('getLoanAccountRepaymentScheduleDetails'),
    method: 'POST',
    headers: getAuthHeader(),
    data: {
      headers,
      request: {
        account_number: lmsCustomerId
      }
    }
  })
  if (response.status === 'OK') {
    return response.data
  }
}
