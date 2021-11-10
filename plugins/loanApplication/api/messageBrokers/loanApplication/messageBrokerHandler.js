import messageBrokerUtils from './messageBrokerUtils'
import { isNull, isUndefined } from 'lodash'

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
      throw new Error(`USER_DOES_NOT_EXIST - ${userId}`)
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
    console.log(e.stack)
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
    const productCode = data.loanApplication.productCode
    const deal = await createNewDeal(
      {
        userId: user._id,
        loanApplicationId: newLoanApplication._id,
        boardName,
        pipeLineName,
        productCode
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
  const { loanApplicationId, userId, boardName, pipeLineName, productCode} = data
  // Find the correct board
  // Then get the correct pipeline
  // Then create the deal for that pipeline
  try {
    console.log(`board name ${boardName} pipeline ${pipeLineName}`)
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
    console.log(application.currentLoanOffer)
    const product = await models.Products.findOne({
      code: productCode
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
const createCoBorrower = async (data, resolvers, { models }) => {
  try {
    const { loanAplicationId, ...rest } = data
    const loanApplication = models.LoanApplications.findOne({
      id: loanAplicationId
    })
    if (isNull(loanApplication)) {
      throw new Error('LOAN_APPLICATION_DOES_NOT_EXIST')
    }
    const customer = await createCustomer(rest, resolvers, { models })
    loanApplication.coBorrowerId = customer._id
    rest.loanApplication = loanApplication
    const response = await updateLoanApplication(rest, resolvers, { models })
    return {
      customer,
      loanApplication: response.loanApplication
    }
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
    const existing = await models.LoanApplications.findOne({
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

    const application = await models.LoanApplications.findOne({_id: data.loanApplication._id})

    if (data.loanApplication.stageName != undefined) {
      const stage = await models.Stages.findOne({name: data.loanApplication.stageName})
      if (stage != null && stage != undefined){
        loanApplication.stageId = stage.doc._id
      }
    }

    const updatedApp = messageBrokerUtils.getUpdatedLoanApplication(application, data)

    const updateReponse = await models.LoanApplications.editApplication(updatedApp, user)
    console.log(updateReponse)
    // update the deal deatils
    const deal = await models.Deals.findOne({ loanApplicationId: loanApplication._id })



    const newDeal = messageBrokerUtils.editDeal(deal, loanApplication)
    await resolvers.Mutation.dealsEdit(root, newDeal, {
      user,
      docModifier: doc => doc
    })
    return {
      loanApplication: loanApplication,
      deal: newDeal
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

const updateTask = async (data, resovlers, {models}) => {
  const { task, loanApplicationId, userId, boardName, pipeLineName, details } = data
  const priorities = ['Low', 'Normal', 'High', 'Critical']
  try {
    const task = await models.tasks.findOne({ _id: taskId })
    if (isNull(task)) {
      throw new Error('TASK_NOT_FOUND')
    }
    if (priorities.indexOf(priority) === -1) {
      throw new Error('PRORITY_NOT_SUPPORTED')
    }

  }catch (e){
    console.log(e.stack)
    throw new Error(e.message)
  }
}

const createTask = async (data, resolvers, { models }) => {
  const { task, loanApplicationId, userId, boardName, pipeLineName, details } = data
  try {
    const loanApplication = await models.LoanApplications.findOne({
      _id: loanApplicationId
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
    const pipeline = await models.Pipelines.findOne({
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
    task.watchedUserIds = [user._id, ...task.watchedUserIds]
    task.notifiedUserIds = [user._id, ...task.notifiedUserIds]
    task.assignedUserIds = messageBrokerUtils.buildAssignedUsersForTasks(task.assignedUserIds)
    task.labelIds = messageBrokerUtils.buildLabelIdsForTask()
    task.stageId = stage._id
    task.initialStageId = stage._id
    task.processId = Math.random()
    task.createdUser = user
    task.type = 'cpv'
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
    return newTask
  } catch (e) {
    console.log(e.stack)
    throw new Error(e.message)
  }
  // Populate the watched user and assigned user based on type of task.
}

const changeTaskPriority = async (data, resolvers, { models }) => {
  const { userId, priority, taskId } = data
  const priorities = ['Low', 'Normal', 'High', 'Critical']
  try {
    const task = await models.Tasks.findOne({ _id: taskId })
    if (isNull(task)) {
      throw new Error('TASK_NOT_FOUND')
    }
    if (priorities.indexOf(priority) === -1) {
      throw new Error('PRIORITY_NOT_SUPPORTED')
    }
    const user = await models.Users.findOne({ _id: userId })
    if (isNull(user)) {
      throw new Error('USER_DOES_NOT_EXIST')
    }
    let root
    await resolvers.Mutation.tasksEdit(root, {
      _id: task.id,
      processId: Math.random(),
      priority
    },user)
    return {
      taskId: task.id
    }
  } catch (e) {
    throw new Error(e.message)
  }
}


/** GETTERS */

const getLoanApplication = async (data, resolvers, { models }) => {
  const { userId, loanApplicationId } = data
  const user = await models.Users.findOne({ _id: userId })
  if (isNull(user)) {
    throw new Error('USER_DOES_NOT_EXIST')
  }
  const application = await resolvers.Query.getLoanApplications({ _id: loanApplicationId })
  // const application = await models.LoanApplications.findOne({
  //   _id: loanApplicationId
  // })
  if (isNull(application)) {
    throw new Error('INVALID_APPLICATION_ID')
  }
  return application
}
const getCustomer = async (data, resolvers, { models }) => {
  const { userId, customerId, coBorrowerId } = data
  const id = customerId || coBorrowerId
  const user = await models.Users.findOne({ _id: userId })
  if (isNull(user)) {
    throw new Error('USER_DOES_NOT_EXIST')
  }
  const customer = await models.Customers.findOne({
    _id: id
  })
  if (isNull(customer)) {
    throw new Error('INVALID_CUSTOMER_ID')
  }
  return customer
}
const getCompany = async (data, resolvers, { models }) => {
  const { userId, companyId } = data
  const user = await models.Users.findOne({ _id: userId })
  if (isNull(user)) {
    throw new Error('USER_DOES_NOT_EXIST')
  }
  const company = await models.Companies.findOne({
    _id: companyId
  })
  if (isNull(company)) {
    throw new Error('INVALID_CUSTOMER_ID')
  }
  return company
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
  changeTaskPriority,
  createCoBorrower,
  getCustomer,
  getCompany
}
