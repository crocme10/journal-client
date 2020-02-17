// store/_errors.js

const state = {
  errors: []
}

const getters = {
  errors: state => state.errors
}

const mutations = {
  addError: (state, error) => state.errors.unshift(error),
  popError: state => state.errors.pop()
}

const actions = {
  populateErrors: ({ commit }, error) => {
    commit('addError', error)
    setTimeout(() => commit('popError'), 3000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
