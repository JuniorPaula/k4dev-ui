import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'
import './config/msgs'

Vue.config.productionTip = false

// Temporario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2OTEzNTExMTMsInVzZXJJZCI6NH0.1MZS2sLfeI6XLhueb3jfwBV0FGE7kqQq8CMeuZzL22I'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')