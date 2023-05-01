require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: false,
  extends: ['plugin:vue/vue3-essential', '../../.eslintrc.js'],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/html-indent': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase']
  },
  overrides: [
    {
      files: ['index.html'],
      rules: {
        'vue/comment-directive': 'off'
      }
    }
  ]
}
