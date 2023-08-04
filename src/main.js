import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'
import './config/msgs'

Vue.config.productionTip = false

// Temporario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2OTExNjg0NzgsInVzZXJJZCI6NH0.PUDg2-3Z0YFgmzlclbW2fxyCKZeDqxb9xVzQ6FMz7ks'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')