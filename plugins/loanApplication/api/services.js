import axios from 'axios'
import utils from 'erxes-api-utils'

const getNewApplicationValidity = async ({ application }) => {
  return {
    pass: true
  }
}
const getExistingApplicationValidity = async ({
  application,
  borrower,
  company
}) => {
  return {
    pass: true
  }
}

export const getSubServiceDomain = ({ name }) => {
  const MAIN_APP_DOMAIN = utils.getEnv({ name: 'MAIN_APP_DOMAIN' })

  const defaultMappings = {
    API_DOMAIN: `${MAIN_APP_DOMAIN}/api`,
    WIDGETS_DOMAIN: `${MAIN_APP_DOMAIN}/widgets`,
    INTEGRATIONS_API_DOMAIN: `${MAIN_APP_DOMAIN}/integrations`,
    LOGS_API_DOMAIN: `${MAIN_APP_DOMAIN}/logs`,
    ENGAGES_API_DOMAIN: `${MAIN_APP_DOMAIN}/engages`,
    VERIFIER_API_DOMAIN: `${MAIN_APP_DOMAIN}/verifier`
  }

  const domain = utils.getEnv({ name })

  if (domain) {
    return domain
  }

  return defaultMappings[name]
}

export const getLoanDetails = async loan => {
  try {
    const INTEGRATIONS_API_DOMAIN = getSubServiceDomain({
      name: 'INTEGRATIONS_API_DOMAIN'
    })
    const url = `${INTEGRATIONS_API_DOMAIN}/lms/getLoanDetails`
    const response = axios({
      url,
      method: 'GET',
      params: { loan }
    })
    return response.data
  } catch (e) {
    console.log(e.message)
    return {}
  }
}
export default {
  getNewApplicationValidity,
  getExistingApplicationValidity
}
