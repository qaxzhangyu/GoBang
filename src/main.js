// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store/store';
import md5 from 'js-md5';

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	components: { App },
	template: '<App/>'
});
