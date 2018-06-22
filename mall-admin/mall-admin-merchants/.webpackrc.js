const path = require('path');
export default {
  entry:"./src/index.js",
  "alias":{
    '@':path.resolve(__dirname,'./src'),
    'assets':path.resolve(__dirname,'./src/assets'),
    'components':path.resolve(__dirname,'./src/components'),
    'models':path.resolve(__dirname,'./src/models'),
    'routes':path.resolve(__dirname,'./src/routes'),
    'services':path.resolve(__dirname,'./src/services'),
    'utils':path.resolve(__dirname,'./src/utils')
  },
  proxy:{
    "/api/mock": {
      "target": "http://localhost:8000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/mock": "/api/mock" }
    },
    "/api/mallManager": {
      "target": "http://192.168.0.25:18097/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/mallManager": "" }
    },
  },
  env: {
    development: {
      extraBabelPlugins: [
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  }
}
