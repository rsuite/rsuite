module.exports = {
  extends: ['stylelint-config-standard-scss'],
  customSyntax: 'postcss-scss',
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
