// import * as sinon from 'sinon'
const messageBroker = require('erxes-message-broker').default
const dotenv = require('dotenv')
const createCustomer = {
  customerId: 'th9KXAMg5fXuucbvS'
}
dotenv.config()
const testRabbitMq = async () => {
  let client
  try {
    console.log('connecting....')
    const data = createCustomer
    console.log(data)
    client = await messageBroker({
      name: 'integrations',
      server: '',
      envs: process.env
    })
    const message = {
      action: 'createLmsCustomer',
      data: data,
      kind: 'lms',
      userId: 'EoKWiMsYJ2nAkA8oz'
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
