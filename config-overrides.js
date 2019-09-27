/* config-overrides.js */
const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  addLessLoader,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  ...addBabelPlugins('@babel/plugin-proposal-optional-chaining', 'emotion'),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@utilities': path.resolve(__dirname, 'src/utilities'),
    '@scenes': path.resolve(__dirname, 'src/scenes'),
    '@images': path.resolve(__dirname, 'src/images'),
    '@actions': path.resolve(__dirname, 'src/actions'),
    '@reducers': path.resolve(__dirname, 'src/reducers'),
  }),
  addLessLoader({
    javascriptEnabled: true,
  })
);
