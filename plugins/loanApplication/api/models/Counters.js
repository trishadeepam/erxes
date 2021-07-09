import { isNull } from 'lodash'
import CounterSchema from './definitions/Counter'
class Counter {
  static async getSequence (modelName) {
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
}

export default {
  schema: CounterSchema,
  name: 'Counters',
  klass: Counter
}
