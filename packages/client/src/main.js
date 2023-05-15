import '@formkit/themes/genesis'
import { plugin } from '@formkit/vue'
import 'bootstrap/dist/js/bootstrap.min'

import Notifications from '@kyvg/vue3-notification'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { App, FormKitOptions, router, useAuthStore } from './app'
import '/public/assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())

// Initialize the AuthenticationStore first so that the router will respond correctly to the
// state of the store upon initialization of the application/browser refresh.
const authenticationStore = useAuthStore()

await authenticationStore.initialize()

app.use(router)
app.use(plugin, FormKitOptions)
app.use(Notifications)

app.mount('#app')
