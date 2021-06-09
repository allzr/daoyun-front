<template>
	<view>
		<!-- <u-button @click="logout">退出登录</u-button>
		<u-button @click="gotoChangePassword">修改密码</u-button> -->
		
		<u-line></u-line>
		<view>
			<view class="setting">
				<u-cell-group>
					<u-cell-item class="line" title="修改密码" :arrow="true" arrow-direction="right" @click="gotoChangePassword()"></u-cell-item>
					<u-cell-item class="line" title="用户设置" :arrow="true" arrow-direction="right" @click="usersetting"></u-cell-item>
				</u-cell-group>
				<br>
				<u-cell-group>
					<u-cell-item class="line" title="退出登录" :arrow="true" arrow-direction="right" @click="logout"></u-cell-item>
				</u-cell-group>

			</view>
		</view>
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
			},
			usersetting(){
				uni.navigateTo({
					url:'../myMessage/myMessage'
				})
			}
			
		}
	}
</script>

<style>

</style>
