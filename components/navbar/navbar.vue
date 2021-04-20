<template>
	<view class="navbar">
		<view class="header"></view>
		<view class="slotwrap">
			<view class="tabs">
				<u-tabs :list="list" font-size = "50rpx" active-color="#58C3E0" :is-scroll="false" :current="current" @change="change">
				</u-tabs>
			</view>
			<view class="plus">
				<u-icon color="black" name="plus" size="40" @click="show=true"></u-icon>
			</view>
		</view>
		<u-action-sheet :list="list2" @click="click" v-model="show"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '我创建的'
				}, {
					name: '我加入的'
				}],
				current: 0,

				list2: [{
					text: '创建班课',
				}, {
					text: '加入班课'
				},{
					text: '扫描二维码'
				}],
				show: false
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.$emit("navselect", {
					index: index
				})
			},
			click(index) {
				this.$emit("banke",{
					index:index
				})
			},
		}
	}
</script>

<style lang="scss">
	.navbar {
		background-color: #FFFFFF;	
		.header{
			height: 40rpx;
		}
		.slotwrap {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			;
			.tabs {
				height: 90%;
				width: 450rpx;
			}
			.plus {
				transform: translate(-100%,0);
				align-self: center;
			}
		}
	}
</style>
