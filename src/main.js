import Vue from 'vue'
import App from './App.vue'
import router from './router'
import persistentStorage from 'vue-persistent-state';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars }  from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft }  from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faArrowLeft)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const initialState = {
  authenticated: false,
};

Vue.use(persistentStorage, initialState);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
