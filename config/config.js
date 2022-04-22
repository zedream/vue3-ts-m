module.exports = {
  port: 3090,
  proxy: [
    {
      context: ['/api'],
      target: 'https://c2b-test14.brightoilonline.com',
      changeOrigin: true,
      secure: false,
      // pathRewrite: { '^/api': '/' }
    },
    {
      context: ['/gateway/api/frontTransReq.do'],
      target: 'https://gateway.95516.com',
      changeOrigin: true,
      secure: false
    },
    {
      context: ['/newmid'],
      target: 'https://api-test13.brightoilonline.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/newmid': '' }
    }
  ],
  name: '云油加油',
  version: '7.8.4',
  app: {
    tel: '400-666-8666'
  },
  env: {
    dev: {
      APP_NODE_ENV: 'dev',
      PUBLIC_PATH: '/',
      BASE_URL: '/'
    },
    prod: {
      APP_NODE_ENV: 'prod',
      PUBLIC_PATH: '/m/',
      BASE_URL: 'https://c2b.brightoilonline.com'
    },
    sit: {
      APP_NODE_ENV: 'sit',
      PUBLIC_PATH: '/m/',
      BASE_URL: '/'
    },
    uat: {
      APP_NODE_ENV: 'uat',
      PUBLIC_PATH: '/',
      BASE_URL: '/'
    }
  }
}
