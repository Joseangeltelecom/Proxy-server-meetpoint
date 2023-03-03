const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
  "/device",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: {
      "^/device": "/auth/realms/realm/protocol/openid-connect/auth/device",
    },
    onProxyRes: function (proxyRes, req, res) {
      console.log("Response headers:", proxyRes.headers);
      console.log("Response body:", proxyRes.body);
    },
  })
);

app.use(
  "/token",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: {
      "^/token": "/auth/realms/realm/protocol/openid-connect/token",
    },
    onProxyRes: function (proxyRes, req, res) {
      console.log("Response headers:", proxyRes.headers);
      console.log("Response body:", proxyRes.body);
    },
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
