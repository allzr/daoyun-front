let user = null

let getUser =  ()=>{
	user = uni.getStorageSync("user");
	return user;
}
let getUserId = ()=>{
	user = uni.getStorageSync("user");
	return user.userID;
}

export default{
	getUser,
	getUserId
}