import { debugError, debugLoanApplication, debugRequest } from '../debuggers'
import { routeErrorHandling } from '../helpers'
import { createIntegration } from './handleController'
import { verifyApiToken } from '../utils'
import { INTEGRATION_KIND } from './constants'
const init = async app => {
  // register message queue messages.
  const kind = INTEGRATION_KIND
  debugLoanApplication('Initialiting npLOS')
  app.post('/los/create-integration', routeErrorHandling(async (req, res) => {
    debugRequest(debugLoanApplication, req)
    try {
      const { accountId, integrationId, data } = req.body
      await createIntegration(integrationId, data, accountId, kind)
      debugLoanApplication('Successfully added LOS integration')
      return res.json({ status: 'ok' })
    } catch (e) {
      debugError(e.stack)
    }
  }))
  // FIXME: Need to implement these endpoints for api requests.
  app.post('/los/createCustomer', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    await verifyApiToken(apiToken)
  }))
  app.post('/los/createCompany', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/createLoanApplication', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/updateCustomer', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/updateCompany', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/updateLoanApplication', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/updateDeal', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/deleteDeal', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/createTask', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
  app.post('/los/updateTask', routeErrorHandling(async (req, res) => {
    const apiToken = req.get('apiToken')
    verifyApiToken(apiToken)
  }))
}

export default init
