export const state = () => ({
  results: []
})

export const mutations = {
  insertResults(state, payload) {
    state.results = payload.results
  }
}
