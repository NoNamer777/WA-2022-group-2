import '@formkit/themes/genesis';
import { plugin } from '@formkit/vue';
import 'bootstrap/dist/js/bootstrap.min';

import Notifications from '@kyvg/vue3-notification';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { App, router } from './app';
import { useAuthStore } from './app/auth/index.js';
import { FormKitOptions } from './app/config/index.js';
import '/public/assets/styles/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(plugin, FormKitOptions);
app.use(Notifications);

// Initialize the AuthenticationStore first so that the router will respond correctly to the
// state of the store upon initialization of the application/browser refresh.
const authenticationStore = useAuthStore();

authenticationStore.initialize().then(() => {
  app.use(router);

  app.mount('#app');
});
