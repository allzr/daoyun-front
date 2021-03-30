<template>
	<view>
		<view class="header">
			<navbar @navselect="navselect"></navbar>
		</view>
		<view class="body">
			<view>
				<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
			</view>
			<view v-if="index == 0">
				<classCard2 :className="className" :teacherName="teacherName" :createTime="createTime"></classCard2>
			</view>
			<view v-if="index == 1">
				<classCard :className="className" :teacherName="teacherName" :createTime="createTime"></classCard>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		onLoad() {
			var loginRes = this.checkLogin();
			if (!loginRes) {
				return false;
			}
		},
		data() {
			return {
				index: 0,
				className: "工程训练",
				teacherName: "老池",
				createTime: "2021-01"
			}
		},
		onPullDownRefresh() {
			setTimeout(function(){
				uni.stopPullDownRefresh();
				uni.showToast({
					title:"刷新成功",
					duration:500
				})
			},1000)
		},
		methods: {
			navselect({
				index
			}) {
				this.index = index
			}
		}
	}
</script>

<style lang="scss">
	.body {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding-top: 10rpx;	
	}
</style>
