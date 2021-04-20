<template>
	<view>
		<view class="u-page">
			<view v-if="current == 0">
				<u-button @click="showQrcode">生成班课二维码</u-button>
				<view style="margin: 40upx;">
					<ayQrcode ref="qrcode" :modal="modal_qr" :url="classid" @hideQrcode="hideQrcode" :height="300"
						:width="300" themeColor="#33CCCC"/>
				</view>
			</view>
			<view v-if="current == 1">
				<view @click="sign" class="button">发起签到</view>
			</view>
			<view v-if="current == 2">成员</view>
		</view>
		<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list1"></u-tabbar>
		<u-modal v-model="showModel" title="限时时间" show-cancel-button @confirm="confirmPop">
			<br>
			<view style="display: flex;justify-content: center;align-items: center;">
				<view style="width: 50rpx;">
					<input v-model="time" type="number" maxlength=2 style="border-bottom: #808080 solid 1rpx;" />
				</view>
				<view style="width: 100rpx;font-size: 40rpx;">
					分钟
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	export default {
		components: {
			ayQrcode,
		},
		data() {
			return {
				list: [{
					text: '限时签到',
				}, {
					text: '位置签到'
				}],
				show: false,
				showModel: false,
				modal_qr: false,
				list1: [{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '资源',
						customIcon: false,
					},
					{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '签到',
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
				time: 0,
				border: true,
				classid: 'www.baidu.com'
			}
		},
		methods: {
			sign() {
				this.show = true;
			},
			click(index) {
				if (index == 0) {
					this.showModel = true
				} else {
					this.$u.toast("位置签到发起成功")
				}
			},
			confirmPop() {
				this.$u.toast("限时签到发起成功")
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				// uni.showLoading()
				setTimeout(function() {
					// uni.hideLoading()
					_this.$refs.qrcode.crtQrCode()
				}, 50)
			},
			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
		}
	}
</script>

<style lang="scss">
	.u-page {
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
