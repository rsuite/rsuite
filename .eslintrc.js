const OFF = 0;
const WARNING = 1;
const ERROR = 2;

/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {},
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    semi: [ERROR, 'always'],
    'space-infix-ops': ERROR,
    'prefer-spread': ERROR,
    'no-multi-spaces': ERROR,
    'class-methods-use-this': WARNING,
    'arrow-parens': [ERROR, 'as-needed'],
    '@typescript-eslint/no-unused-vars': ERROR,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-member-accessibility': OFF,
    '@typescript-eslint/no-namespace': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    'react/display-name': OFF,
    'react/prop-types': OFF
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*Spec.js', '*Spec.ts', '*Spec.tsx'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'react/prop-types': 'off',
        'testing-library/no-node-access': [
          'error',
          {
            allowContainerFirstChild: true
          }
        ],
        'testing-library/no-wait-for-multiple-assertions': 'off'
      },
      settings: {
        'testing-library/custom-renders': 'off'
      },
      overrides: [
        {
          files: ['*StylesSpec.tsx'],
          rules: {
            // Node access is unavoidable in style tests as they do test against class selectors
            'testing-library/no-node-access': 'off'
          }
        }
      ]
    }
  ]
};
