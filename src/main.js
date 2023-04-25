import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {formKitPlugin} from '@formkit/vue'

import App from './App.vue'
import router from './router'
import formKitDefaultConfig from '@/formkit/index';

import '@formkit/themes/genesis'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(formKitPlugin, formKitDefaultConfig)

app.mount('#app')
