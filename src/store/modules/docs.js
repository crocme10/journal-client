import http from '@/utils/http'
import { ok, error } from 'result-async'

const state = {
  docs: [],
  doc: {}
}

const getters = {
  doc: state => state.doc,
  docs: state => state.docs,
  post: state => state.post,
  posts: state => state.posts
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
    var query =
      'query { docs { docs { id, title, outline, author, tags, image, kind, genre, updatedAt } } }'
    try {
      const response = await http.post({
        path: 'query',
        data: JSON.stringify({
          query: query
        })
      })
      console.log('Docs Response: ', response)

      if (typeof response.data.errors !== 'undefined') {
        return error('Invalid GraphQL: ' + response.data.error[0].message)
      }

      commit('updateDocs', response.data.data.docs.docs)
      return ok()
    } catch (err) {
      return error(err)
    }
  },

  // async loadDocSearch ({ commit }, searchStr) {
  //   var variables = {
  //     searchStr: searchStr
  //   }
  //   var query = `query($searchStr: String!) {
  //     docSearch(search: $searchStr) {
  //       docs {
  //         id, title, outline, author, tags, image, kind, genre, updatedAt
  //       }
  //     }
  //   }`
  //   try {
  //     const response = await http.post({
  //       path: 'query',
  //       data: JSON.stringify({
  //         query: query,
  //         variables: variables
  //       })
  //     })
  //     console.log('DocSearch Response: ', response)

  //     if (typeof response.data.errors !== 'undefined') {
  //       return Result.Err({
  //         msg: 'Invalid GraphQL: ' + response.data.error[0].message
  //       })
  //     }

  //     commit('updateDocs', response.data.data.docSearch.docs)
  //     return Result.Ok()
  //   } catch (error) {
  //     return Result.Err({ msg: new Error(error) })
  //   }
  // },

  async loadDocDetail ({ commit }, id) {
    var variables = {
      id: id
    }
    var query = `query($id: Uuid!) {
      docDetail(id: $id) {
        doc {
          id, title, outline, content, updatedAt
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
      console.log('DocDetail Response: ', response)

      if (typeof response.data.errors !== 'undefined') {
        return error('Invalid GraphQL: ' + response.data.error[0].message)
      }

      commit('updateDoc', response.data.data.docDetail.doc)
      return ok()
    } catch (err) {
      return error(err)
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
