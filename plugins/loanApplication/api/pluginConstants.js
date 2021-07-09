// FIXME: Lots of documents will come as metadata. Check with banking solutions for metadata db
export const BORROWER_TYPES = {
  RETAILER: 'retailer',
  DISTRIBUTOR: 'distributor',
  MSME: 'msme',
  INDIVIDUAL: 'individual'
}
export const DOCUMENT_TYPES = {
  PAN: 'pan',
  DL: 'dl',
  PASSPORT: 'passport',
  VOTER_ID: 'voterid',
  ADHAAR: 'adhaar',
  CPAN: 'cpan',
  UDYAM: 'udyam',
  SNE: 'sne',
  DRUG_LICENSE: 'druglicense',
  MOBILE_BILL: 'mobile-bill',
  ELECTRIC_BILL: 'electricity-bill',
  BANK_STATEMENT: 'bank-statement',
  RATION: 'ration-card'
}
export const APPLICATION_CLOSE_TAT = {
  [BORROWER_TYPES.RETAILER]: 3,
  [BORROWER_TYPES.DISTRIBUTOR]: 5,
  [BORROWER_TYPES.INDIVIDUAL]: 2,
  [BORROWER_TYPES.MSME]: 5
}
export const APPLICATION_STATUSES = {
  ACTIVE: 'active',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  LOAN_IN_PROGRESS: 'in-progress',
  REPAID: 'repaid',
  DELETED: 'deleted'
}
export const INTEREST_FREQUENCIES = {
  DAILY: 'per-day',
  WEELKY: 'per-week',
  MONTHLY: 'per-month',
  QUARTERLY: 'per-quarter',
  ANNUAL: 'per-year'
}

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
}
const constants = {
  MAX_APPLICATION_LIFE: 30,
  APPLICATION_DOCUMENTS: {
    PRODUCT_TYPE: [
      { label: 'Short Term Loan', value: PRODUCT_TYPES.SHORT_TERM_LOAN },
      { label: 'Term Loan', value: PRODUCT_TYPES.TERM_LOAN },
      { label: 'Credit Line', value: PRODUCT_TYPES.CRDEIT_LINE },
      { label: 'Zero Credit Line', value: PRODUCT_TYPES.ZERO_CREDIT_LINE },
      { label: 'Invoice Discounting', value: PRODUCT_TYPES.INVOICE_DISCOUNTING },
      { label: 'Invoice Financing', value: PRODUCT_TYPES.INVOICE_FINANCING },
      { label: 'Sachet', value: PRODUCT_TYPES.SACHET },
      { label: 'Pay Day', value: PRODUCT_TYPES.PAYDAY },
      { label: 'Consumption Loan', value: PRODUCT_TYPES.CONSUMPTION },
      { label: 'Personal Loan', value: PRODUCT_TYPES.PERSONAL_LOAN }
    ],
    INTEREST_FREQUENCY: [
      { value: INTEREST_FREQUENCIES.ANNUAL, label: 'Per Year' },
      { value: INTEREST_FREQUENCIES.DAILY, label: 'Per Day' },
      { value: INTEREST_FREQUENCIES.MONTHLY, label: 'Per Month' },
      { value: INTEREST_FREQUENCIES.QUARTERLY, label: 'Per Quarter' },
      { value: INTEREST_FREQUENCIES.WEELKY, label: 'Per Week' }
    ],
    LOAN_TENURE_UNITS: [
      { label: 'Daily', value: 'D' },
      { label: 'Weekly', value: 'W' },
      { label: 'Fortnightly', value: 'F' },
      { label: 'Monthly', value: 'M' },
      { label: 'Quarterly', value: 'Q' },
      { label: 'Half Yearly', value: 'H' },
      { label: 'Annual', value: 'A' }
    ],
    APPLICATION_STAGE_STATE: [
      { label: 'Success', value: 'success' },
      { label: 'Failed', value: 'failed' },
      { label: 'Esclated', value: 'esclated' }
    ],
    APPLICATION_STATUS: [
      { label: 'Active', value: APPLICATION_STATUSES.ACTIVE },
      { label: 'Rejected by Us', value: APPLICATION_STATUSES.REJECTED },
      { label: 'Cancelled by Borrower', value: APPLICATION_STATUSES.CANCELLED },
      {
        label: 'Loan In Progress',
        value: APPLICATION_STATUSES.LOAN_IN_PROGRESS
      },
      { label: 'Loan Repaid', value: APPLICATION_STATUSES.REPAID }
    ],
    SCORE_TYPES: [
      { label: 'Soft Check', value: 'soft' },
      { label: 'Full Credit Score', value: 'full' }
    ],
    BORROWER_TYPE: [
      { label: 'Retailer', value: BORROWER_TYPES.RETAILER },
      { label: 'Distributor', value: BORROWER_TYPES.DISTRIBUTOR },
      { label: 'Individual', value: BORROWER_TYPES.INDIVIDUAL },
      { label: 'MSME', value: BORROWER_TYPES.MSME }
    ],
    LOAN_OFFER_STAGES: [
      { label: 'Initial', value: 'initial' },
      { label: 'Revised', value: 'revised' },
      { label: 'Final', value: 'final' }
    ],
    DOCUMENT_TYPE: [
      {
        label: 'Individual Identity Proof',
        value: 'individual-identity',
        documents: [
          { label: 'Pan Card', value: DOCUMENT_TYPES.PAN },
          { label: 'Driver License', value: DOCUMENT_TYPES.DL },
          { label: 'Passport', value: DOCUMENT_TYPES.PASSPORT },
          { label: 'Voter Id', value: DOCUMENT_TYPES.VOTER_ID },
          { label: 'adhaar', value: DOCUMENT_TYPES.ADHAAR }
        ]
      },
      {
        label: 'Business Identity Proof',
        value: 'individual-identity',
        documents: [
          { label: 'Business Pan Card', value: DOCUMENT_TYPES.CPAN },
          { label: 'Udyam Adhaar', value: DOCUMENT_TYPES.UDYAM },
          { label: 'Shops and Establishment', value: DOCUMENT_TYPES.SNE },
          { label: 'Drug License', value: DOCUMENT_TYPES.DRUG_LICENSE }
        ]
      },
      {
        label: 'Individual Address Proof',
        value: 'individual-address',
        documents: [
          { label: 'Mobile Bill', value: DOCUMENT_TYPES.MOBILE_BILL },
          { label: 'Electricity Bill', value: DOCUMENT_TYPES.ELECTRIC_BILL },
          { label: 'Adhaar', value: DOCUMENT_TYPES.ADHAAR },
          { label: 'Ration Card', value: DOCUMENT_TYPES.RATION },
          { label: 'Bank Statement', value: DOCUMENT_TYPES.BANK_STATEMENT }
        ]
      },
      {
        label: 'Business Address Proof',
        value: 'business-address',
        documents: [
          { label: 'Business Pan Card', value: 'cpan' },
          { label: 'Udyam Adhaar', value: 'udyamm-adhaar' },
          { label: 'Shops and Establishment', value: 'sne' },
          { label: 'Drug License', value: 'druglicense' }
        ]
      },
      {
        label: 'Individual Income Proof',
        value: 'income',
        documents: [
          { label: 'ITR', value: 'itr' },
          { label: 'Salary Slip', value: 'salary-slip' },
          { label: 'Contract Agreement', value: 'contract-agreement' },
          { label: 'Bank Statement', value: 'bank-statement' }
        ]
      },
      {
        label: 'Business Income Proof',
        value: 'income',
        documents: [
          { label: 'ITR', value: 'itr' },
          { label: 'Gstn Filing', value: 'gstn-filing' },
          { label: 'Purchase Invoice', value: 'purchase-invoice' },
          { label: 'Current Account Statement', value: 'ca-statement' }
        ]
      },
      { label: 'Credit Report', value: 'creditReport' }
    ]
  }
}

export default constants
