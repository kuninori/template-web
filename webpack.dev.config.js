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
        loader : "babel-loader",
        query  : {
          presets: ["env"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
};