export const BORROWER_TYPES = {
  RETAILER: 'retailer',
  DISTRIBUTOR: 'distributor',
  MSME: 'msme',
  INDIVIDUAL: 'individual'
};
export const PRODUCT_TYPES = {
  SHORT_TERM_LOAN: 'shortterm',
  TERM_LOAN: 'term',
  CRDEIT_LINE: 'creditline',
  ZERO_CREDIT_LINE: 'zerocreditline',
  INVOICE_DISCOUNTING: 'invoicediscounting',
  INVOICE_FINANCING: 'invoicefinancing',
  SACHET: 'sachet',
  PAYDAY: 'payday',
  CONSUMPTION: 'consumption',
  PERSONAL_LOAN: 'pl'
};
export const PRODUCT_TYPES_LABELS = {
  [PRODUCT_TYPES.SHORT_TERM_LOAN]: 'Short Term Loan',
  [PRODUCT_TYPES.TERM_LOAN]: 'Term Loan',
  [PRODUCT_TYPES.CRDEIT_LINE]: 'Credit Line',
  [PRODUCT_TYPES.ZERO_CREDIT_LINE]: 'Zero Credit Line',
  [PRODUCT_TYPES.INVOICE_DISCOUNTING]: 'Invoice Discounting',
  [PRODUCT_TYPES.INVOICE_FINANCING]: 'Invoice Financing',
  [PRODUCT_TYPES.SACHET]: 'Sachet Loans',
  [PRODUCT_TYPES.PAYDAY]: 'Pay Day Loans',
  [PRODUCT_TYPES.CONSUMPTION]: 'Consumption Loans',
  [PRODUCT_TYPES.PERSONAL_LOAN]: 'Personal Loans'
};
export const LOAN_APPLICATION_QUEUE = 'loan-application:request';
export const LOAN_APPLICATION_QUEUE_RESPONSE = 'loan-application:response';

export const INTEGRATION_PLUGIN_QUEUE = 'integrations:loanApplication';
export const INTEGRATION_KIND = 'los';
export const REQUEST_KINDS = {
  RPC: 'message-rpc',
  MESSAGE: 'message',
  POST: 'https-post',
  GET: 'https-get'
};
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
];
export const TASK_TYPES = {
  CPV_TASK: 'cpv',
  PD_TASK: 'pd'
};
export const TASK_TYPE_LABELS = {
  [TASK_TYPES.CPV_TASK]: 'CPV',
  [TASK_TYPES.PD_TASK]: 'PD'
};
export const TASK_SEARCH_TEXTS = {
  [TASK_TYPES.CPV_TASK]: 'Contact Point Verification Task',
  [TASK_TYPES.PD_TASK]: 'Personal Discussion Task'
};
export const NOTIFICATION_TYPES = {
  SMS: 'sms',
  EMAIL: 'email',
  VOICE: 'voice',
  IN_APP: 'in-app',
  WHATSAPP: 'whatsapp'
};

export const PRODUCT_BORROWER_MAP = {
  [BORROWER_TYPES.RETAILER]: [
    PRODUCT_TYPES.SHORT_TERM_LOAN,
    PRODUCT_TYPES.CRDEIT_LINE,
    PRODUCT_TYPES.INVOICE_FINANCING,
    PRODUCT_TYPES.ZERO_CREDIT_LINE
  ],
  [BORROWER_TYPES.INDIVIDUAL]: [
    PRODUCT_TYPES.PAYDAY,
    PRODUCT_TYPES.PERSONAL_LOAN,
    PRODUCT_TYPES.CONSUMPTION
  ],
  [BORROWER_TYPES.MSME]: [
    PRODUCT_TYPES.TERM_LOAN,
    PRODUCT_TYPES.SHORT_TERM_LOAN,
    PRODUCT_TYPES.INVOICE_DISCOUNTING
  ],
  [BORROWER_TYPES.DISTRIBUTOR]: [
    PRODUCT_TYPES.TERM_LOAN,
    PRODUCT_TYPES.CRDEIT_LINE
  ]
};
