let baseUrl = 'http://192.168.43.34:8081';

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
				if (res[1].data.code == 200 || res[1].data.code == 202) {
					resolve(res[1])
				}else{
					uni.showToast({
						icon: 'none',
						title: res[1].data.message,
						duration: 1000
					});
					return false
				}
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
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		method: opts.method,
		data: opts.data,
		header: {
			'Authorization':token,
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1].data.code == 200 || res[1].data.code == 202) {
					resolve(res[1])
				}else{
					uni.showToast({
						icon: 'none',
						title: res[1].data.message,
						duration: 1000
					});
					return false
				}
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
