import 'onsenui/css/onsenui.css'; // Onsen UI basic CSS
// import 'onsenui/css/onsen-css-components.css'; // Default Onsen UI CSS components
import './onsen-css-components.css'; // Onsen UI CSS components source for custom themes (requires cssnext)

import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { baseUrl } from "./const.js";
import VueOnsen from 'vue-onsenui'; // For UMD
// import VueOnsen from 'vue-onsenui/esm'; // For ESM
// import * as OnsenComponents from './onsen-components'; // For ESM
import VueQrcodeReader from 'vue-qrcode-reader'
import storeLike from './store.js';
import CustomToolbar from './partials/CustomToolbar.vue';
import AppNavigator from './AppNavigator.vue';
// (function() {
//   if('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js');
//   }
// })();
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = baseUrl;
console.log(Vue.prototype.$http.defaults.baseURL)
Vue.use(Vuex);
Vue.use(VueOnsen);
Vue.use(VueQrcodeReader);

// Register components globally
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM
Vue.component('custom-toolbar', CustomToolbar); // Common toolbar

new Vue({
  el: '#app',
  render: h => h(AppNavigator),
  store: new Vuex.Store(storeLike),
  beforeCreate() {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid();

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }
  }
});
