import { isNull } from 'lodash'

const getSequence = async modelName => {
  let newCounter
  newCounter = await this.findOneAndUpdate(
    { modelName },
    { $inc: { counter: 1 } },
    { new: true }
  )
  if (isNull(newCounter)) {
    await this.create({
      modelName,
      counter: 1000
    })
    newCounter = await this.findOneAndUpdate(
      { modelName },
      { $inc: { counter: 1 } },
      { new: true }
    )
  }
  return newCounter.counter
}

const extendCounters = (countersSchema) => {
  countersSchema.statics.getSequence = getSequence
}

export default {
  extensionHandler: extendCounters,
  model: 'Counters'
}
