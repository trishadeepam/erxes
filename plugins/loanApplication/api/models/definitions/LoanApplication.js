import { Schema } from 'mongoose'
import * as Random from 'meteor-random'

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
    productId: {
        type: String,
        optional: false,
        label: 'Product Id'
    },
    productSchemeId: {
        type: String,
        optional: false,
        label: 'Product Scheme Id'
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
    },
    proposedDisbursementDate: {
        type: Date,
        label: 'Proposed Disbursement Date'
    },
    proposedFirstRepaymentDate: {
        type: Date,
        optional: true,
        label: 'Proposed First Repayment Date'
    },
    proposedFirstInterestPaymentDate: {
        type: Date,
        optional: true,
        label: 'Proposed First Interest Payment Date'
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
const accountDetails = new Schema({
    accountNumber: {
        type: String,
        optional: false,
        label: 'Account Number'
    },
    bankName: {
        type: String,
        optional: false,
        label: 'Bank Name'
    },
    IFSC: {
        type: String,
        optional: false,
        label: 'IFSC Code'
    },
    accountType: {
        type: String,
        optional: false,
        enum: constants.APPLICATION_DOCUMENTS.ACCOUNT_TYPE.map(ac => ac.value),
        selectOptions: constants.APPLICATION_DOCUMENTS.ACCOUNT_TYPE,
        label: 'Account Type'
    },
    accountHolderName: {
        type: String,
        optional: false,
        label: 'Account Holder Name'
    },
    accountToken: {
        type: String,
        optional: false,
        label: 'Account Specific Access Token'
    }
})
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

const loanDetails = new Schema(
    {
        loanAmount: {
            type: Number,
            optional: false,
            label: 'Loan Amount'
        },
        loanPurpose: {
            type: String,
            optional: false,
            label: 'Purpose of Loan'
        }

    }, { _id: false }
)

const address = new Schema(
    {

        address1: {
            type: String,
            optional: false,
            label: 'Address 1'
        },
        address2: {
            type: String,
            optional: false,
            label: 'Address 2'
        },
        country: {
            type: String,
            optional: false,
            label: 'Country'
        },
        state: {
            type: String,
            optional: false,
            label: 'State'

        },
        city: {
            type: String,
            optional: false,
            label: 'City'
        },
        zipcode: {
            type: String,
            optional: false,
            label: 'Zipcode'

        }
    }, {_id: false}
)
const businessDetails = new Schema(
    {
        businessName: {
            type: String,
            optional: false,
            label: 'Business Name'
        },
        businessVintage: {
            type: Number,
            optional: false,
            label: 'Business Vintage'
        },
        annualSales: {
            type: Number,
            optional: false,
            label: 'Annual Sales'
        },
        businessAddress: {
            type: address,
            optional: false,
            label: 'Business Address'
        },
        storeCategory: {
            type: String,
            optional: true,
            label: 'Store Category'
        },
        storeOwnership: {
            type: String,
            optional: true,
            label: 'Store Ownership'
        },
        storeSize: {
            type: String,
            optional: true,
            label: 'Store Size'
        },
        ownOtherStores: {
            type: String,
            optional: true,
            label: 'Own Other Stores'
        },
        numberOfEarningMembers: {
            type: String,
            optional: true,
            label: 'Number of Earning Members'

        },
        monthlyIncome: {
            type: String,
            optional: true,
            label: 'Monthly Income'
        },
        monthlyRent: {
            type: String,
            optional: true,
            label: 'Monthly Rent'
        }

    }, {_id: false}
)

const personalDetails = new Schema(
    {
        dob: {
            type: String,
            optional: true,
            label: 'Date of Birth'
        },
        maritalStatus: {
            type: String,
            optional: true,
            label: 'Marital Status'
        },
        userEthnicity: {
            type: String,
            optional: true,
            label: 'User Ethnicity'
        },
        userEducation: {
            type: String,
            optional: true,
            label: 'User Education'
        },
        numberOfDependents: {
            type: Number,
            optional: true,
            label: 'Number of Dependents'
        },
        sex: {
            type: String,
            optional: true,
            label: 'Gender'
        },
        residentialAddress: {
            type: address,
            optional: true,
            label: 'Residential Address'
        }
    }, {_id: false}
)
const LoanApplication = new Schema({
        _id: {
            type: String,
            default: () => Random.id()
        },
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
        lmsPrimaryBorrowerId: {
            type: Number,
            optional: false,
            label: 'Customer Id on the LMS'
        },
        lmsPrimaryBorrowerFormattedId: {
            type: String,
            optional: false,
            label: 'Lms Primary Borrower Id'
        },
        lmsCoBorrowerFormattedId: {
            type: String,
            optional: false,
            label: 'Lms Co Borrower Id'
        },
        lmsLoanId: {
            type: String,
            optional: false,
            label: 'Loan Id on LMS system'
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
        lmsCoBorrowerId: {
            type: String,
            optional: false,
            label: 'LMS Co-Borrower id'
        },
        companyId: {
            type: String,
            optional: true,
            label: 'Company Details'
        },
        lmsConpanyId: {
            type: String,
            optional: true,
            label: 'LMS company Id'
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
        disbursementAccount: {
            type: accountDetails,
            optional: true,
            label: 'Disbursement Account Details'
        },
        repaymentAccount: {
            type: accountDetails,
            optional: true,
            label: 'Repayment Account Details'
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
        loanPurpose: {
            type: String,
            optional: true,
            enum: constants.APPLICATION_DOCUMENTS.LOAN_PURPOSE.map(as => as.value),
            selectOptions: constants.APPLICATION_DOCUMENTS.LOAN_PURPOSE
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
        disbursementDate: {
            type: Date,
            optional: true,
            label: 'Actual Disbursement Date'
        },
        disbursementMode: {
            type: String,
            optional: true,
            label: 'Disbursement Mode',
            enum: constants.APPLICATION_DOCUMENTS.DISBURSEMENT_MODE.map(dm => dm.value),
            selectOptions: constants.APPLICATION_DOCUMENTS.DISBURSEMENT_MODE
        },
        repaymentMode: {
            type: String,
            optional: true,
            label: 'Disbursement Mode',
            enum: constants.APPLICATION_DOCUMENTS.REPAYMENT_MODE.map(dm => dm.value),
            selectOptions: constants.APPLICATION_DOCUMENTS.REPAYMENT_MODE
        },
        firstRepaymentDate: {
            type: Date,
            optional: true,
            label: 'Actual First Repayment Date'
        },
        integrationId: {
            type: String,
            optional: true,
            label: 'Integration Id'
        },
        firstInterestPaymentDate: {
            type: Date,
            optional: true,
            label: 'Proposed First Interest Payment Date'
        },
        numberOfInstallments: {
            type: Number,
            optional: true,
            label: 'Number of Loan Installments'
        },
        lmsLoanAccountNumber: {
            type: String,
            optional: true,
            label: 'LMS loan account Number'
        },
        lmsLoanApplicationId: {
            type: Number,
            optional: true,
            label: 'Lms Loan Application Id'
        },
        isLoanDisbursed: {
            type: Boolean,
            optional: true,
            label: 'Is loan disbursed started'
        },
        pan: {
            type: String,
            optional: true,
            label: 'Pan Number'
        },
        gstin:{
            type: String,
            optional: true,
            label: 'GSTIN Number'
        },
        loanDetails: {
            type: loanDetails,
            optional: true,
            label: 'Loan Details'
        },

        businessDetails: {
            type: businessDetails,
            optional: true,
            label: 'Business Details'
        },
        personalDetails: {
            type: personalDetails,
            optional: true,
            label: 'Personal Details'
        },
        whatsappPermission: {
            type: Boolean,
            optional: true,
            label: 'Permission for communicaton on whatsapp'
        }


    }, { timestamps: true }
)

export default LoanApplication
