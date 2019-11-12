const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {},
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    quotes: [ERROR, 'single'],
    semi: [ERROR, 'always'],
    'space-infix-ops': ERROR,
    'no-param-reassign': OFF,
    'prefer-spread': ERROR,
    'comma-dangle': OFF,
    'padded-blocks': OFF,
    'prefer-const': OFF,
    'no-multi-spaces': ERROR,
    'no-var': OFF,
    'one-var': OFF,
    'class-methods-use-this': WARNING,
    'no-unused-expressions': [ERROR, { allowShortCircuit: true }],
    'arrow-parens': [ERROR, 'as-needed'],
    'no-mixed-operators': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-member-accessibility': OFF,
    'no-unused-expressions': OFF,
    '@typescript-eslint/no-unused-expressions': [ERROR, { allowShortCircuit: true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
