import { plugin } from '@formkit/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import formKitDefaultConfig from './formkit/index'
import router from './router'

import '@formkit/themes/genesis'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, formKitDefaultConfig)

app.mount('#app')
