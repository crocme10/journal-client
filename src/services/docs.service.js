import axios from 'axios'
import standardHeaders from './standard.headers'
import ApiRoutes from '@/api/apiRoutes'

class DocsService {
  load () {
    console.log(ApiRoutes.JournalGraphQL)
    const query = `query {
      listDocuments {
        docs {
          id,
          front {
            title,
            outline,
            author {
              fullname,
              resource
            },
            tags,
            image {
              title,
              author {
                fullname,
                resource
              },
              resource
            }
            kind,
            genre,
            updatedAt
          }
        }
      }
    }`

    return axios({
      method: 'post',
      headers: standardHeaders(),
      url: ApiRoutes.JournalGraphQL,
      data: JSON.stringify({
        query: query
      })
    })
  }

  loadDetails (id) {
    const variables = {
      id: id
    }
    const query = `query($id: Uuid!) {
      findDocumentById(id: $id) {
        doc {
          id,
          front {
            title,
            outline,
            author {
              fullname,
              resource
            },
            tags,
            image {
              title,
              author {
                fullname,
                resource
              },
              resource
            }
            kind,
            genre,
            createdAt,
            updatedAt
          },
          content
        }
      }
    }`
    return axios({
      method: 'post',
      headers: standardHeaders(),
      url: ApiRoutes.JournalGraphQL,
      data: JSON.stringify({
        query: query,
        variables: variables
      })
    })
  }
}

export default new DocsService()
