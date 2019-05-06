import Vue from 'vue'
import App from './App'
import sunUpImg from './components/sunui-upimg/sunui-upimg.vue'
import sunUiBasic from './components/sunui-upimg/sunui-upimg-basic.vue'
import sunUiOos from './components/sunui-upimg/sunui-upimg-alioos.vue'
import sunUiqiNiu from './components/sunui-upimg/sunui-upimg-qiniu.vue'
Vue.component('sunui-upimg', sunUpImg)
Vue.component('sunui-upbasic',sunUiBasic)
Vue.component('sunui-upoos',sunUiOos)
Vue.component('sunui-upqiniu',sunUiqiNiu)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
