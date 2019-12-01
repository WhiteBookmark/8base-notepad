import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
/**
 * Initialize the vue app and mount to the 
 * root component id.
 */
new Vue({
 router,
 store,
 vuetify,
 render: h => h(App)
}).$mount("#app");
