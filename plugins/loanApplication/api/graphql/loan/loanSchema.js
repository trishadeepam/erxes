export const types = `
  type Loan {
    _id: String!
    userId: String,
    modifiedBy: String,
    loanApplication: LoanApplication,
    primaryBorrower: Customer,
    coBorrower: Customer,
    company: Company,
    lmsLoan: JSON,
  }
`;
// We can build these query parameters as we go along

const loanParameters = `
userId: String,
modifiedBy: String,
loanApplictationId: String,
primaryBorrowerId: String,
coBorrowerId: String,
companyId: String,
lmsLoanAccountNumber: String,
lmsLoanApplicationId: String
`;
const loanQueryParameters = `
  _id: String,
`;
const loanForCustomerQueryParameters = `
  customerId: String,
`;

export const queries = `
  getLoan(${loanQueryParameters}): Loan
  getLoansForCustomer(${loanForCustomerQueryParameters}): [Loan]
`;

export const mutations = `
  createLoan(${loanParameters}): LoanApplication
  editLoan(_id: String!,${loanParameters}): LoanApplication
  deleteLoan(_id: String!): LoanApplication
`;
