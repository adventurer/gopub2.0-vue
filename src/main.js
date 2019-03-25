import Vue from 'vue'
import App from './App.vue'
import router from './router'

import jQuery from 'jquery'
// Vue.use(jQuery)
Vue.prototype.jQuery = jQuery

// iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import global_ from './components/Global.vue'
Vue.prototype.GLOBAL = global_
Vue.use(iView);

Vue.config.productionTip = false


let scheme = document.location.protocol == "https:" ? "wss" : "ws";
let port = document.location.port ? (":" + document.location.port) : "";
let wsURL = scheme + "://" + document.location.hostname + port + "/echo";
var ws = new WebSocket(wsURL);
Vue.prototype.ws = ws

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
