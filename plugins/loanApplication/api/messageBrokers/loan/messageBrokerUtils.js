const buildLoan = (loanApplication, userId) => {
  const {
    primaryBorrowerId,
    lmsPrimaryBorrowerId,
    coBorrowerId,
    lmsCoBorrowerId,
    lmsCoBorrowerFormattedId,
    lmsPrimaryBorrowerFormattedId,
    companyId,
    lmsCompanyId,
    _id,
    lmsLoanApplicationId,
    lmsLoanAccountNumber
  } = loanApplication
  const loan = {
    primaryBorrowerId,
    lmsPrimaryBorrowerId,
    coBorrowerId,
    lmsCoBorrowerId,
    companyId,
    lmsCompanyId,
    loanApplicationId: _id,
    lmsLoanApplicationId,
    userId,
    modifiedBy: userId,
    lmsLoanAccountNumber,
    lmsCoBorrowerFormattedId,
    lmsPrimaryBorrowerFormattedId,
  }
  return loan
}

export default {
  buildLoan
}
