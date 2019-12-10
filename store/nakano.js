import { NUM_INITIAL_FAIRY } from '~/lib/constant'

export const state = () => ({
  combustible: NUM_INITIAL_FAIRY,
  incombustible: NUM_INITIAL_FAIRY,
  resources: NUM_INITIAL_FAIRY,
  oversized: NUM_INITIAL_FAIRY,
  hazardous: NUM_INITIAL_FAIRY
})

export const mutations = {
  subtractFairy(state, payload) {
    state[payload.key] -= payload.num
  }
}
