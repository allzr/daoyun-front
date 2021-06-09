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
	return http.httpTokenRequest3({
		url:'/studentcourse/joinClass/'+classID,
		method:'POST',
	})
}

export default{
	getCreateClass,
	updateUserInfo
}