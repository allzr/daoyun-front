<template>
	<view class="navbar">
		<u-navbar :is-back="false" >
			<view class="slot-wrap">
				<view style="width: 400rpx; position: fixed;">
					<u-tabs :list="list" active-color="#58C3E0" :is-scroll="false" :current="current" @change="change"></u-tabs>
				</view>
				
				<view style="position: fixed;margin-left:90%;align-items: center;">
					<u-icon color="#58C3E0" name="plus" size="40" @click="show=true"></u-icon>
				</view>
			</view>
		</u-navbar>
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
				}],
				show: false
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.$emit("navselect",{
					index:index
				})
			},
			click(index) {
				console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		height: 100rpx;
		width: 100%;

		.select {
			display: flex;
			margin-right: 10rpx;
			align-items: center;
			width: 45rpx;
		}

		.slot-wrap {
			display: flex;
			align-items: center;
		}
	}
</style>
