import * as dotenv from 'dotenv';
import * as faker from 'faker';
import * as fs from 'fs';
import { disconnect } from 'mongoose';
import * as shelljs from 'shelljs';
import mongoose = require('mongoose');
import { getEnv } from '../data/utils';
import { FieldsGroups, Users, UsersGroups } from '../db/models';
// import {
//   // LEAD_LOAD_TYPES,
//   // MESSAGE_TYPES,
//   TAG_TYPES
// } from '../db/models/definitions/constants'
import { initMemoryStorage } from '../inmemoryStorage';
const connectionOptions: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoReconnect: true,
  family: 4,
  useFindAndModify: false
};
dotenv.config();
const MONGO_URL = getEnv({ name: 'MONGO_URL', defaultValue: '' });

const connect = async (URL?: string, options?) => {
  return mongoose.connect(URL || MONGO_URL, {
    ...connectionOptions,
    ...(options || { poolSize: 100 })
  });
};
const main = async () => {
  const MONGO_URL = getEnv({ name: 'MONGO_URL' });

  await shelljs.exec(`mongo "${MONGO_URL}" --eval 'db.killOp()'`, {
    silent: true
  });

  const connection = await connect();

  initMemoryStorage();

  const dbName = connection.connection.db.databaseName;

  console.log(`drop and create database: ${dbName}`);

  await connection.connection.dropDatabase();

  const userGroup = await UsersGroups.create({ name: 'admin' });
  const groups = ['support', 'marketing', 'management'];

  console.log('Creating: UserGroups');

  groups.forEach(async group => {
    await UsersGroups.create({ name: group });
  });

  console.log('Finished: UserGroups');

  const generator = require('generate-password');

  const newPwd = generator.generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true,
    strict: true
  });

  const path = require('path');
  const jsonPath = '../../../ui/cypress.json';
  const cypressSettings = require(jsonPath);

  cypressSettings.env.userPassword = newPwd;
  const newJson = JSON.stringify(cypressSettings, null, 2);

  fs.writeFile(path.resolve(__dirname, jsonPath), newJson, err => {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(cypressSettings, null, 2));
    console.log('writing to ' + jsonPath);
  });

  await FieldsGroups.createSystemGroupsFields();

  const userDoc = {
    createdAt: new Date(),
    username: 'novoloan-admin',
    password: newPwd,
    isOwner: true,
    email: 'operations@novoloan.com',
    getNotificationByEmail: true,
    details: {
      avatar: faker.image.avatar(),
      fullName: 'Novloan Administator',
      shortName: 'Admin',
      position: 'Admin Manager',
      location: 'Everywhere',
      description: 'Manage everything',
      operatorPhone: '9987318784'
    },
    links: {
      link: 'www.novoloan.com'
    },
    groupIds: [userGroup.id],
    isActive: true
  };

  console.log('Creating: Users');

  await Users.createUser(userDoc);

  console.log('Creating: Channels');

  console.log('Creating: Messenger Integration');

  await disconnect();
  console.log('admin email: admin@erxes.io');
  console.log('admin password: ', newPwd);
};

main();
