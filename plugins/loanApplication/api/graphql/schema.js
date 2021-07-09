export const types = `
  type LoanApplication {
    _id: String!
    userId: String,
    modifiedBy: String,
    applicationNumber: String,
    primaryBorrower: Customer,
    coBorrower: Customer,
    company: Company,
    softCredit: JSON
    BureauCredit: JSON,
    applicationDocuments: JSON,
    borrowerType: String,
    loanOffers: [JSON],
    currentLoanOffer: JSON,
    stages: [JSON],
    currentStage: JSON,
    statusChangeDate: String,
    ApplicatinStatus: String,
    creditScore: JSON
  }
`;
// We can build these query parameters as we go along

const loanParameters = `
userId: String,
modifiedBy: String,
applicationNumber: String,
primaryBorrowerId: String,
coBorrowerId: String,
companyId: String,
softCredit: JSON
BureauCredit: JSON,
applicationDocuments: JSON,
borrowerType: String,
loanOffers: [JSON],
currentLoanOffer: JSON,
stages: [JSON],
currentStage: JSON,
ApplicatinStatus: String,
creditScore: JSON
`;
const queryParameters = `
  _id: String,
  applicationNumber: String
`;
const listQueryParameters = `
  status: String,
`;
export const queries = `
  getLoanApplication(${queryParameters}): LoanApplication
  getLoanApplications(${listQueryParameters}): [LoanApplication]
`;

export const mutations = `
  createLoanApplication(${loanParameters}): LoanApplication
  editLoanApplication(_id: String!,${loanParameters}): LoanApplication
  deleteLoanApplication(_id: String!): LoanApplication
`;
