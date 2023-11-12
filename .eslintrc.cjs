module.exports = {
  extends: ['eslint-config-standard'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['/*.d.ts'],
  rules: {
    semi: ['error', 'always'],
    'n/no-callback-literal': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-useless-constructor': 'off'

  },
  env: {
    browser: true,
    es2020: true
  }
};
