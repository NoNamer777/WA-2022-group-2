import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
