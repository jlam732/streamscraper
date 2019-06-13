const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    // extensions: [".js"],
    alias: {
      streamscraper: path.resolve(__dirname, "src/client/js/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.join(__dirname, "/src/client", "index.html"),
      filename: "./index.html"
    })
  ]
};
