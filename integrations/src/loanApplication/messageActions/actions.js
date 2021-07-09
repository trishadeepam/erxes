import { response } from 'express'
import { isEmpty, isUndefined, values } from 'underscore'
import config from '../config'
import { TASK_TYPES, TASK_TYPE_LABELS } from '../constants'

const processError = (response) => {

}
const createLoanAplicationPreProcessor = (data, action) => {
  const { borrowerType } = data.application
  data.boardName = config[borrowerType].board
  data.pipelineName = config[borrowerType].board
  return data
}
const createTaskPreProcessor = (data, action) => {
  if (values(TASK_TYPES).indexOf(data.taskType) === -1) {
    throw new Error('TASK_TYPE_NOT_SUPPORTED')
  }
  const task = {
    isComplete: false,
    assignedUserIds: [],
    watchedUserIds: [],
    labelIds: [],
    sourceCoversationIds: [],
    notifiedUserIds: [],
    status: 'active',
    stageId: '',
    initialStageId: '',
    userId: '',
    order: 100,
    priority: 'Low',
    srarchText: `${TASK_TYPE_LABELS[data.taskType]} tasks `
  }
  data.taskBoard = config[data.borrowerType].task
  data.taskPipeLine = config[data.borrowerType].taskPipeline[data.taskType]
  return {
    task,
    ...data
  }
}
const customerPostProcessor = (response) => {
  return {
    customerId: response.customer._id
  }
}
const companyPostProcessor = (response) => {
  return {
    companyId: response.company._id
  }
}
const loanApplicationPostProcessor = (response) => {
  return {
    loanApplicationId: response.loanApplication._id,
    dealId: response.deal._id
  }
}
const createTaskPostProcessor = (response) => {
  return {
    taskId: response.task._id
  }
}
export default {
  processError,
  createTaskPreProcessor,
  createLoanAplicationPreProcessor,
  createTaskPostProcessor,
  loanApplicationPostProcessor,
  companyPostProcessor,
  customerPostProcessor
}
