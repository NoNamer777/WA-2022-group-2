import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { App, router } from './app'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
