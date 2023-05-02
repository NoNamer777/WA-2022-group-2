import '@formkit/themes/genesis'
import { plugin } from '@formkit/vue'
import 'bootstrap/dist/js/bootstrap.min'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { App, FormKitOptions, router } from './app'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, FormKitOptions)

app.mount('#app')
