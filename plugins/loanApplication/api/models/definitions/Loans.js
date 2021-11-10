import { Schema } from 'mongoose'
import * as Random from 'meteor-random'
const Loans = new Schema({
  _id: {
    type: String,
    default: () => Random.id()
  },
  userId: {
    type: String,
    optional: false,
    label: 'Created By'
  },
  integrationId: {
    type: String,
    optional: true,
    label: 'Integration Id'
  },
  modifiedBy: {
    type: String,
    optional: false,
    label: 'Modified By'
  },
  loanApplicationId: {
    type: String,
    optional: false,
    label: 'Associated Laon Id'
  },
  lmsLoanApplicationId: {
    type: String,
    optional: false,
    label: 'Loan Application Id'
  },
  lmsLoanAccountNumber: {
    type: String,
    optional: false,
    label: 'Loan Application Id'
  },
  primaryBorrowerId: {
    type: String,
    optional: false,
    label: 'Customer Id'
  },
  coBorrowerId: {
    type: String,
    optional: false,
    label: ' Co Borrower Id'
  },
  lmsPrimaryBorrowerId: {
    type: String,
    optional: false,
    label: 'Lms Primary Borrower Id'
  },
  lmsCoBorrowerId: {
    type: String,
    optional: false,
    label: 'Lms Co Borrower Id'
  },
  lmsPrimaryBorrowerFormattedId: {
    type: String,
    optional: false,
    label: 'Lms Primary Borrower formatted Id'
  },
  lmsCoBorrowerFormattedId: {
    type: String,
    optional: false,
    label: 'Lms Co Borrower formatted Id'
  },
  companyId: {
    type: String,
    optional: false,
    label: 'Company Id'
  },
  lmsCompanyId: {
    type: String,
    optional: false,
    label: 'Lms Company Id'
  }
}, { timestamps: true })

export default Loans
