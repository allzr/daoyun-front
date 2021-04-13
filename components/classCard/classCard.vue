<template>
	<view class="classsCard">
		<view class="picture" @click="classDetail">
			<u-avatar :src="src" mode="square" size="140"></u-avatar>
		</view>
		<view class="message">
			<view style="font-size: 40rpx; font-weight: bolder;" @click="classDetail">
				{{className}}
			</view>
			<view class="classDetail" @click="classDetail">
				<view style="float: left;">{{teacherName}}</view>
				<view style="float: righ; color: #606060;">{{createTime}}</view>
			</view>
			<view class="operate">
				<view>
					<u-icon name="checkmark-circle" @click="sign"></u-icon> 签到
				</view>
				<view>
					<u-icon name="bell"></u-icon>举手
				</view>
			</view>
		</view>
		<view @click="classDetail">
			<u-cell-item arrow-direction="right"></u-cell-item>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			className: "",
			teacherName: "",
			createTime: ""
		},
		data() {
			return {
				src: '/static/logo.png'
			};
		},
		methods: {
			sign() {
				uni.navigateTo({
					url: "../../pages/home/sign/signBase/signBase"
				})
			},
			classDetail(){
				uni.navigateTo({
					url:"../../pages/home/class/classForStudent/classForStudent"
				})
			}
		}
	}
</script>

<style lang="scss">
	.classsCard {
		display: flex;
		height: 230rpx;
		justify-content: space-between;
		align-items: center;
		padding-left: 30rpx;

		.message {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			width: 50%;

			.classDetail {
				display: flex;
				justify-content: space-between;
				margin-top: 10rpx;
			}

			.operate {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
			}
		}
	}
</style>
