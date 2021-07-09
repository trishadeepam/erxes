// import * as sinon from 'sinon'
import messageBroker from 'erxes-message-broker';
import * as dotenv from 'dotenv';
import * as request from 'request-promise';

import './setup';
import {
  customerFactory,
  companyFactory,
  loanApplicationFactory
} from './losFactories';
import { RPC_LOAN_APPLICATION_QUEUE } from '../loanApplication/constants';
dotenv.config();
describe('npLos Test', async () => {
  const customer = customerFactory();
  const company = companyFactory();
  const loanApplication = loanApplicationFactory();

  beforeEach(() => {});
  test('create Integration', async () => {
    const response = await request({
      uri: 'http://localhost:3400/los/create-integration',
      body: {
        kind: 'nplos'
      },
      json: true,
      method: 'post',
      headers: {
        userId: 'HRmTorAeB9BoBLEW9'
      }
    });
    expect(response.status).toBe('ok');
  });
  test('create Customer', async () => {
    let client;
    try {
      console.log('connecting....');
      client = await messageBroker({
        name: 'integrations',
        server: '',
        envs: process.env
      });
      const message = {
        action: 'createCustomer',
        customer
      };
      const response = await client.sendRPCMessage(
        RPC_LOAN_APPLICATION_QUEUE,
        message
      );
      expect(response.status).toBe('success');
      expect(response.data._id).not.toBeUndefined();
      expect(response.data._id.length).toBeGreaterThan(0);
      client.close();
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      client.close();
    }
  });
});
