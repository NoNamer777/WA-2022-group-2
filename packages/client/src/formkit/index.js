import { nl } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import password from './rules/password'

export default defaultConfig({
  locales: { nl },
  locale: 'nl',
  messages: {
    nl: {
      validation: {
        password() {
          return 'We raden aan een combinatie te maken van hoofdletters, kleine letters, cijfers en speciale tekens.'
        }
      }
    }
  },
  rules: { password }
})
