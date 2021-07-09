import { isEmpty } from 'lodash'
const createApplication = async (applicationDoc, user) => {
  try {
    const application = await this.create({
      createdAt: new Date(),
      modifiedAt: new Date(),
      userId: user._id,
      modifiedBy: user._id,
      ...applicationDoc
    })
    return application
  } catch (e) {
    throw new Error(e.message)
  }
}

const editApplication = async (applicationDoc, user) => {
  try {
    await this.updateOne(
      { _id: applicationDoc._id },
      {
        $set: applicationDoc
      }
    )
    return this.findOne({ _id: applicationDoc._id })
  } catch (e) {
    throw new Error(e.message)
  }
}

const deleteApplication = async (applicationId) => {
  // No application is delerted
  const application = this.getApplication(applicationId)
  application.isDeleted = true
  await this.editApplication(application)
  return true
}

const getApplication  = async (applicationId) => {
  const application = await this.findOne({ _id: applicationId })
  if (isEmpty(application)) {
    throw new Error('INVALID_APPLICATION_ID')
  }
  return application
}

const extendLoanApplications = loanApplicationSchema => {
  loanApplicationSchema.statics.createApplication = createApplication
  loanApplicationSchema.statics.editApplication = editApplication
  loanApplicationSchema.statics.deleteApplication = deleteApplication
  loanApplicationSchema.statics.getApplication = getApplication
}

export default {
  extensionHandler: extendLoanApplications,
  model: 'LoanApplications'
}
