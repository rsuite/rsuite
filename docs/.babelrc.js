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
        'preset-env': { targets: { node: true } }
      }
    ]
  ];

  if (__PRO__) {
    presets.unshift('rsuite');
  }

  return {
    presets,
    plugins: [
      'lodash',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-export-default-from',
      ['@babel/plugin-transform-runtime', { useESModules: false }],
      'add-module-exports'
    ]
  };
};
