module.exports = {
  root: true,
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  globals: {
    IS_DEVELOPMENT: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': ['error'],
  },
}
