import http from "./http.js"
import user from './user.js'

let getCreateClass = () => {
	let userId = user.getUserId()
	return http.httpTokenRequest2({
		url:'/course/selectById/'+String(userId),
		method:'GET',
	}) 	
}

let updateUserInfo = (user)=>{
	return http.httpTokenRequest({
		url:'/user/updateUserInfo',
		method:'POST',
		data:user
	})
}

let joinClass = (classID)=>{
	return http.httpTokenRequest2({
		url:'/studentcourse/joinClass/'+classID,
		method:'POST',
	})
}

let getJoinClass = ()=>{
	return http.httpTokenRequest2({
		url:'/studentcourse/selectByStudent',
		method:'GET',
	})
}

let getClassStudents = (classID)=>{
	return http.httpTokenRequest2({
		url:'/studentcourse/selectByClass/'+classID,
		method:'GET'
	})
}

let createLimitTimeSign = (sign)=>{
	return http.httpTokenRequest2({
		url:'/sign/teaBeginByTime',
		method:'POST',
		data:sign
	})
}

let createBaseSign = (sign)=>{
	return http.httpTokenRequest2({
		url:'/sign/teaBegin',
		method:'POST',
		data:sign
	})
}

let studentSign = (sign)=>{
	return http.httpTokenRequest2({
		url:'/sign/stuSign',
		method:'POST',
		data:sign
	})
}

let getLocal = ()=>{
	return new Promise(function(resolve, reject){
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				let local = {
					locationX:String(res.latitude),
					locationY:String(res.longitude)
				}
				resolve(local)
			},
			fail:function(res){
				reject(res)
			}
		})
	})
}

export default{
	getCreateClass,
	updateUserInfo,
	joinClass,
	getJoinClass,
	getClassStudents,
	createLimitTimeSign,
	createBaseSign,
	studentSign,
	getLocal
}