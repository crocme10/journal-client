import axios from 'axios'
import standardHeaders from './standard.headers'
import ApiRoutes from '@/api/apiRoutes'

class IndexService {
  getIndexList () {
    const query = `query {
      indexes {
        indexes {
          indexId,
          indexType,
          dataSource,
          region,
          status,
          createdAt,
          updatedAt
        }
      }
    }`

    return axios({
      method: 'post',
      headers: standardHeaders(),
      url: ApiRoutes.MimirGraphQL,
      data: JSON.stringify({
        query: query
      })
    })
  }

  createIndex ({ indexType, dataSource, region }) {
    const variables = {
      index: {
        indexType,
        dataSource,
        region
      }
    }
    const query = `mutation createIndex($index: IndexRequestBody!) {
      createIndex(index: $index) {
        index {
          indexId,
          indexType,
          dataSource,
          region,
          status,
          createdAt,
          updatedAt
        }
      }
    }`

    return axios({
      method: 'post',
      headers: standardHeaders(),
      url: ApiRoutes.MimirGraphQL,
      data: JSON.stringify({
        query,
        variables
      })
    })
  }
}

export default new IndexService()
