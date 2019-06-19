const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
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
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARNING
  }
};
