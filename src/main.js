import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.less'
import '@/styles/index.less'
import '@icon-park/vue/styles/index.css'
import IsLoading from '@/components/IsLoading.vue'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Lazyload)
Vue.component(IsLoading.name, IsLoading)
// Vue.use(Lazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
