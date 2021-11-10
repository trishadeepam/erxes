import { debugError, debugLoanApplication } from '../debuggers'
import { Accounts, Integrations } from '../models'
import { LosIntergations } from './models'

export const createIntegration = async (
  integrationId,
  data,
  accountId,
  kind
) => {
  try {
    // Check existing Integration
    const integration = await Integrations.findOne({
      kind
    }).lean()

    if (integration) {
      throw new Error(`Integration already exists with this kind: ${kind}`)
    }
    const commonIntegration = await Integrations.create({
      kind,
      erxesApiId: integrationId
    })

    await LosIntergations.create({
      kind,
      ...data,
      integrationId: commonIntegration._id
    })
    debugLoanApplication('Integrations Created for loan Application')
  } catch (e) {
    debugError(`Failed to create integration: ${e}`)
    throw new Error(e)
  }
}
