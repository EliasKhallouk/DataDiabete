import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Highcharts from "highcharts";
import MapsModule from "highcharts/modules/map";
import HighchartsVue from "highcharts-vue";
// In order to use Highcharts Maps we need to
// wrap Highcharts with the correct module:
MapsModule(Highcharts);


// Use the HighchartsVue plugin, register <highcharts> component

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(HighchartsVue);
