module.exports = function(api) {
  api.cache.never();
  return {
    presets: ['@babel/preset-env'],
    plugins: ['babel-plugin-transform-custom-element-classes'],
  };
};
