import { values, isUndefined, isNull } from 'lodash'
import { BORROWER_TYPES, APPLICATION_STATUSES } from '../../pluginConstants'
import utils from '../../utils'

import services from '../../services'
const validateApplication = (originalDoc, newDoc) => {
  // Cannot change primary applicant or company name.
  // If primary applicant changes, then new application.
  // Can Change co-borrower.
  return true
}

const checkDuplication = async (models, { primaryBorrowerId, companyId }) => {
  // Check if this borrower has an application
  try {
    let applicationValidity
    const application = await models.LoanApplications.findOne({
      primaryBorrowerId
    })
    if (isNull(application)) {
      applicationValidity = await services.getNewApplicationValidity({
        application
      })
      if (applicationValidity.pass) {
        return { duplicate: false }
      } else {
        return {
          duplicate: false,
          error: applicationValidity
        }
      }
    }
    // load borrower details
    const borrower = await models.Customers.getCustomer(primaryBorrowerId)
    let company
    if (companyId != undefined) {
      company = await models.Companies.getCompany(companyId)
    }
    // Implement rule engine strategy to check if application is valid
    // Implement in Dgifi
    applicationValidity = await services.getExistingApplicationValidity({
      application,
      borrower,
      company
    })
    if (applicationValidity.pass) {
      return { duplicate: true, application }
    } else {
      return {
        duplicate: true,
        error: applicationValidity
      }
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
const editApplication = async (models, user, args, logUtils) => {
  const { _id, applicationDoc } = args
  const originalApplication = await models.LoanApplication.findOne({ _id })
  if (isNull(originalApplication)) {
    throw new Error('INVALID_APPLICATION_ID')
  }
  if (validateApplication(applicationDoc, originalApplication)) {
    const application = await models.LoanApplication.editApplication(
      applicationDoc
    )
    // Put edit log
    await logUtils.putUpdateLog(
      {
        type: 'loanApplication',
        object: originalApplication,
        newData: applicationDoc,
        updatedDocument: application
      },
      user
    )
  } else {
    throw new Error('APPLICATION_EDIT_VALIDATION_FAILED')
  }
}
const deleteApplication = async (models, user, args, logUtils) => {
  const { _id } = args
  try {
    // When delete. Set status to deleted. This should never be called unless erroneously loan application is created
    const loanApplication = await models.LoanApplications.findOne({ _id })
    loanApplication.status = APPLICATION_STATUSES.DELETED
    return models.LoanApplication.editApplication(loanApplication)
  } catch (e) {
    throw new Error(e.message)
  }
}

const createApplication = async (models, user, args, logUtils) => {
  const {
    primaryBorrowerId,
    companyId,
    borrowerType
  } = args
  if (values(BORROWER_TYPES).indexOf(borrowerType) === -1) {
    throw new Error('BORROWER_TYPE_NOT_SUPPORTED')
  }
  if (isUndefined(primaryBorrowerId)) {
    throw new Error('NO_PRIMARY_BORROWER')
  }
  // if (borrowerType !== BORROWER_TYPES.INDIVIDUAL && isUndefined(companyId)) {
  //   throw new Error('NO_ASSOCIATED_COMPANY')
  // }
  try {
    let { application, duplicate, error } = await checkDuplication(models, {
      primaryBorrowerId, companyId
    })
    if (error) {
      return {
        error
      }
    }
    if (duplicate) {
      application.duplicate = duplicate
      return application
    }
    // First check the if this customer exists
    const primaryBorrower = await models.Customers.findOne({ _id: primaryBorrowerId })
    if (isNull(primaryBorrower)) {
      throw new Error('PRIMARY_BORROWER_DOES_NOT_EXIST')
    }
    // create new application
    // If we are creating new application, we will only have basic details of customer data
    // create new application Number -
    application = Object.assign({}, args)
    const sequence = await models.Counters.getSequence('loanApplication')
    application.applicationNumber = utils.generateApplicationNumber(
      application,
      sequence
    )
    application.primaryBorrowerId = primaryBorrowerId
    if (application.borrowerType !== BORROWER_TYPES.INDIVIDUAL) {
      application.companyId = companyId
    }
    const loanApplicationDoc = {
      createdAt: new Date(),
      modifiedAt: new Date(),
      userId: user._id,
      modifiedBy: user._id,
      ...application
    }
    const loanApplication = await models.LoanApplications.createApplication(
      loanApplicationDoc, user
    )
    await utils.createConformity(models, {
      mainType: 'loanApplication',
      mainTypeId: loanApplication._id,
      companyIds: [companyId],
      customerIds: [application.primaryBorrowerId]
    })
    await logUtils.putCreateLog(
      {
        type: 'loanApplication',
        newData: loanApplicationDoc,
        object: loanApplication
      },
      user
    )
    return loanApplication
  } catch (e) {
    throw new Error(e.message)
  }
}
export default {
  validateApplication,
  createApplication,
  deleteApplication,
  editApplication
}
