
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/server",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
      secure:false
    })
  );
};