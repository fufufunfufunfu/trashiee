export const state = () => ({
  results: []
})

export const mutations = {
  insertResults(state, payload) {
    state.results = payload.results
  },
  pushResult(state, payload) {
    state.results.push(payload)
  },
  clearResults(state) {
    state.results = []
  }
}
