module.exports = (api, options) => {
  const { NODE_ENV } = options || process.env;
  const __PRO__ = NODE_ENV === 'production';

  if (api) {
    api.cache(() => NODE_ENV);
  }

  const presets = [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            node: true,
            browsers: ['> 1%', 'last 2 versions', 'ie >= 10']
          },
          useBuiltIns: 'entry',
          corejs: 2
        },
        'transform-runtime': { useESModules: false, corejs: 2 }
      }
    ]
  ];

  const plugins = [
    'lodash',
    /**
     * https://github.com/babel/babel/issues/9849#issuecomment-596415994
     */
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-object-assign',
    'add-module-exports'
  ];

  if (__PRO__) {
    presets.unshift('rsuite');
  } else {
    plugins.push([
      'module-resolver',
      {
        alias: {
          '@': './',
          '@rsuite-locales': '../src/IntlProvider/locales',
          rsuite: '../src'
        }
      }
    ]);
  }

  return {
    presets,
    plugins
  };
};
