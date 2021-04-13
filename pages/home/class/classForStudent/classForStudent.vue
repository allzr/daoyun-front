<template>
	<view>
		<view class="u-page">
			<view v-if="current == 0">这里还没有资源</view>
			<view v-if="current == 1">发起签到</view>
			<view v-if="current == 2">成员</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list"></u-tabbar>
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
						text: '详情',
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '成员',
						customIcon: false,
					},
				],
				current: 0
			}
		},
	}
</script>

<style>

</style>

