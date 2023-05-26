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
          return 'We raden aan een combinatie te maken van hoofdletters, kleine letters, cijfers en speciale tekens.';
        }
      }
    }
  },
  rules: { password }
});
