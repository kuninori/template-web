var webpack = require("webpack");

module.exports = {
  entry  : {
    script: "./src/js/main.js"
  },
  output : {
    path    : __dirname + "/app/",
    filename: "js/[name].js"
  },
  module : {
    loaders: [
      {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : "babel",
        query  : {
          presets: ["env"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};