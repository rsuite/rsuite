module.exports = {
  extends: ['stylelint-config-standard-less'],
  customSyntax: 'postcss-less',
  rules: {
    'value-keyword-case': ['lower', { ignoreKeywords: ['BlinkMacSystemFont'] }]
  }
};
