import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import store from '@/stores'
// import './style.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// console.log(import.meta.env)
