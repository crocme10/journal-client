import axios from 'axios'

class Http {
  constructor () {
    const service = axios.create({
      baseURL: (process.env.NODE_ENV === 'test' ? 'http://localhost:8080' : 'http://localhost:3030/graphql'),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    service.interceptors.request.use(config => {
      const token = localStorage.getItem('user-token')

      if (token) {
        axios.default.headers.common.Authorization = 'Bearer ' + token
        config.header.Authorization = 'Bearer ' + token
      }
      // console.log('Axios Request: ', config)
      return config
    })
    this.service = service
  }

  // redirectTo = (document, path) => {
  //   document.location = path
  // }

  get (path) {
    return this.service.get(path)
  }

  // patch(path, payload, callback) {
  //   return this.service.request({
  //     method: 'PATCH',
  //     url: path,
  //     responseType: 'json',
  //     data: payload
  //   }).then((response) => callback(response.status, response.data))
  // }

  post (payload) {
    return this.service.request({
      method: 'POST',
      url: payload.path,
      responseType: 'json',
      data: payload.data
    })
  }
}

export default new Http()
