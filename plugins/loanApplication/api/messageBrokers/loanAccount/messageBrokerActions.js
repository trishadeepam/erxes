import messageBroker from './messageBroker'
import messageBrokerHandler from './messageBrokerHandler'

const actionMap = {
  createCustomer: { handler: messageBrokerHandler.createCustomer },
  createCompany: { handler: messageBrokerHandler.createCompany },
  createLoanApplication: { handler: messageBrokerHandler.createLoanApplication },
  creteDeal: { handler: messageBrokerHandler.createNewDeal },
  updateCustomer: { handler: messageBrokerHandler.updateCustomer },
  updateCompany: { handler: messageBrokerHandler.updateCompany },
  updateLoanApplication: { handler: messageBrokerHandler.updateLoanApplication },
  // deleteDeal: { handler: deleteDeal },
  getLoanApplication: { handler: messageBrokerHandler.getLoanApplication },
  updateApplicationStatus: {handler: messageBrokerHandler.updateApplicationStatus},
  createTask: {handler: messageBrokerHandler.createTask},
  updateTask: {handler: messageBrokerHandler.updateTask},
  sendNotification: {handler: messageBrokerHandler.sendNotification},
}

export default actionMap