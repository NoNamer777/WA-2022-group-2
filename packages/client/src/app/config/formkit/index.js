import { nl } from '@formkit/i18n';
import { defaultConfig } from '@formkit/vue';
import password from './rules/password.js';

export const FormKitOptions = defaultConfig({
  locales: { nl },
  locale: 'nl',
  messages: {
    nl: {
      validation: {
        password() {
          return 'Een wachtwoord moet minimaal 8 tekens bevatten waarvan ten minste 1 kleine letter, 1 hoofd letter, 1 cijfer, en 1 symbool.';
        }
      }
    }
  },
  rules: { password }
});
