module.exports = {
  extends: ['stylelint-config-standard-less'],
  customSyntax: 'postcss-less',
  rules: {
    'value-keyword-case': [
      'lower',
      {
        ignoreKeywords: [
          'BlinkMacSystemFont',
          'Arial',
          'Helvetica',
          'STXihei',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas'
        ]
      }
    ]
  }
};
