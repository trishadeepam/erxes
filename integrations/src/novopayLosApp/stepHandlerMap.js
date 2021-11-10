import {
  manageBasicData,
  manageOtp,
  managePanData,
  manageBusinessIdentity,
  manageAddresses,
  manageIncomeDocument,
  manageDemographic,
  manageIncomeData,
  manageCoBorrowerData
} from './actions/stepActions'
export const stepNameMapForApplicationForm = {
  basicData: manageBasicData,
  OTP: manageOtp,
  panData: managePanData,
  businessIdentity: manageBusinessIdentity,
  addressStep: manageAddresses,
  incomeDocument: manageIncomeDocument,
  demographic: manageDemographic,
  incomeData: manageIncomeData,
  coBorrower: manageCoBorrowerData
}