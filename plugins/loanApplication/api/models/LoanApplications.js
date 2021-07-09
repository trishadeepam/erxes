import { isEmpty } from 'lodash'
import LoanApplictionSchema from './definitions/LoanApplication'
class LoanApplication {
  static async createApplication (applicationDoc, user) {
    try {
      const application = await this.create({
        userId: user._id,
        modifiedBy: user._id,
        ...applicationDoc
      })
      return application
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static async editApplication (applicationDoc, user) {
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

  static async deleteApplication (applicationId) {
    // No application is delerted
    const application = this.getApplication(applicationId)
    application.isDeleted = true
    await this.editApplication(application)
    return true
  }

  static async getApplication (applicationId) {
    const application = await this.findOne({ _id: applicationId })
    if (isEmpty(application)) {
      throw new Error('INVALID_APPLICATION_ID')
    }
    return application
  }
}

export default {
  klass: LoanApplication,
  schema: LoanApplictionSchema,
  name: 'LoanApplications'
}
