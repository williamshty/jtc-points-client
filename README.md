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
    - [AppNavigator.vue]
    - [AppSplitter.vue]
    - [AppTabbar.vue]
    - __assets__
      - [manifest.json]
      - __images__
        - __icons__
    - [index.html]
    - [const.js]
    - [onsen-components.js]
    - [main.js]
    - [onsen-css-components.css]
    - __pages__
      - [AddNewEvent.vue]
      - [Animations.vue]
      - [EditEvent.vue]
      - [Camera.vue]
      - [EventDetails.vue]
      - [Favorites.vue]
      - [Happenings.vue]
      - [Forms.vue]
      - [Home.vue]
      - [Menu.vue]
      - [Login.vue]
      - [MyEvents.vue]
      - [Redeemed.vue]
      - [Signup.vue]
      - [Products.vue]
      - [MyEventDetails.vue]
    - __partials__
      - [CustomToolbar.vue]
    - [theme.css]
    - [store.js]
  - __www__
  - __static__
    - __images__
    - __demo__
    - [demo.html]
    - [manifest.json]
  - [README.md]
  - [yarn.lock]
  - [webpack.config.js]

