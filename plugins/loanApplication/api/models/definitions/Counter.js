import { Schema } from 'mongoose'

const Counter = new Schema({
  // _id: { pkey: true },
  modelName: {
    type: String,
    optional: false,
    label: 'Model Name'
  },
  counter: {
    type: Number,
    optional: false,
    label: 'Model Counter'
  }
})

export default Counter
