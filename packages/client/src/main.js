import { plugin } from '@formkit/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import formKitDefaultConfig from './formkit/index'
import router from './router'

import '@formkit/themes/genesis'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, formKitDefaultConfig)

app.mount('#app')
