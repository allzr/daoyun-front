let baseUrl = 'http://172.20.10.7:8081';

const httpRequest = (opts) => {
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: opts.data,
		method: opts.method,
		header: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
//带Token请求
const httpTokenRequest = (opts) => {
	let token = uni.getStorageSync("token");
	console.log(opts.method)
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		method: opts.method,
		data: opts.data,
		header: {
			'Authorization': token,
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};

export default {
	baseUrl,
	httpRequest,
	httpTokenRequest
}
