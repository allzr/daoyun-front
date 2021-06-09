let user = null

const getUser =  ()=>{
	if (user == null){
		user = uni.getStorageSync("user");
	}
	return user;
}
const getUserId = ()=>{
	if(user == null){
		console.log('加载用户')
		user = uni.getStorageSync("user");
	}
	return user.userID;
}

export default{
	getUser,
	getUserId
}