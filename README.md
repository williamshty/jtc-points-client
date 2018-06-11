## JTC Points Client Application

## About CSS

Onsen UI bundles `css/onsen-css-components.css` wich can be directly included in an app. However, this example uses the source `css-components-src/src/onsen-css-components.css` where colors can be easily modified. In order to support this, [`postcss-cssnext`](https://github.com/MoOx/postcss-cssnext) must be used in Webpack.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
- File Directory
  - __certs__
    - [server.csr]
    - [ca.crt]
    - [server.crt]
    - [ca.srl]
    - [server.key]
  - __src__
    - [AppNavigator.vue](C:\Users\e0012\Desktop\jtc-points-client/src/AppNavigator.vue)
    - [AppSplitter.vue](C:\Users\e0012\Desktop\jtc-points-client/src/AppSplitter.vue)
    - [AppTabbar.vue](C:\Users\e0012\Desktop\jtc-points-client/src/AppTabbar.vue)
    - __assets__
      - [manifest.json](C:\Users\e0012\Desktop\jtc-points-client/src/assets/manifest.json)
      - [vue-onsenui.png](C:\Users\e0012\Desktop\jtc-points-client/src/assets/vue-onsenui.png)
      - __images__
        - __icons__
    - [index.html](C:\Users\e0012\Desktop\jtc-points-client/src/index.html)
    - [const.js](C:\Users\e0012\Desktop\jtc-points-client/src/const.js)
    - [onsen-components.js](C:\Users\e0012\Desktop\jtc-points-client/src/onsen-components.js)
    - [main.js](C:\Users\e0012\Desktop\jtc-points-client/src/main.js)
    - [onsen-css-components.css](C:\Users\e0012\Desktop\jtc-points-client/src/onsen-css-components.css)
    - __pages__
      - [AddNewEvent.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/AddNewEvent.vue)
      - [Animations.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Animations.vue)
      - [EditEvent.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/EditEvent.vue)
      - [Camera.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Camera.vue)
      - [EventDetails.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/EventDetails.vue)
      - [Favorites.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Favorites.vue)
      - [Happenings.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Happenings.vue)
      - [Forms.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Forms.vue)
      - [Home.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Home.vue)
      - [Menu.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Menu.vue)
      - [Login.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Login.vue)
      - [MyEvents.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/MyEvents.vue)
      - [Redeemed.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Redeemed.vue)
      - [Signup.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Signup.vue)
      - [Products.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/Products.vue)
      - [MyEventDetails.vue](C:\Users\e0012\Desktop\jtc-points-client/src/pages/MyEventDetails.vue)
    - __partials__
      - [CustomToolbar.vue](C:\Users\e0012\Desktop\jtc-points-client/src/partials/CustomToolbar.vue)
    - [theme.css](C:\Users\e0012\Desktop\jtc-points-client/src/theme.css)
    - [store.js](C:\Users\e0012\Desktop\jtc-points-client/src/store.js)
  - __www__
  - __static__
    - __images__
    - __demo__
    - [demo.html](C:\Users\e0012\Desktop\jtc-points-client/static/demo.html)
    - [manifest.json](C:\Users\e0012\Desktop\jtc-points-client/static/manifest.json)
  - [README.md](C:\Users\e0012\Desktop\jtc-points-client/README.md)
  - [yarn.lock](C:\Users\e0012\Desktop\jtc-points-client/yarn.lock)
  - [webpack.config.js](C:\Users\e0012\Desktop\jtc-points-client/webpack.config.js)

