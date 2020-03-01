module.exports = api => {
  api.cache(() => process.env.NODE_ENV);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: ['@babel/plugin-proposal-class-properties']
  };
};
