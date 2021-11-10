import messageBrokerHandler from './messageBrokerHandler'

const actionMap = {
  createCustomer: { handler: messageBrokerHandler.createCustomer },
  createCompany: { handler: messageBrokerHandler.createCompany },
  createLoanApplication: {
    handler: messageBrokerHandler.createLoanApplication
  },
  createCoBorrower: { handler: messageBrokerHandler.createCoBorrower },
  creteDeal: { handler: messageBrokerHandler.createNewDeal },
  updateCustomer: { handler: messageBrokerHandler.updateCustomer },
  updateCompany: { handler: messageBrokerHandler.updateCompany },
  updateLoanApplication: {
    handler: messageBrokerHandler.updateLoanApplication
  },
  // deleteDeal: { handler: deleteDeal },
  updateApplicationStatus: {
    handler: messageBrokerHandler.updateApplicationStatus
  },
  createTask: { handler: messageBrokerHandler.createTask },
  updateTask: { handler: messageBrokerHandler.updateTask },
  changeTaskPriority: {handler: messageBrokerHandler.changeTaskPriority},
  sendNotification: { handler: messageBrokerHandler.sendNotification },
  /** GETTERS */
  getLoanApplication: { handler: messageBrokerHandler.getLoanApplication },
  getCustomer: { handler: messageBrokerHandler.getCustomer },
  getCompany: { handler: messageBrokerHandler.getCompany }
}

export default actionMap
