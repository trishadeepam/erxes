// import * as sinon from 'sinon'
const messageBroker = require('erxes-message-broker').default
const dotenv = require('dotenv')

const { customerFactory, companyFactory, loanApplicationFactory, taskFactory } = require('./losFactories')
dotenv.config()
const testRabbitMq = async () => {
  let client
  try {
    console.log('connecting....')
    const loanApplication = taskFactory()
    console.log(loanApplication)
    client = await messageBroker({
      name: 'integrations',
      server: '',
      envs: process.env
    })
    const message = {
      action: 'createTask',
      data: loanApplication,
      kind: 'los',
      userId: 'PL3LQfcSkFFS9ekLg'
    }
    client.sendMessage('loan-application:request', message)
    const response = await client.consumeQueue('loan-application:response')
    console.log(response)
  } catch (e) {
    console.log(e.message)
    console.log(e.stack)
  }
}
testRabbitMq()