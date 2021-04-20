<template>
	<view>
		
		<view class="head">
			<view style="height: 40rpx;"></view>
			<view class="header" @click="gotoUserMessage">
				<view class="touxiang">
					<u-avatar :src="src" mode="square" size="150"></u-avatar>
				</view>
				<view class="message">
					<view class="name">
						{{user.username}}
					</view>
					<view class="id">
						<view class="cloud">
							到云账号 : {{user.phoneNumber}}
						</view>
						<view>
							<u-cell-item arrow-direction="right"></u-cell-item>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lineBar">
			<view class="son1">
				<view style="color: #58C3E0;">{{user.exp}}</view>
				<view>经验值</view>
			</view>
			<view class="son">
				<view style="color: #58C3E0;">0</view>
				<view>魅力值</view>
			</view>
			<view class="son">
				<view style="color: #58C3E0;">0</view>
				<view>蓝豆</view>
			</view>
			<view class="son">
				<view style="color: #58C3E0;">0</view>
				<view>心意</view>
			</view>
		</view>

		<view class="setting">
			<u-cell-group>
				<u-cell-item class="line" icon="order" title="用户协议" :arrow="true" arrow-direction="right"></u-cell-item>
				<u-cell-item class="line" icon="lock" title="隐私政策" :arrow="true" arrow-direction="right"></u-cell-item>
				<u-cell-item class="line" style="border-bottom: #E4E7ED solid 0.1rpx;" icon="setting" title="设置" :arrow="true" arrow-direction="right" @click='gotoSetting'></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		onReady() {
			this.user = uni.getStorageSync('user')
		},
		data() {
			return {
				src: '/static/logo.png',
				name: "小发",
				id: "825655513",
				realName: "点击设置真实姓名",
				user:{
					exp: 0, //经验值
					phoneNumber: "",
					realName: "",
					schoolName: null,
					userType: 0,
					username: "",
				}
			}
		},
		methods:{
			gotoUserMessage(){
				uni.navigateTo({
					url:"./myMessage/myMessage"
				})
			},
			gotoSetting(){
				uni.navigateTo({
					url:'setting/setting'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}
	.head{	
		background-color: #FFFFFF;
	}
	.header {
		width: 100%;
		height: 300rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.touxiang {
			transform: translate(50%, 0);
		}

		.message {
			transform: translate(0, 10%);
			margin-left: 40rpx;

			.name {
				font-size: 50rpx;
				font-weight: bold;
				transform: translate(0, 10%);
			}

			.id {
				color: #606060;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.setting {
		margin-top: 20rpx;
	}

	.lineBar {
		background-color: #FFFFFF;
		border-top: #C8C9CC 0.5rpx solid;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.son {
			border-left: #C8C9CC 0.2rpx solid;
			width: 25%;
			display: flex;
			justify-content: center;
			flex-direction: column;	
			align-items: center;
		}

		.son1 {
			width: 25%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
	}
	
</style> 
