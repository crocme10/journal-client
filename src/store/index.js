import Vue from 'vue'
import Vuex from 'vuex'
import Errors from './modules/errors'
import Docs from './modules/docs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    errors: Errors,
    docs: Docs
  }
})
