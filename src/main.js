import Vue from 'vue';
import App from './App.vue';
import './index.less';
import Loading from './components/loading/loading.js';

Vue.config.productionTip = false;
Vue.use(Loading);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
