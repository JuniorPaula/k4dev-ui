import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'

Vue.config.productionTip = false

// Temporario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2OTExMjMyODEsInVzZXJJZCI6NH0.az9zm6NN6Xk8ZvWufAnHm8D6AwN-uJuAsx6cqWVyS_c'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')