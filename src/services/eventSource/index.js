import store from '@/store'
// import ApiRoutes from '@/api/apiRoutes'

const eventSource = {
  connection: null,
  configure: function () {
    const WebSocketBaseUrl = process.env.VUE_APP_MIMIR_WEBSOCKET
    console.log(WebSocketBaseUrl)
    this.connection = new WebSocket(WebSocketBaseUrl)
    this.connection.onerror = this.onError
    this.connection.onopen = this.onConnectionOpen
    this.connection.onmessage = this.onMessage
  },
  onError: function (event) {
    console.log('Error w/ websocket: ' + event)
  },
  onConnectionOpen: function (event) {
    // console.log(event)
    console.log('Successfully connected to server websocket')
    console.log('Requesting graphql subscription')
    const connInitMessage = `{
      "type":"connection_init",
      "payload": {}
    }`
    this.send(connInitMessage)
    const subscriptionRequestMessage = `{
      "id": "1",
      "type":"start",
      "payload": {
          "query": "subscription { notifications { id, status } }"
        }
    }`
    this.send(subscriptionRequestMessage)
  },
  onMessage: function (event) {
    // console.log(event)
    try {
      const json = JSON.parse(event.data)
      // console.log(json)
      if (json.type === 'ka') {
        // console.log('ka')
      } else if (json.type === 'connection_ack') {
        // console.log('connection ack')
      } else if (json.type === 'data') {
        const notification = json.payload.data.notifications
        // console.log('notification')
        // console.log(notification)
        const id = notification.id
        const status = JSON.parse(notification.status)
        console.log(status)
        store.commit('indexes/updateIndexStatus', { id, status })
      } else {
        console.log('unsupported message type: ' + json.type)
      }
    } catch (err) {
      store.dispatch('notifications/addNotification',
        {
          title: 'Error notification',
          message: err,
          theme: 'error',
          timeout: 3000
        },
        { root: true }
      )
    }
  },
  teardown: function () {
    this.connection.close()
  }
}

export default eventSource
