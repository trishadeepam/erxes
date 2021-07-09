import messageBrokerUtils from './messageBrokerUtils'
import config from '../../config'
import { isNull, isUndefined } from 'lodash'
import { boardId } from '../../../../../api/src/data/resolvers/boardUtils'
import user from '../../../../../api/src/data/resolvers/user'

async function createCustomer (data, resolvers, { models }) {
  const { customer, integrationId, userId } = data
  try {
    let root
    const isExisting = await models.Customers.findOne({
      primaryPhone: customer.primaryPhone
    })
    if (!isNull(isExisting)) {
      throw new Error('CUSTOMER_ALREADY_EXISTS')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    customer.integrationId = integrationId
    if (isUndefined(customer.customFieldsData)) {
      customer.customFieldsData = []
    }
    const newCustomer = await resolvers.Mutation.customersAdd(root, customer, {
      docModifier: doc => doc,
      user
    })
    return newCustomer
  } catch (e) {
    throw new Error(e.message)
  }
}

async function createCompany (data, resolvers, { models }) {
  const { primaryBorrowerId, company, integrationId, userId } = data
  try {
    // FIXME: Need a better search of comapny. Maybe with company ID
    const existing = await models.Companies.findOne({
      customerIds: { $elemMatch: { $eq: [primaryBorrowerId] } }
    })
    if (!isNull(existing)) {
      throw new Error('COMPANY_ALREADY_EXISTS')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    let root
    company.customerIds = [primaryBorrowerId]
    company.integrationId = integrationId
    if (isUndefined(company.customFieldsData)) {
      company.customFieldsData = []
    }
    const newCompany = await resolvers.Mutation.companiesAdd(root, company, {
      user,
      docModifier: doc => doc
    })
    return newCompany
  } catch (e) {
    throw new Error(e.message)
  }
}

async function createLoanApplication (data, resolvers, context) {
  const { models, logUtils } = context
  const {
    userId,
    integrationId,
    loanApplication,
    boardName,
    pipeLineName
  } = data
  try {
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    loanApplication.integrationId = integrationId
    let root
    const newLoanApplication = await resolvers.Mutation.createLoanApplication(
      root,
      loanApplication,
      { user, docModifier: doc => doc }
    )
    // Now create a new deal for this application
    const deal = await createNewDeal(
      {
        userId: user._id,
        loanApplicationId: newLoanApplication._id,
        boardName,
        pipeLineName
      },
      resolvers,
      context
    )
    return {
      loanApplication: newLoanApplication,
      deal
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

async function createNewDeal (data, resolvers, { models }) {
  const { loanApplicationId, userId, boardName, pipeLineName } = data
  // Find the correct board
  // Then get the correct pipeline
  // Then create the deal for that pipeline
  try {
    const application = await models.LoanApplications.findOne({
      _id: loanApplicationId
    })
    if (isNull(application)) {
      throw new Error('LOAN_APPLICATION_DOES_NOT_EXIST')
    }
    const existingDeal = await models.Deals.findOne({
      applicationId: application._id,
      status: 'active'
    })
    if (!isNull(existingDeal)) {
      throw new Error('DEAL_ACTIVE_FOR_APPLICATION')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    const board = await models.Boards.findOne({
      name: boardName,
      type: 'deal'
    })
    if (isNull(board)) {
      throw new Error('INVALID_BOARD_FOR_DEAL')
    }
    const pipelines = await models.Pipelines.find({
      boardId: board._id
    })
    const pipeline = pipelines.find(
      p => p.name.toLowerCase() === pipeLineName.toLowerCase()
    )
    if (isNull(pipeline)) {
      throw new Error('INVALID_PIPELINE_FOR_DEAL')
    }
    const stages = await models.Stages.find({
      pipelineId: pipeline._id
    })
    const stage = stages.find(s => s.order === 1)
    console.log(application.currentLoanOffer.productCode)
    const product = await models.Products.findOne({
      code: application.currentLoanOffer.productCode
    })
    if (isNull(product)) {
      throw new Error('PRODUCT_CODE_INVALID')
    }
    const deal = messageBrokerUtils.buildDeal({
      application,
      board,
      pipeline,
      stage,
      user,
      product
    })
    if (isUndefined(deal.customFieldsData)) {
      deal.customFieldsData = []
    }
    let root
    const newDeal = await resolvers.Mutation.dealsAdd(root, deal, {
      user,
      docModifier: doc => doc
    })
    return newDeal
  } catch (e) {
    console.log(e.stack)
    throw new Error(e.message)
  }
}

const updateCustomer = async (data, resolvers, { models }) => {
  const { userId, customer } = data
  try {
    const existing = await models.Customers.findOne({ _id: customer._id })
    if (isNull(existing)) {
      throw new Error('CUSTOMER_DOES_NOT_EXIST')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    let root
    const updatedCustomer = await resolvers.Mutation.customersEdit(
      root,
      customer,
      { user }
    )
    return updatedCustomer
  } catch (e) {
    throw new Error(e.message)
  }
}
const updateCompany = async (data, resolvers, { models }) => {
  const { userId, company } = data
  try {
    const existing = await models.Companies.findOne({ _id: company._id })
    if (isNull(existing)) {
      throw new Error('COMPANY_DOES_NOT_EXIST')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    let root
    const updatedCompany = await resolvers.Mutation.companiesEdit(
      root,
      company,
      { user }
    )
    return updatedCompany
  } catch (e) {
    throw new Error(e.message)
  }
}

const updateLoanApplication = async (data, resolvers, { models }) => {
  const { userId, loanApplication } = data
  try {
    const existing = await models.LoanApplication.findOne({
      _id: loanApplication._id
    })
    if (isNull(existing)) {
      throw new Error('LOAN_APPLICATION_DOES_NOT_EXIST')
    }
    messageBrokerUtils.validateLoanApplication(existing, loanApplication)
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    let root
    const updatedloanApp = await resolvers.Mutation.editLoanApplication(
      root,
      loanApplication,
      { user }
    )
    // update the deal deatils
    const deal = models.Deals.findOne({ applicationId: updatedloanApp._id })
    // FIXME: need to build this
    const newDeal = messageBrokerUtils.editDeal(deal, updatedloanApp)
    await resolvers.Mutation.editDeal(root, newDeal, {
      user,
      docModifier: doc => doc
    })
    return {
      loanApplication: updatedloanApp,
      deal: newDeal
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
const getLoanApplication = async (data, resolvers, { models }) => {
  const { userId, loanApplicationId } = data
  const user = await models.Users.findOne({ _id: userId })
  if (isNull(user)) {
    throw new Error('USER_DOES_NOT_EXIST')
  }
  const application = models.LoanApplications.findOne({
    _id: loanApplicationId
  })
  if (isNull(application)) {
    throw new Error('INVALID_APPLICATION_ID')
  }
  return application
}

const createTask = async (data, resolvers, { models }) => {
  const { task, loanApplicationId, userId, boardName, pipeLineName } = data
  try {
    const loanApplication = await models.LoanAPplications.findOne({
      id: loanApplicationId
    })
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    if (isNull(loanApplication)) {
      throw new Error('LOAN_APPLICATION_DOES_NOT_EXIST')
    }
    const deal = await models.Deals.findOne({ loanApplicationId })
    if (isNull(deal) || deal.status !== 'active') {
      throw new Error('NO_ACTIVE_DEAL_FOR_LOAN_APPLICATION')
    }
    const board = await models.Boards.findOne({
      name: boardName,
      type: 'task'
    })
    if (isNull(board)) {
      throw new Error('TASK_BOARD_DOES_NOT_EXIST')
    }
    pipeline = await models.Pipelines.findOne({
      boardId: board._id,
      name: pipeLineName
    })
    if (isNull(pipeline)) {
      throw new Error('TASK_PIPELINE_DOES_NOT_EXIST')
    }
    const stages = await models.Stages.find({
      pipelineId: pipeline._id
    })
    const stage = stages.find(s => s.order === 1)
    task.userId = user._id
    task.watchedUserIds = [user._id]
    task.notifiedUserIds = [user._id]
    task.assignedUserIds = messageBrokerUtils.buildAssignedUsers()
    task.labelIds = messageBrokerUtils.buildLabelIdsForTask()
    task.stageId = stage._id
    task.initialStageId = stage._id
    task.processId = Math.random()
    let root
    const newTask = await resolvers.Mutation.tasksAdd(root, task, {
      user,
      docModifier: doc => doc
    })
    await resolvers.Mutation.conformityEdit(root, {
      mainType: 'deal',
      mainTypeId: deal._id,
      relType: 'task',
      relTypeIds: [newTask._id]
    })
    return {
      task: newTask
    }
  } catch (e) {
    throw new Error(e.message)
  }
  // Populate the watched user and assigned user based on type of task.
}

const changeTaskPriority = async (data, resolvers, { models }) => {
  const { priority, taskId } = data
  const priorities = ['Low', 'Normal', 'High', 'Critical']
  try {
    const task = await models.tasks.findOne({ _id: taskId })
    if (isNull(task)) {
      throw new Error('TASK_NOT_FOUND')
    }
    if (priorities.indexOf(priority) === -1) {
      throw new Error('PRORITY_NOT_SUPPORTED')
    }
    let root
    await resolvers.Mutation.taskEdit(root, {
      _id: task.id,
      processId: Math.random(),
      priority
    })
    return {
      taskId: task.id
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
export default {
  createCompany,
  createCustomer,
  createLoanApplication,
  createNewDeal,
  updateCustomer,
  updateCompany,
  updateLoanApplication,
  getLoanApplication,
  createTask,
  changeTaskPriority
}
