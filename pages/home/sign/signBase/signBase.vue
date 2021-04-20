<template>
	<view class="sign">
		<view @click="sign" class="button">签到</view>
		<u-modal v-model="show1" title="签到成功" content="获得2积分"></u-modal>
		<u-modal v-model="show2" title="签到失败" content="位置里老师太远"></u-modal>
		<u-modal v-model="show3" title="签到失败" content="时间过期"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show1:false,
				show2:false,
				show3:false
			}
		},
		methods: {
			sign() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
				this.show1 = true;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.sign {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 800rpx;
			.button{
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
