import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  render : h => h(App),
  store,
})
