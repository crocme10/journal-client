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

        console.log(response)

        commit('updateDocs', response.data)
        return ok('ok')
      } catch (err) {
        return error(err)
      }
    } else {
      const query = 'query { docs { docs { id, title, outline, author, tags, image, kind, genre, updatedAt } } }'
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
          id, title, outline, author, tags, image, kind, genre, updatedAt
        }
      }
    }`
    console.log('in loadDocSearch')
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
          id, title, outline, author, tags, image, kind, genre, updatedAt
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
    var variables = {
      id: id
    }
    var query = `query($id: Uuid!) {
      docDetail(id: $id) {
        doc {
          id, title, outline, author, content, tags, image, kind, genre, updatedAt
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

      commit('updateDoc', response.data.data.docDetail.doc)

      // const doc = {
      //   id: 'id0',
      //   title: 'Mimir Indexing Rules',
      //   outline: 'Learn about indexing rules',
      //   author: 'Matthieu Paindavoine',
      //   tags: ['kisio', 'mimirsbrunn', 'elasticsearch'],
      //   image: 'cabinet',
      //   kind: 'doc',
      //   genre: 'reference',
      //   updatedAt: '2020-01-20',
      //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis sodales hendrerit. Fusce quis vestibulum elit, a posuere ipsum. Maecenas pretium, metus nec posuere mollis, massa mauris mattis felis, id convallis nisl nisi ac ex. Maecenas tincidunt risus sed vulputate aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras eget tortor eget libero ultrices luctus ut a turpis. In hac habitasse platea dictumst. Morbi sem urna, ultricies id faucibus at, sagittis vel turpis. Nam lobortis blandit leo sed elementum. Pellentesque facilisis ornare elementum. Etiam efficitur mattis tellus, et ultricies risus tincidunt at. Integer aliquam enim et felis congue volutpat. Cras sapien ipsum, gravida vitae malesuada sed, tincidunt id arcu. Fusce ut turpis scelerisque, tincidunt urna in, maximus mi. Aliquam non molestie urna, ac maximus dui. Maecenas eget neque quis quam dapibus bibendum. Fusce quis efficitur nibh. Pellentesque lobortis tempor pellentesque.'
      // }

      // commit('updateDoc', doc)
      return ok('ok')
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
