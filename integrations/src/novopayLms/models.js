import { model, Schema } from 'mongoose'
import { field } from '../models/utils'
import { INTERGATION_SUPPORT } from './constants'
const lmsIntegrationSchema = new Schema({
  _id: field({ pkey: true }),
  kind: field({
    type: String,
    optional: false
  }),
  endpoint: field({
    type: String,
    optional: false
  }),
  apiToken: field({
    type: String,
    optional: false
  }),
  rpcMessageQueue: field({
    type: String,
    optional: false
  }),
  messageQueue: field({
    type: String,
    optional: false
  }),
  messageQueueToken: field({
    type: String,
    optional: false
  }),
  integrationId: field({
    type: String,
    optional: false
  })
})
const lmsIntegrationLogs = new Schema(
  {
    _id: field({ pkey: true }),
    kind: field({
      type: String,
      optional: false
    }),
    requestKind: field({
      type: String,
      optional: true,
      enum: INTERGATION_SUPPORT.map(is => is.value),
      selectOptions: INTERGATION_SUPPORT
    }),
    action: field({
      type: String,
      optional: false
    }),
    request: field({
      type: JSON
    }),
    response: field({
      type: JSON,
      optional: false
    })
  },
  { timestamps: true }
)
export const LmsIntergations = model('lms_integration', lmsIntegrationSchema)
export const LmsInterationLogs = model('lms-log', lmsIntegrationLogs)
