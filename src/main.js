import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.scss'
import '@/assets/css/main.scss'
import store from '@/store'


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
