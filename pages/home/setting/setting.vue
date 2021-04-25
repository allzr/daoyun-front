<template>
	<view>
		<u-button @click="logout">退出登录</u-button>
		<u-button @click="gotoChangePassword">修改密码</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout(){
				uni.showModal({
					title:'确定退出登录吗',
					success(res) {
						if(res.confirm){
							uni.removeStorage({
								key:'token'
							})
							uni.removeStorage({
								key:'info'
							})
							uni.reLaunch({
								url:'../../login/login'
							})
						}
					}
				})
			},
			gotoChangePassword(){
				uni.navigateTo({
					url:"changePassword/changePassword"
				})
			}
			
		}
	}
</script>

<style>

</style>
