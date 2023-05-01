import { plugin } from '@formkit/vue'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { App, FormKitOptions, router } from './app'

import '@formkit/themes/genesis'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, FormKitOptions)

app.mount('#app')
