import Vue from 'vue'
import Vuex from 'vuex'

import Docs from './modules/docs'
import Notifications from './modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    docs: Docs,
    notifications: Notifications
  }
})
