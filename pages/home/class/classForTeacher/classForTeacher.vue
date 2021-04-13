<template>
	<view>
		<view class="u-page">
			<view v-if="current == 0">
				<u-button>上传资源</u-button>
			</view>
			<view v-if="current == 1">
				<u-button @click="sign">发起签到</u-button>
				<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
			</view>
			<view v-if="current == 2">成员</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list1"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '限时签到',
				}, {
					text: '手势签到'
				}],
				show: false,
				list1: [{
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
		methods: {
			sign() {
				this.show = true;
			},
			click(index) {
				console.log(index)
			}
		}
	}
</script>

<style>

</style>
