import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import firebase from 'firebase'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  firebase
})