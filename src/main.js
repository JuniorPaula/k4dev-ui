import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'
import './config/msgs'

Vue.config.productionTip = false

// Temporario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2OTEyNTgzODksInVzZXJJZCI6NH0.ju-OAuewN6se8Kj-jTWFP8Ma5xuz4Jpl4TtCqXhhefA'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')