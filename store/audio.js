// This store for AudioBar information

export const state = () => ({
  audioData: null
})

export const getters = {
  audioData: state => state.audioData
}

export const mutations = {
  SET_AUDIO_DATA(state, data) {
    state.audioData = data
  },
  RESET_AUDIO_DATA(state) {
    state.audioData = null
  }
}

export const actions = {
  setAudioData({ commit }, data) {
    commit('SET_AUDIO_DATA', data)
  },
  resetAudioData({ commit }) {
    commit('RESET_AUDIO_DATA')
  }
}