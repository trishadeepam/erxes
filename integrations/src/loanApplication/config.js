import { values } from 'underscore'
import {
  BORROWER_TYPES,
  PRODUCT_BORROWER_MAP,
  TASK_TYPES,
  PRODUCT_TYPES_LABELS,
  TASK_TYPE_LABELS
} from './constants'
const buildDealPipeline = (productTypes) => {
  return productTypes.reduce((orig, pt) => {
    orig[pt] = `${PRODUCT_TYPES_LABELS[pt]} Pipeline`
    return orig
  }, {})
}
const buildTaskPipeline = (productTypes, pipeLineType) => {
  const taskPipelines = values(TASK_TYPES).reduce((o, v) => {
    o[v] = {}
    return o
  }, {})
  return productTypes.reduce((orig, pt) => {
    values(TASK_TYPES).forEach(v => {
      orig[v][pt] = `${PRODUCT_TYPES_LABELS[pt]} ${TASK_TYPE_LABELS[v]} Tasks`
    })
    return orig
  }, taskPipelines)
}
export default {
  serviceUserEmail: 'operations@novoloan.com',
  [BORROWER_TYPES.INDIVIDUAL]: {
    board: 'Individual Loans',
    boardPipeLine: buildDealPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.INDIVIDUAL], 'deal'),
    taskPipeLine: buildTaskPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.INDIVIDUAL], 'task'),
    task: 'Individual Loan Tasks'
  },
  [BORROWER_TYPES.RETAILER]: {
    board: 'Retailer Loans',
    boardPipeLine: buildDealPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.RETAILER], 'deal'),
    taskPipeLine: buildTaskPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.RETAILER], 'task'),
    task: 'Retailer Loan Tasks'
  },
  [BORROWER_TYPES.MSME]: {
    board: 'MSME Loans',
    boardPipeline: buildDealPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.MSME], 'deal'),
    taskPipeLine: buildTaskPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.RETAILER], 'task'),
    task: 'MSME Loan Tasks'
  },
  [BORROWER_TYPES.DISTRIBUTOR]: {
    board: 'Distributor Loans',
    boardPipeline: buildDealPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.DISTRIBUTOR], 'deal'),
    taskPipeLine: buildTaskPipeline(PRODUCT_BORROWER_MAP[BORROWER_TYPES.RETAILER], 'task'),
    task: 'Distriutor Loan Tasks'

  }
}
