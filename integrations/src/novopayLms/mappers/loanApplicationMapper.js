import objectMapper from 'object-mapper'
import dayjs from 'dayjs'

const accountDetails = accountDetails => {
  const map = {
    accountNumber: [
      {
        key: 'account_number'
      },
      {
        key: 'external_account_number'
      }
    ],
    accountType: [
      {
        key: 'external_account_type'
      },
      { key: 'account_type' }
    ],
    accountHolder: 'account_holder_name',
    IFSC: 'routing_value'
  }
  const lmsAccountLending = objectMapper(accountDetails, map)
  lmsAccountLending.routing_type = 'ROUT_TYP_IFSC'
  return lmsAccountLending
}
export const loanApplicationMapper = loanApplication => {
  const map = {
    lmsLoanId: {
      key: 'loan_details.id',
      default: null
    },
    lmsPrimaryBorrowerId: 'loan_details.customer_id',
    'currentLoanOffer.productSchemeId': 'loanDetails.product_scheme_id',
    'currentLoanOffer.loanAmount': {
      key: 'loan_details.loan_amount',
      transform: value => value.toString()
    },
    'currentLoanOffer.loanTenureInMonths': {
      key: 'loan_details.loan_term',
      transform: value => value.toString()
    },
    'currentLoanOffer.loanPurpose': 'loan_details.loan_purpose',
    'currentOffer.proposedDisbursementDate': {
      key: 'disbursement_details.expected_disbursement_date',
      transform: value =>
        dayjs(value)
          .valueOf()
          .toString()
    },
    disbursementMode: 'disbursement_details.mode',
    'currentLoanOffer.proposedFirstRepaymentDate': {
      key: 'repayment_details.first_repayment_date',
      transform: value =>
        dayjs(value)
          .valueOf()
          .toString()
    },
    'currentLoanOffer.proposedFirstInterestPaymentDate': {
      key: 'repayment_details.first_interest_payment_date',
      transform: value =>
        dayjs(value)
          .valueOf()
          .toString()
    },
    numberOfInstallments: {
      key: 'repayment_details.number_of_installments',
      transform: value => value.toString()
    },
    repaymentMode: 'repayment_details.mode'
  }
  const lmsLoanApplication = objectMapper(loanApplication, map)
  lmsLoanApplication.loan_details.office_id = '1'
  const disbursementAccountDetails = accountDetails(
    loanApplication.disbursementAccount
  )
  const repaymentAccount = accountDetails(loanApplication.repaymentAccount)
  disbursementAccountDetails.purpose = [{ code: 'DSBR_ACCT' }]
  repaymentAccount.purpose = [{ code: 'REP_ACCT' }]
  lmsLoanApplication.disbursement_repayment_account_details = []
  lmsLoanApplication.disbursement_repayment_account_details.push(disbursementAccountDetails)
  lmsLoanApplication.disbursement_repayment_account_details.push(repaymentAccount)
  return lmsLoanApplication
}
