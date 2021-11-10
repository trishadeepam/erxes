import messageBrokerHandler from './messageBrokerHandler'

const actionMap = {
  createLoan: { landler: messageBrokerHandler.createLoan },
  uodateLoan: { landler: messageBrokerHandler.updateLoan },
  getLoan: { landler: messageBrokerHandler.getLoan }
}

export default actionMap
