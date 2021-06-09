<template>
	<view>
		<view class="u-page">
			<view v-if="current == 0">
				<view class="sign">
					<view  class="button">上传资源</view>
				</view>
			</view>
			<view v-if="current == 1">
				<view class="sign">
					<view @click="sign" class="button">签到</view>
				</view>
			</view>
			<view v-if="current == 2">
				<view class="sign">
					<view  class="button">没有成员</view>
				</view>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list"></u-tabbar>
		<u-modal v-model="show1" title="签到成功" content="获得2积分"></u-modal>
		<u-modal v-model="show2" title="签到失败" content="位置里老师太远"></u-modal>
		<u-modal v-model="show3" title="签到失败" content="时间过期"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '资源',
						customIcon: false,
					},
					{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '主页',
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '成员',
						customIcon: false,
					},
				],
				current: 0,
				show1:false,
				show2:false,
				show3:false
			}
		},
	}
</script>

<style lang="scss">
	.sign {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 800rpx;

		.button {
			font-size: 50rpx;
			width: 300rpx;
			height: 300rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $daoyun-main;
		}
	}
</style>
