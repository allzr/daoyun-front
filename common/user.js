let user = null

let getUser =  ()=>{
	if (user == null){
		user = uni.getStorageSync("user");
	}
	return user;
}
let getUserId = ()=>{
	if(user == null){
		user = uni.getStorageSync("user");
	}
	return user.userID;
}

export default{
	getUser,
	getUserId
}