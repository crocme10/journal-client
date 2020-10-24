import DocsService from '@/services/docs.service'

const state = {
  docs: [],
  doc: {}
}

const getters = {
  docs: state => state.docs,
  doc: state => state.doc
}

const mutations = {
  updateDocs (state, list) {
    state.docs = list
  },
  updateDoc (state, doc) {
    state.doc = doc
  }
}

const actions = {
  loadDocs: async ({ dispatch, commit }) => {
    return DocsService.load().then(
      response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          console.log('Server error loading documents: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error loading documents',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
          // commit('registerFailure')
          return Promise.reject(response.data.errors[0])
        } else {
          const docs = response.data.data.documents.docs
          commit('updateDocs', docs)
          return Promise.resolve(docs)
        }
      },
      error => {
        console.log('Server error loading documents: ' + error)
        return Promise.reject(error)
      }
    )
  },

  loadDocDetails: async ({ dispatch, commit }, id) => {
    return DocsService.loadDetails(id).then(
      response => {
        if (response.data.errors) {
          const errmsg = response.data.errors[0].message + ': ' + response.data.errors[0].extensions.internal_error
          console.log('Server error loading document details: ' + errmsg)
          dispatch('notifications/addNotification',
            {
              title: 'Server Error loading document details',
              message: errmsg,
              theme: 'error',
              timeout: 5000
            },
            { root: true }
          )
          // commit('registerFailure')
          return Promise.reject(response.data.errors[0])
        } else {
          const doc = response.data.data.findDocumentById.doc
          commit('updateDoc', doc)
          return Promise.resolve(doc)
        }
      },
      error => {
        console.log('Server error loading document details: ' + error)
        return Promise.reject(error)
      }
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
