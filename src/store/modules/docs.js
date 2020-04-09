import http from '@/utils/http'
import { ok, error } from 'result-async'

const state = {
  docs: [],
  doc: {}
}

const getters = {
  doc: state => state.doc,
  docs: state => state.docs
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
  async loadDocs ({ commit }) {
    // If we need to stub the data...
    if (process.env.NODE_ENV === 'test') {
      try {
        const response = await http.get('/data/docs.json')

        // console.log(response)

        commit('updateDocs', response.data)
        return ok('ok')
      } catch (err) {
        return error(err)
      }
    } else {
      const query = 'query { docs { docs { id, front { title, outline, author, tags, image, kind, genre}, updatedAt } } }'
      try {
        const response = await http.post({
          path: 'query',
          data: JSON.stringify({
            query: query
          })
        })

        if (typeof response.data.errors !== 'undefined') {
          return error('Invalid GraphQL: ' + response.data.error[0].message)
        }
        commit('updateDocs', response.data.data.docs.docs)

        return ok('ok')
      } catch (err) {
        return error(err)
      }
    }
  },

  async loadDocSearch ({ commit }, searchStr) {
    const variables = {
      searchStr: searchStr
    }
    const query = `query($searchStr: String!) {
      docSearch(search: $searchStr) {
        docs {
          id,
          front { title, outline, author, tags, image, kind, genre},
          updatedAt
        }
      }
    }`
    // console.log('in loadDocSearch')
    try {
      const response = await http.post({
        path: 'query',
        data: JSON.stringify({
          query: query,
          variables: variables
        })
      })

      if (typeof response.data.errors !== 'undefined') {
        return error('Invalid GraphQL: ' + response.data.errors[0].message)
      }

      commit('updateDocs', response.data.data.docSearch.docs)
      return ok('ok')
    } catch (err) {
      return error(err)
    }
  },

  async loadTagSearch ({ commit }, tagStr) {
    const variables = {
      tagStr: tagStr
    }
    const query = `query($tagStr: String!) {
      tagSearch(tag: $tagStr) {
        docs {
          id,
          front { title, outline, author, tags, image, kind, genre},
          updatedAt
        }
      }
    }`

    try {
      const response = await http.post({
        path: 'query',
        data: JSON.stringify({
          query: query,
          variables: variables
        })
      })

      if (typeof response.data.errors !== 'undefined') {
        return error('Invalid GraphQL: ' + response.data.errors[0].message)
      }

      commit('updateDocs', response.data.data.tagSearch.docs)
      return ok('ok')
    } catch (err) {
      return error(err)
    }
  },

  async loadDocDetail ({ commit }, id) {
    if (process.env.NODE_ENV === 'test') {
      try {
        const response = await http.get('/data/doc.json')

        // console.log(response)

        commit('updateDoc', response.data)
        return ok('ok')
      } catch (err) {
        return error(err)
      }
    } else {
      const variables = {
        id: id
      }

      const query = `query($id: Uuid!) {
        doc(id: $id) {
          doc {
            id, front { title, outline, author, tags, image, kind, genre, }, updatedAt, content
          }
        }
      }`

      try {
        const response = await http.post({
          path: 'query',
          data: JSON.stringify({
            query: query,
            variables: variables
          })
        })
        // console.log('DocDetail Response: ', response)

        if (typeof response.data.errors !== 'undefined') {
          return error('Invalid GraphQL: ' + response.data.error[0].message)
        }

        commit('updateDoc', response.data.data.doc.doc)

        return ok('ok')
      } catch (err) {
        return error(err)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
