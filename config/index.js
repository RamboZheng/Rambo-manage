"use strict";
var path = require("path");
module.exports = {
  build: {
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../build/index.html"),
    assetsRoot: path.resolve(__dirname, "../build"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require("./dev.env"),
    host: "localhost",
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    proxyTable: {
      "/houseManager": {
        target: "http://www.baidu.com",
        changeOrigin: true,
        pathRewrite: {
          "^/houseManager": ""
        }
      },
    },
    cssSourceMap: false
  }
};
