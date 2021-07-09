import { isEmpty, isNull } from 'lodash'
const extendBoards = boardsSchema => {
  boardsSchema.statics.findLoanBoardByName = findLoanBoardByName
}

const findLoanBoardByName = async (name, boardType) => {
  try {
    const board = await this.findOne({ name: `/${name}/i`, type: boardType })
    if (isEmpty(board) || isNull(board)) {
      throw new Error('NO_BOARD_WITH_NAME')
    }
    return board
  } catch (e) {
    throw new Error(e.message)
  }
}

export default {
  extensionHandler: extendBoards,
  model: 'Boards'
}
