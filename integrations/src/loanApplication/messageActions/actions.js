import { response } from 'express'
import { isEmpty, isUndefined, values } from 'underscore'
import config from '../config'
import { TASK_TYPES, TASK_TYPE_LABELS } from '../constants'
const json2html = require('node-json2html');

const processError = response => {}
export const createLoanAplicationPreProcessor = (data, action) => {
  const { borrowerType, productType } = data
  const boardName = config[borrowerType].board
  const pipeLineName = config[borrowerType].boardPipeLine[productType]
  return { loanApplication: data, boardName, pipeLineName }
}

export const changeTaskPriorityPreProcessor = (data, action) => {
  if (values(TASK_TYPES).indexOf(data.taskType) === -1) {
    throw new Error('TASK_TYPE_NOT_SUPPORTED')
  }
  const task = {}
  return {
    task,
    ...data
  }
}

export const changeTaskPriorityPostProcessor = (data, action) => {
  return {
    taskId: response._id,
    task: response
  }
}

export const updateTaskPreProcessor = (data, action) => {

  if (values(TASK_TYPES).indexOf(data.taskType) === -1) {
    throw new Error('TASK_TYPE_NOT_SUPPORTED')
  }

  return {
    taskId: response._id,
    task: response
  }
}

export const updateTaskPostProcessor = (data, action) => {
  return {
    taskId: response._id,
    task: response
  }
}

export const createTaskPreProcessor = (data, action) => {
  if (values(TASK_TYPES).indexOf(data.taskType) === -1) {
    throw new Error('TASK_TYPE_NOT_SUPPORTED')
  }
  let template = {'<>':'li','html':[
      {'<>':'span','html':'<b>${step}: ${name}</b>'}
    ]};
  let details = data.details
  let html = json2html.transform(details.process,template);
  const task = {
    isComplete: false,
    assignedUserIds: data.assignedUserIds || [],
    watchedUserIds: data.watchedUserIds || [],
    labelIds: [],
    sourceCoversationIds: [],
    notifiedUserIds: data.notifiedUserIds || [],
    status: 'active',
    stageId: '',
    initialStageId: '',
    userId: '',
    order: 100,
    priority: 'Low',
    srarchText: `${TASK_TYPE_LABELS[data.taskType]} tasks `,
    description: html,
    details: html,
    name: data.name
  }
  const { borrowerType, productType, taskType } = data
  data.boardName = config[borrowerType].task
  data.pipeLineName = config[borrowerType].taskPipeLine[taskType][productType]
  return {
    task,
    ...data
  }
}
export const customerPostProcessor = response => {
  return {
    customerId: response._id,
    customer: response
  }
}
export const companyPostProcessor = response => {
  return {
    companyId: response._id,
    company: response
  }
}
export const loanApplicationPostProcessor = response => {
  return {
    loanApplicationId: response.loanApplication._id,
    dealId: response.deal._id,
    loanApplication: response.loanApplication,
    deal: response.deal
  }
}
export const createTaskPostProcessor = response => {
  return {
    taskId: response._id,
    task: response
  }
}
export const coBorrowerPostProcessor = response => {
  return {
    applicationId: response.loanApplication.applicationId,
    coBorrowerId: response.customer._id,
    coBorrower: response.customer
  }
}
