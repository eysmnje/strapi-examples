import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  
  state: {
    loginId : '',
    password : '',
  },
  
  getters: {
    loginId(state) { return state.loginId },
    password(state) { return state.password },
  },
  
  actions: {
    updateLoginIdAction({ commit }, e) {
      commit('UPDATE_LOGIN_ID', e.target.value);
    },
    updatePasswordAction({ commit }, e) {
      commit('UPDATE_PASSWORD', e.target.value);
    },
  },
  
  mutations: {
    UPDATE_LOGIN_ID (state, str) {
      state.loginId = str
    },
    UPDATE_PASSWORD (state, str) {
      state.password = str
    },
  },
}
