<template>
	<view class="classsCard2">
		<view class="picture">
			<u-avatar :src="src" mode="square" size="140"></u-avatar>
		</view>
		<view class="message">
			<view style="font-size: 40rpx; font-weight: bolder;">
				{{className}}
			</view>
			<view class="classDetail">
				<view style="float: left;">{{teacherName}}</view>
				<view style="float: righ; color: #606060;">{{createTime}}</view>
			</view>
			<view class="operate">
				<view>
					<u-icon name="checkmark-circle"></u-icon> 发起签到
				</view>
			</view>
		</view>
		<view>
			<u-cell-item arrow-direction="right"></u-cell-item>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			className:"",
			teacherName:"",
			createTime:""
		},
		data() {
			return {
				src: '/static/logo.png'
			};
		}
	}
</script>

<style lang="scss">
		.classsCard2 {
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
				.classDetail{
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
