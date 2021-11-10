const { values } = require('underscore')
const faker = require('faker/locale/en_IND')
const Random = require('meteor-random')
const customerFactory = () => {
  const createdAt = faker.date.past()
  const gender = 'F'
  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName(gender)
  const state = faker.address.state()
  const customer = {
    createdAt,
    integrationId: Random.id(9),
    firstName,
    lastName,
    middleName: faker.name.middleName(gender),
    sex: 1,
    birthDate: faker.date.past(20, new Date()),
    primaryEmail: faker.internet.email(firstName, lastName, 'noco.in'),
    primaryPhone: faker.phone.phoneNumber('+91##########'),
    emails: [
      faker.internet.email(firstName, lastName, 'loco.in'),
      faker.internet.email(firstName, lastName, 'doco.in')
    ],
    phones: [
      faker.phone.phoneNumber('+91##########'),
      faker.phone.phoneNumber('+91##########')
    ],
    leadStatus: 'new',
    status: 'Active',
    lastSeenAt: faker.date.between(createdAt, new Date()),
    isOnline: false,
    sessionCount: faker.datatype.number(),
    panNumber: faker.random.alphaNumeric(10),
    // customFieldsData: {
    //   addressLine1: faker.address.streetAddress(),
    //   addressLine2: faker.address.streetAddress(),
    //   state,
    //   city: faker.address.city(),
    //   pincode: faker.address.zipCodeByState(state),
    //   country: 'IN'
    // },
    tagIds: [Random.id()],
    ownerId: Random.id(),
    emailValidationStatus: 'valid',
    phoneValidationStatus: 'valid',
    profileScore: 0,
    code: faker.random.alphaNumeric(),
    relatedIntegrationIds: [Random.id(5), Random.id(5)],
    state: 'customer',
    companyIds: [Random.id(9), Random.id[9]]
  }
  return customer
}
const taskFactory = () => ({
  name: 'PD Task',
  taskType: 'pd',
  loanApplicationId: '4nTad9baPeXyxRENH',
  description: 'Perform CPV',
  borrowerType: 'retailer',
  productType: 'shortterm'
})
const companyFactory = () => {
  const domain = faker.internet.domainName()
  const companyDoc = {
    primaryName: faker.company.companyName(),
    names: [faker.company.catchPhrase(), faker.company.catchPhrase()],
    size: faker.datatype.number(),
    industry: 'Retail',
    website: domain,
    tagIds: ['de', 'fe'],
    plan: faker.company.bsNoun(),
    status: 'Active',
    phones: [faker.phone.phoneNumber('+91##########')],
    emails: [
      faker.internet.email('service', '', domain),
      faker.internet.email('contact', '', domain)
    ],
    scopeBrandIds: ['HLL', 'ITC'],
    primaryPhone: faker.phone.phoneNumber('+91##########'),
    primaryEmail: faker.internet.email('info', '', domain),
    parentCompanyId: faker.datatype.uuid().toString(),
    ownerId: faker.datatype.uuid().toString(),
    code: faker.random.alphaNumeric()
  }
  return companyDoc
}

const loanApplicationFactory = () => {
  const DOCUMENT_TYPES = {
    PAN: 'pan',
    UDYAM: 'udyam',
    SNE: 'sne',
    MOBILE_BILL: 'mobile-bill',
    BANK_STATEMENT: 'bank-statement'
  }
  const amounts = [500000, 100000, 125000, 150000, 200000]
  const loanApplication = {
    primaryBorrowerId: 'zsoX6sqHBpgcW8NgK',
    coBorrowerId: 't4DSjBNkrTPRj9NFB',
    companyId: 'xP4EkCeps92C78fMK',
    softCreditId: Random.id(9),
    productType: 'shortterm',
    bureauCreditScoreRefId: Random.id(9),
    applicationDocuments: values(DOCUMENT_TYPES).map(dt => ({
      documentType: dt,
      documentName: dt,
      documentRefId: Random.id(6),
      documentVerified: true,
      documentVerificationDetails: {
        verified: true,
        verificationSource: 'Karxxa'
      }
    })),
    borrowerType: 'retailer',
    loanOffers: amounts.map(am => ({
      loanProduct: '100 Day Loan',
      productCode: 'STL001',
      loanAmount: am,
      interestRate: 2.5,
      interestFrequency: 'per-month',
      loanTenureInDays: 100,
      loanOfferStage: 'revised',
      loanOfferDate: new Date(),
      processingFeesPercent: 3,
      processingFeesFixed: 100,
      lender: 'NP'
    })),
    currentLoanOffer: {
      loanProduct: '100 Day Loan',
      productCode: 'STL001',
      loanAmount: 200000,
      interestRate: 2.5,
      interestFrequency: 'per-month',
      loanTenureInDays: 100,
      loanOfferStage: 'final',
      loanOfferDate: new Date(),
      processingFeesPercent: 3,
      processingFeesFixed: 100,
      lender: 'NP'
    },
    stages: [1, 2].map(d => ({
      previousStage: 'CPV',
      currentStage: 'PD',
      stageChangeDate: new Date(),
      decisionEngineResponse: {},
      stateSuccess: 'success'
    })),
    currentStage: {
      previousStage: 'CPV',
      currentStage: 'PD',
      stageChangeDate: new Date(),
      decisionEngineResponse: {},
      stateSuccess: 'success'
    },
    statusChangeDate: new Date(),
    applicationStatus: 'active',
    creditScore: {
      creditScore: 700,
      scoreSource: 'CIBIL',
      scoreSouceRefId: Random.id(5),
      createdAt: new Date(),
      scoreType: 'soft'
    }
  }
  return loanApplication
}

module.exports = {
  customerFactory,
  loanApplicationFactory,
  companyFactory,
  taskFactory
}
