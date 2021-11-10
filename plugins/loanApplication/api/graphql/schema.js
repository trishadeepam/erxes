import {
  mutations as loanApplicationMutations,
  queries as loanApplicationQueries,
  types as loanApplicationTypes
} from './loanApplication/loanApplicationSchema'
import {
  queries as loanQueries,
  types as loanTypes
} from './loan/loanSchema'

export const queries = `
${loanApplicationQueries}
${loanQueries}
`

export const types = `
${loanApplicationTypes}
${loanTypes}
`

export const mutations = `
${loanApplicationMutations}
`
