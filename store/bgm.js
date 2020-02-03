export const state = () => ({
  bgm: null
})

export const mutations = {
  changeBgm(state, payload) {
    state.bgm = payload.newBgm
  },
  playBgm(state) {
    state.bgm.pause()
    console.log(state.bgm)
    state.bgm.play()
    state.bgm.addEventListener('ended', () => {
      state.bgm.play()
    })
  },
  pauseBgm(state) {
    if (!state.bgm) return
    if (state.bgm.pause) state.bgm.pause()
  }
}
