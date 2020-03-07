const merge = require('webpack-merge');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const config = require('./webpack.config');

module.exports = merge.strategy({
  plugins: 'replace',
})(config, {
  entry: {
    main: './docs/index.tsx',
  },
  devServer: {
    port: process.env.PORT || 9001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'head',
      hash: true,
      title: 'Leda Documentation',
    }),
    new HtmlWebpackTagsPlugin({
    links: [
        {
          path: 'favicon.jpg',
          attributes: {
            rel: 'icon',
          },
        },
      ],
      tags: [
        'assets/css/reset.css',
        'assets/css/helpers.css',
        'assets/css/lists.css',
        'assets/css/docs.css',
        'assets/css/scrollbar.css',
        'assets/css/fontawesome/brands.css',
        'assets/css/fontawesome/fontawesome.css',
        'assets/css/fontawesome/regular.css',
        'assets/css/fontawesome/solid.css',
        'assets/css/fontawesome/v4-shims.css',
        'assets/css/themes/leda/styles.css',
      ],
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],
});
