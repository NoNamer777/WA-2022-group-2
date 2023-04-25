module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier']
}
