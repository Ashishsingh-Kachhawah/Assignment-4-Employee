const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://www.powercooling.staging.com/',
      
//       changeOrigin: true,
//     })
//   );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://powercooling.staging.utilizecore.com/',
      
      changeOrigin: true,
    })
  );
};