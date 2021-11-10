// FIXME: Lots of documents will come as metadata. Check with banking solutions for metadata db
export const BORROWER_TYPES = {
  RETAILER: 'retailer',
  DISTRIBUTOR: 'distributor',
  MSME: 'msme',
  INDIVIDUAL: 'individual'
}
export const DISBURSEMENT_MODE = {
  BANK_ACCOUNT_OTHER: 'OTHBACCT',
  BANK_ACCOUNT_SAME: 'ACCTWB',
  NP_WALLET: 'NPWALLET'
}
export const LOAN_PURPOSE = {
  PERSONAL: 'PERSONAL',
  WC: 'WC',
  MARRIAGE: 'MARG',
  AGRICULTIRE: 'AGRI',
  EDUCATION: 'EDU',
  BUSINESS: 'BUS',
  HOLIDAY: 'HOL',
  MEDICAL: 'MED',
  HOUSE_RENOVATION: 'HOUSE_RENOV',
  RESTRUCTURE: 'RESTRUCTURE',
  OTHERS: 'OTHERS'
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
  RATION: 'ration-card',
  PURCHASE_INVOICE: 'purchaseinvoice',
  ITR: 'itr',
  SALARY_SLIP: 'salaryslip',
  CONTRACT_AGREEMENT: 'contract-agreement',
  GSTN_FILINGS: 'gstn-finings',
  CA_STATEMENT: 'ca-statement'
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
export const REPAYMENT_MODE = {
  DIRECT_DEBIT: 'DIRDR',
  CASH: 'CASH',
  ACH: 'ACH'
}
export const ACCOUNT_TYPES = {
  SAVINGS: 'SAVINGS',
  CURRENT: 'CURRENT'
}
const constants = {
  MAX_APPLICATION_LIFE: 30,
  APPLICATION_DOCUMENTS: {
    ACCOUNT_TYPE: [
      {
        label: 'Savings Account',
        value: ACCOUNT_TYPES.SAVINGS
      },
      {
        label: 'Current Account',
        value: ACCOUNT_TYPES.CURRENT
      }
    ],
    REPAYMENT_MODE: [
      {
        label: 'Direct Debit',
        value: REPAYMENT_MODE.DIRECT_DEBIT
      },
      {
        label: 'Cash',
        value: REPAYMENT_MODE.CASH
      },
      {
        label: 'Automated Clearing',
        value: REPAYMENT_MODE.ACH
      }
    ],
    DISBURSEMENT_MODE: [
      {
        label: 'Other Bank Account',
        value: DISBURSEMENT_MODE.BANK_ACCOUNT_OTHER
      },
      {
        label: 'Same Bank Account',
        value: DISBURSEMENT_MODE.BANK_ACCOUNT_SAME
      },
      { label: 'Novopay Wallet', value: DISBURSEMENT_MODE.NP_WALLET }
    ],
    LOAN_PURPOSE: [
      { label: 'Business', value: LOAN_PURPOSE.BUSINESS },
      { label: 'Working Caputal', value: LOAN_PURPOSE.WC },
      { label: 'Loan Restructuring', value: LOAN_PURPOSE.RESTRUCTURE }
    ],
    PRODUCT_TYPE: [
      { label: 'Short Term Loan', value: PRODUCT_TYPES.SHORT_TERM_LOAN },
      { label: 'Term Loan', value: PRODUCT_TYPES.TERM_LOAN },
      { label: 'Credit Line', value: PRODUCT_TYPES.CRDEIT_LINE },
      { label: 'Zero Credit Line', value: PRODUCT_TYPES.ZERO_CREDIT_LINE },
      {
        label: 'Invoice Discounting',
        value: PRODUCT_TYPES.INVOICE_DISCOUNTING
      },
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
          { label: 'Business Pan Card', value: DOCUMENT_TYPES.CPAN },
          { label: 'Udyam Adhaar', value: DOCUMENT_TYPES.UDYAM },
          { label: 'Shops and Establishment', value: DOCUMENT_TYPES.SNE },
          { label: 'Drug License', value: DOCUMENT_TYPES.DRUG_LICENSE }
        ]
      },
      {
        label: 'Individual Income Proof',
        value: 'income',
        documents: [
          { label: 'ITR', value: DOCUMENT_TYPES.ITR },
          { label: 'Salary Slip', value: DOCUMENT_TYPES.SALARY_SLIP },
          {
            label: 'Contract Agreement',
            value: DOCUMENT_TYPES.CONTRACT_AGREEMENT
          },
          { label: 'Bank Statement', value: DOCUMENT_TYPES.BANK_STATEMENT }
        ]
      },
      {
        label: 'Business Income Proof',
        value: 'income',
        documents: [
          { label: 'ITR', value: DOCUMENT_TYPES.ITR },
          { label: 'Gstn Filing', value: DOCUMENT_TYPES.GSTN_FILINGS },
          { label: 'Purchase Invoice', value: DOCUMENT_TYPES.PURCHASE_INVOICE },
          {
            label: 'Current Account Statement',
            value: DOCUMENT_TYPES.CA_STATEMENT
          }
        ]
      },
      { label: 'Credit Report', value: 'creditReport' }
    ]
  }
}

export default constants
