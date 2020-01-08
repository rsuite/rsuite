module.exports = (api, options) => {
  const { NODE_ENV } = options || process.env;
  if (api) {
    api.cache(() => NODE_ENV);
  }

  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
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