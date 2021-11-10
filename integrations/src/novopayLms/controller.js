import { debugError, debugLoanApplication, debugRequest } from '../debuggers'
import { routeErrorHandling } from '../helpers'
import { createIntegration } from './handleController'
import { verifyApiToken } from '../utils'
import { INTEGRATION_KIND } from './constants'
import { getLmsLoanDetails } from './lmsController'
const init = async app => {
  // register message queue messages.
  const kind = INTEGRATION_KIND
  debugLoanApplication('Initialiting npLMS')
  app.post('/lms/create-integration', routeErrorHandling(async (req, res) => {
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
  app.post('/lms/createCustomer', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    await verifyApiToken(apiToken)
  }))
  app.post('/lms/createCompany', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/lms/createLoanApplication', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/lms/updateCustomer', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/lms/updateCompany', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.get('/lms/getLoanDetails', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/lms/getCurrentRepaymentDetails', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
    const { loan } = req.body
    return getLmsLoanDetails(loan)
  }))
}

export default init
