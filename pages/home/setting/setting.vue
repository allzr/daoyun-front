<template>
	<view>
		<u-button @click="logout">退出登录</u-button>
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
							uni.reLaunch({
								url:'../../login/login'
							})
						}
					}
				})
			}
			
		}
	}
</script>

<style>

</style>
