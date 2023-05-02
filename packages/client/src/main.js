import 'bootstrap'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { App, router } from './app'
import '/public/assets/styles/bootstrap-custom.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
