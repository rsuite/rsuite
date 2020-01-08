module.exports = (api, options) => {
  const { NODE_ENV } = options || process.env;
  if (api) {
    api.cache(() => NODE_ENV);
  }

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        'next/babel',
        {
          'preset-env': { targets: { node: true } }
        }
      ]
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-export-default-from',
      ['@babel/plugin-transform-runtime', { useESModules: false }],
      'add-module-exports'
    ]
  };
};
