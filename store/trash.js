export const state = () => ({
  combustible: [],
  incombustible: [],
  recyclable: [],
  oversized: [],
  hazardous: [],
  waiter: [],
  trashGenerated: false
})

export const mutations = {
  updateList(state, payload) {
    state[payload.listKey] = payload.trash
  },
  generateTrash(state, payload) {
    state.waiter = []
    state.waiter.push(payload)
    state.trashGenerated = true
  },
  removeTrash(state) {
    state.combustible = []
    state.incombustible = []
    state.recyclable = []
    state.oversized = []
    state.hazardous = []
    state.waiter = []

    state.trashGenerated = false
  }
}
