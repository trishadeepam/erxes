import { isEmpty, isNull, isUndefined } from 'lodash'
import { Schema } from 'mongoose'
import constants, { INTEREST_FREQUENCIES } from '../pluginConstants'
import utils from '../utils'
const extendDeals = dealSchema => {
  // Extend the product Data Schema to include loan parameters
  const productDataSchema = dealSchema.pick(['productsData'])
  // Add our variables.
  productDataSchema.add(
    new Schema({
      loanAmount: utils.field({ type: Number, label: 'Loan Amount' }),
      processingFees: utils.field({ type: Number, label: 'Processing Fees (%)' }),
      interestRate: utils.field({ type: Number, label: 'Interest Rate(%)' }),
      loanTenureInMonths: utils.field({
        type: Number,
        label: 'LoanT Tenure in Months'
      }),
      interestFrequency: utils.field({
        type: String,
        enum: INTEREST_FREQUENCIES,
        label: 'Interest Frequency',
        selectOptions: constants.INTEREST_FREQUENCY
      })
    }, { _id: false })
  )
  // remove the old one
  dealSchema.remove('productsData')
  dealSchema.add({
    productsData: utils.field({ type: [productDataSchema], label: 'Products' })
  })
  dealSchema.statics.addLoanApplication = addLoanApplication
}

const addLoanApplication = async (dealId, applicationId) => {
  try {
    const deal = this.findOne({ _id: dealId })
    if (isEmpty(deal) || isNull(deal)) {
      throw new Error('DEAL_NOT_FOUND')
    }
    if (isUndefined(deal.applicationId) || isNull(deal.applicationId)) {
      await this.UpdateOne({ _id: dealId }, { $set: { applicationId } })
    } else {
      throw new Error('DEAL_ALRADY_HAS_APPLICATION')
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export default {
  extensionHandler: extendDeals,
  model: 'Deals'
}
