// import * as sinon from 'sinon'
const messageBroker = require('erxes-message-broker').default
const dotenv = require('dotenv')

const { customerFactory, companyFactory, loanApplicationFactory } = require('./losFactories')
dotenv.config()
const testRabbitMq = async () => {
  let client
  try {
    console.log('connecting....')
    const loanApplication = loanApplicationFactory()
    console.log(loanApplication)
    client = await messageBroker({
      name: 'integrations',
      server: '',
      envs: process.env
    })
    const message = {
      action: 'createLoanApplication',
      data: { loanApplication },
      kind: 'los',
      userId: 'HRmTorAeB9BoBLEW9'
    }
    const response = await client.sendRPCMessage('rpc_queue:loan-application', message)
    console.log(response)
  } catch (e) {
    console.log(e.message)
    console.log(e.stack)
  }
}
testRabbitMq()