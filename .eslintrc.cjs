/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    // 'no-debugger': 'off',
    'vue/multi-word-component-names': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
  },
}
