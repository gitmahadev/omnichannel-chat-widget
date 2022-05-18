const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const { resolve } = require("path");
// //const HtmlWebpackPlugin = require("html-webpack-plugin");
// const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.tsx",
  mode: "production",
  output: {
      filename: "./scripts/[name].js",
      path:  __dirname + '/dist/',
      publicPath : __dirname +'/dist/'
  },
  resolve: {
      extensions: [".Webpack.js", ".web.js", ".ts", ".js", ".jsx", ".tsx"]
  },
  devServer: {
      static: {
          directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 9000,
  },
  optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
  },
  module: {
      rules: [
          {
              test: /\.m?js$/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          },
          {
              test: /\.tsx?$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: "ts-loader"
              }
          },
          {
              test: /\.(jpe?g|png|gif|svg|mp3)$/i,
              loader: 'file-loader',
              options: {
                  outputPath: './public/assets/',
                  name: '[name].[ext]'
              }
          }
      ]
  }
};

// const isProd = process.env.NODE_ENV === "production";

// const config = {
//   mode: isProd ? "production" : "development",
//   entry: {
//     index: "./src/index.tsx",
//   },
//   output: {
//     path: resolve(__dirname, "dist"),
//     filename: "bundle.js",
//   },
//   resolve: {
//     extensions: [".js", ".jsx", ".ts", ".tsx"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: "babel-loader",
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//       filename: "index.html",
//       inject: "body",
//     }),
//   ],
// };

// if (isProd) {
//   config.optimization = {
//     minimizer: [new TerserWebpackPlugin()],
//   };
// } else {
//   config.devServer = {
//     port: 9000,
//     open: true,
//     hot: true,
//     compress: true,
//     stats: "errors-only",
//     overlay: true,
//   };
// }

// module.exports = config;