import * as Random from 'meteor-random';

const LMS_DOMAIN = 'https://asset-qa-platform.novopay.in/api-gateway/api/novopay'
const API_VERSION = 'v1'

export const LOAN_APPLICATION_QUEUE = 'loan-application:request'
export const LOAN_APPLICATION_QUEUE_RESPONSE = 'loan-application:response'

export const LOAN_PLUGIN_QUEUE = 'integrations:loan'
export const LOAN_APPLICATION_PLUGIN_QUEUE = 'integrations:loanApplication';

export const INTEGRATION_KIND = 'lms'
export const REQUEST_KINDS = {
  RPC: 'message-rpc',
  MESSAGE: 'message',
  POST: 'https-post',
  GET: 'https-get'
}
export const INTERGATION_SUPPORT = [
  {
    label: 'RPC Queue',
    value: REQUEST_KINDS.RPC
  },
  {
    label: 'Message Queue',
    value: REQUEST_KINDS.MESSAGE
  },
  {
    label: 'Http Post',
    value: REQUEST_KINDS.POST
  },
  {
    label: 'Http get',
    value: REQUEST_KINDS.GET
  }
]

export const NOTIFICATION_TYPES = {
  SMS: 'sms',
  EMAIL: 'email',
  VOICE: 'voice',
  IN_APP: 'in-app',
  WHATSAPP: 'whatsapp'
}

export const getDomain = () => {
  return `${LMS_DOMAIN}/${API_VERSION}`
}
export const NUM_REQUESTS = {
  retry: 3,
  delay: 100,
  factor: 2
}
export const getAuthHeader = () => {
  return {
    Authorization: '073b2e6a-ce28-43a2-8a17-b58ce4d1e2cf'
  }
}
export const buildHeader = () => {
  return {
    tenant_code: 'novopay',
    client_code: 'NOVOPAY',
    channel_code: 'NOVOPAY',
    end_channel_code: 'AIG',
    stan: Random(),
    client_ip: '127.0.0.1',
    transmission_datetime: '1488779072701',
    operation_mode: 'SELF',
    run_mode: 'REAL',
    retry_count: '0',
    actor_type: 'CUSTOMER',
    user_handle_type: 'MSISDN',
    user_handle_value: '9816923672',
    location: '44.968046,-94.420307',
    function_code: 'DEFAULT',
    function_sub_code: 'DEFAULT',
    user_id: 5
  }
}
