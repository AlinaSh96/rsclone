const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }
  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: './'
      }
    },
    'css-loader'
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
}

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ]
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
}

const jsLoaders = () => {
  return [
    {
      loader: 'babel-loader',
      options: babelOptions()
    }
  ];
}

const tsLoaders = () => {
  return [
    {
      loader: 'babel-loader',
      options: babelOptions('@babel/preset-typescript')
    }
  ];
}

const plugins = () => {
  return [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/assets/icons'),
          to: path.resolve(__dirname, 'dist/assets/icons')
        },
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/assets/images')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ];
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@controller': path.resolve(__dirname, './src/controller'),
      '@model': path.resolve(__dirname, './src/model'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@view': path.resolve(__dirname, './src/view'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(ttf|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(mp3|svg|jpg|png)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: tsLoaders()
      }
    ]
  },
  optimization: optimization(),
  devServer: {
    open: isDev,
    hot: isDev,
    port: 8080
  },
  devtool: isDev ? 'source-map' : undefined,
  plugins: plugins()
};