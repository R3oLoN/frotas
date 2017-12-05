// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './api/config'
import 'animate.css/animate.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import ptBR from 'vee-validate/dist/locale/pt_BR'
import VeeValidate, { Validator } from 'vee-validate'

import './filters'

Validator.addLocale(ptBR)
Vue.use(VeeValidate, {
	delay: 0,
	locale: 'pt_BR',
	classes: true,
	events: 'input|blur',
	inject: true
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
