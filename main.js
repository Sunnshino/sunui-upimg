import Vue from 'vue'
import App from './App'
import sunUpImg from './components/sunui-upimg/sunui-upimg.vue'
Vue.component('sunui-upimg', sunUpImg)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
