import { Schema } from 'mongoose'
import constants from '../../pluginConstants'
import { uniq, uniqBy } from 'lodash'
const getEnum = (key) => {
  const appDocConstants = constants.APPLICATION_DOCUMENTS
  if (key === 'DOCUMENT_TYPE') {
    return appDocConstants.DOCUMENT_TYPE.map(dt => dt.value)
  } else if (key === 'DOCUMENT_NAME') {
    const docNameEnum = []
    appDocConstants.DOCUMENT_TYPE.forEach(ad => {
      if (ad.documents) {
        docNameEnum.concat(ad.documents.map(d => d.value))
      }
    })
    return uniq(docNameEnum)
  }
}

const getSelectOptions = (key) => {
  const appDocConstants = constants.APPLICATION_DOCUMENTS
  if (key === 'DOCUMENT_TYPE') {
    return appDocConstants.DOCUMENT_TYPE.map(dt => ({ label: dt.label, value: dt.value }))
  } else if (key === 'DOCUMENT_NAME') {
    const docNameEnum = []
    appDocConstants.DOCUMENT_TYPE.forEach(ad => {
      if (ad.documents) {
        docNameEnum.concat(ad.documents.map(d => ({ label: d.label, value: d.value })))
      }
    })

    return uniqBy(docNameEnum, 'value')
  }
}

const applicationStage = new Schema({
  previousState: {
    type: String,
    optional: false,
    label: 'Previous Stage'
  },
  currentStage: {
    type: String,
    optional: false,
    label: 'Current Stage'
  },
  stageChangeDate: {
    type: Date,
    optional: false,
    label: 'Change Date'
  },
  decisionEngineResponse: {
    type: Schema.Types.Mixed,
    optional: true,
    label: 'Decision Engine Rsponse'
  },
  stateSuccess: {
    type: String,
    optional: false,
    enum: constants.APPLICATION_DOCUMENTS.APPLICATION_STAGE_STATE.map(a => a.value),
    selectOptions: constants.APPLICATION_DOCUMENTS.APPLICATION_STAGE_STATE,
    label: 'Stage State'
  }
}, { _id: false })
const loanOffer = new Schema({
  loanProduct: {
    type: String,
    optional: false,
    label: 'Loan Product'
  },
  productCode: {
    type: String,
    optional: false,
    label: 'Product Code'
  },
  loanAmount: {
    type: Number,
    optional: false,
    label: 'Loan Amount'
  },
  interestRate: {
    type: Number,
    optional: false,
    label: 'Interest Rate'
  },
  interestFrequency: {
    type: String,
    optional: false,
    label: 'Loan Tenure Units',
    enum: constants.APPLICATION_DOCUMENTS.INTEREST_FREQUENCY.map(lt => lt.value),
    selectOptions: constants.APPLICATION_DOCUMENTS.INTEREST_FREQUENCY
  },
  loanTenureInMonths: {
    type: Number,
    optional: false,
    label: 'Loan Tenurein Months'
  },
  loanOfferStage: {
    type: String,
    optional: false,
    label: 'Loan Offer Stage',
    enum: constants.APPLICATION_DOCUMENTS.LOAN_OFFER_STAGES.map(lo => lo.value),
    selectOptions: constants.APPLICATION_DOCUMENTS.LOAN_OFFER_STAGES
  },
  loanOfferDate: {
    type: Date,
    label: 'Offer Date'
  },
  processingFees: {
    type: Number,
    optional: false,
    label: 'Processing Fees'
  },
  lender: {
    type: String,
    optional: true,
    label: 'Lender Ref Id'
  }
}, { _id: false })
const applicationDocumentsSchema = new Schema({
  documentType: {
    type: String,
    optional: false,
    label: 'Document Type',
    enum: getEnum('DOCUMENT_TYPE'),
    selectOptions: getSelectOptions('DOCUMENT_TYPES')
  },
  documentRefId: {
    type: String,
    optional: false,
    label: 'Document Reference Id'
  },
  documentVerified: {
    type: Boolean,
    optional: false,
    label: 'Is Document Verified'
  },
  documentVerificationDetails: {
    type: Schema.Types.Mixed,
    optional: true,
    label: 'Verification Details'
  }
}, { _id: false })

const creditScore = new Schema({
  creditScore: {
    type: Number,
    optional: false,
    label: 'Credit Score'
  },
  scoreSource: {
    type: String,
    optional: false,
    label: 'Score Source'
  },
  scoreSourceRefId: {
    type: String,
    optional: false,
    label: 'Score Source Ref Id'
  },
  createdAt: {
    type: Schema.Types.Date,
    optional: false,
    label: 'Score Calculation Date'
  },
  scoreType: {
    type: String,
    optional: false,
    enum: constants.APPLICATION_DOCUMENTS.SCORE_TYPES.map(st => st.value),
    selectOptions: constants.APPLICATION_DOCUMENTS.SCORE_TYPES
  }
}, { _id: false })

const LoanApplication = new Schema({
  // _id: { pkey: true },
  userId: {
    type: String,
    optional: false,
    label: 'Created By'
  },
  modifiedBy: {
    type: String,
    optional: false,
    label: 'Modified By'
  },
  applicationNumber: {
    type: String,
    optional: false,
    label: 'Application Number'
  },
  primaryBorrowerId: {
    type: String,
    optional: false,
    label: 'Primary Borrower'
  },
  coBorrowerId: {
    type: String,
    optional: false,
    label: 'Co-Borrower'
  },
  companyId: {
    type: String,
    optional: true,
    label: 'Company Details'
  },
  // Deal will contain all deal details including loan amount and interest rates etc
  softCreditId: {
    type: String,
    optional: true,
    label: 'Soft Credit Ref Id'
  },
  bureauCreditScoreRefId: {
    type: String,
    optional: true,
    label: 'Soft Credit Ref Id'
  },
  applicationDocuments: {
    type: [applicationDocumentsSchema],
    optional: true,
    label: 'Application Documents'
  },
  borrowerType: {
    type: String,
    optional: false,
    label: 'Type of borrower',
    enum: constants.APPLICATION_DOCUMENTS.BORROWER_TYPE.map(cb => cb.value),
    selectOptions: constants.APPLICATION_DOCUMENTS.BORROWER_TYPE
  },
  loanOffers: {
    type: [loanOffer],
    optional: false,
    label: 'loan Offers'
  },
  productType: {
    type: String,
    optional: false,
    label: 'Product Type',
    enum: constants.APPLICATION_DOCUMENTS.PRODUCT_TYPE.map(pt => pt.value),
    selectOptions: constants.APPLICATION_DOCUMENTS.PRODUCT_TYPE
  },
  currentLoanOffer: {
    type: loanOffer,
    optional: false,
    label: 'Current Loan Offer'
  },
  stages: {
    type: [applicationStage],
    optional: false,
    label: 'Application Stage'
  },
  currentStage: {
    type: applicationStage,
    optional: false,
    label: 'CurrentStage'
  },
  statusChangeDate: {
    type: Date,
    optional: true,
    label: 'Status Change Date'
  },
  applicationStatus: {
    type: String,
    optional: false,
    label: 'Application Status',
    enum: constants.APPLICATION_DOCUMENTS.APPLICATION_STATUS.map(as => as.value),
    selectOptions: constants.APPLICATION_DOCUMENTS.APPLICATION_STATUS
  },
  creditScore: {
    type: creditScore,
    optional: true,
    label: 'Credit Score Details'
  },
  integrationId: {
    type: String,
    optional: true,
    label: 'Integration Id'
  }

}, { timestamps: true }
)

export default LoanApplication
