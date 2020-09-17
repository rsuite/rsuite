module.exports = api => {
  api.cache(() => process.env.NODE_ENV);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react']
  };
};
