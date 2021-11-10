import { debugError, debugLoanApplication, debugRequest } from '../debuggers'
import { routeErrorHandling } from '../helpers'
import { createIntegration, handleFormDataWithStep} from './handleController'
import { verifyApiToken } from '../utils'
import { INTEGRATION_KIND } from './constants'
const init = async app => {
  // register message queue messages.
  const kind = INTEGRATION_KIND
  debugLoanApplication('Initialiting Movopay LOS App')
  app.post('/losApp/create-integration', routeErrorHandling(async (req, res) => {
    debugRequest(debugLoanApplication, req)
    try {
      const { accountId, integrationId, data } = req.body
      await createIntegration(integrationId, data, accountId, kind)
      debugLoanApplication('Successfully added LMS integration')
      return res.json({ status: 'ok' })
    } catch (e) {
      debugError(e.stack)
    }
  }))
  // FIXME: Need to implement these endpoints for api requests.
  app.post('/loaApp/applicationForm', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    await verifyApiToken(apiToken)
    const { formName, values, userId } = req.body
    const stepName = values.stepName
    const responseData = handleFormDataWithStep(values, stepName)
    responseData.id = responseData._id
    delete responseData._id
    return {
      actionForm: {
        values: responseData,
        formName: formName,
        errors: {}
      }
    }
  }))
}

export default init
