import Vue from 'vue'
import App from './App'
// main.js
import uView from "uview-ui";
import http from './common/http.js'    // 路径需根据项目实际情况
import user from './common/user.js'
import api from './common/api.js'
import md5Libs from "uview-ui/libs/function/md5";

Vue.prototype.$http = http         // 挂载在 Vue 原型链上（通过 this.$ajax 调用）
Vue.prototype.$user = user
Vue.prototype.$api = api
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})

//登录拦截。。方法。。检查本地token即可，没有的话进入登录页面
Vue.prototype.checkLogin = function(){
	const token = uni.getStorageSync('token')
	if(token === ''){ // 本地没有token表示未登录
		console.log('未登录返回到登录页')
		uni.reLaunch({
			url:"/pages/login/login"
		})
		return false
	}
}
Vue.prototype.md5 = function(data){
	return  md5Libs.md5(data);
}
app.$mount()
