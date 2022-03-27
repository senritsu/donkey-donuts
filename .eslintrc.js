module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['vue', 'html', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { 'endOfLine': 'auto' }
  },
}
