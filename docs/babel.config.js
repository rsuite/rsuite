module.exports = (api, options) => {
  const { NODE_ENV, VERCEL_ENV = 'local' } = options || process.env;

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
            browsers: ['> 1%', 'last 2 versions', 'not ie <11']
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
    ['@babel/plugin-proposal-class-properties'],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-object-assign',
    'add-module-exports'
  ];

  const alias = {
    '@': './'
  };

  if (VERCEL_ENV === 'preview' || VERCEL_ENV === 'local') {
    alias.rsuite = '../src';
  }

  plugins.push(['module-resolver', { alias }]);

  return {
    presets,
    plugins
  };
};
