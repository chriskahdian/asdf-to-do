import Vue from 'vue'
import App from './App.vue'
import { MdField } from 'vue-material/dist/components';

Vue.use(MdField);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
