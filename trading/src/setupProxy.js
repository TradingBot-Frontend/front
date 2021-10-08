const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/login', '/users'],
    createProxyMiddleware({
      target: 'http://3.34.47.32:8080',
      changeOrigin: true,
    }),
  );
  app.use(
    ['/bots', '/user-portfolio', '/orders'],
    createProxyMiddleware({
      target: 'http://3.35.9.110:8080',
      changeOrigin: true,
    }),
  );
};
