import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import './assets/all.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date (time) {
    const localDate = new Date(time * 1000)
    return localDate.toLocaleDateString()
  }
}
app.use(VueAxios, axios)
app.use(router)

app.component('AppLoading', Loading)
app.mount('#app')
