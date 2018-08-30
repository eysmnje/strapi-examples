import Vue from 'vue'
import Vuex from 'vuex'
import Login from './login'

Vue.use(Vuex)

/*const store = {
  namespaced: true,
  
  state: {},
  
  getters: {},
  
  actions: {},
  
  mutations: {},
}*/

export default new Vuex.Store({
  modules: {
    Login,
  }
})
