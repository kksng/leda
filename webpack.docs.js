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
      title: 'Leda Documentation',
      template: 'public/index.html',
      inject: 'head',
      hash: true,
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
        {
          path: 'assets/css/leda.light.css',
          type: 'css',
          attributes: {
            id: 'leda-css',
          }
        },
      ],
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],
});
