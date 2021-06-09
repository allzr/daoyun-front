<template>
	<view>
		<view>
			<view v-if="current == 1">
				<view>
					<u-button @click="showQrcode" type="success">生成班课二维码</u-button>
				</view>
				<view style="padding-top: 20rpx;padding-right: 50rpx;">
					<ayQrcode ref="qrcode" :modal="modal_qr" :url="classID" @hideQrcode="hideQrcode" :height="300"
						:width="300" themeColor="#33CCCC" />
				</view>
			</view>
			<view v-if="current == 0">
				<view class="u-page">
					<view @click="sign" class="button">发起签到</view>
				</view>
			</view>
			<view v-if="current == 2">
				<view>
					<u-cell-group>
						<view v-for="(item,idx) in students" :key='idx' style="border-top: #CCCCCC 0.1rpx solid;">
							<u-cell-item class="line" icon="account-fill" :title="item.username">
								学号:{{item.studentNumber}}&nbsp&nbsp&nbsp&nbsp&nbsp经验:{{item.EXP}}</u-cell-item>
						</view>
					</u-cell-group>
				</view>
			</view>
		</view>
		<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list1"></u-tabbar>
		<u-modal v-model="showModel" title="限时时间" show-cancel-button @confirm="confirmPop">
			<br>
			<view style="display: flex;justify-content: center;align-items: center;">
				<view style="width: 50rpx;">
					<input v-model="signMsg.time" type="number" maxlength=2
						style="border-bottom: #808080 solid 1rpx;" />
				</view>
				<view style="width: 100rpx;font-size: 40rpx;">
					分钟
				</view>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	export default {
		components: {
			ayQrcode,
		},
		onLoad(option) {
			this.classID = option.classID
			this.signMsg.teaCouID = Number(option.id)
			this.$api.getClassStudents(this.classID).then(data => {
				this.students = data
			})
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
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '签到',
						customIcon: false,
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '资源',
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
				border: true,
				classID: '',
				students: [],
				signMsg: {
					locationX: '',
					locationY: '',
					teaCouID: 0,
					time: 0,
					userID: 0
				}
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
					this.signMsg.userID = this.$user.getUserId();
					this.$api.getLocal().then(res => {
						this.signMsg.locationX = res.locationX
						this.signMsg.locationY = res.locationY
						this.$api.createBaseSign(this.signMsg).then(res => {
							this.showToast("位置签到发起成功")
						})
					}).catch(err => {
						this.showToastFault("位置获取失败")
					})
				}
			},
			
			confirmPop() {
				this.signMsg.userID = this.$user.getUserId();
				this.$api.getLocal().then(res => {
					this.signMsg.locationX = res.locationX
					this.signMsg.locationY = res.locationY
					this.$api.createLimitTimeSign(this.signMsg).then((res) => {
						this.showToast("限时签到发起成功")
					})
				}).catch(err => {
					this.showToastFault("位置获取失败")
				})
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

			showToast(message) {
				this.$refs.uToast.show({
					title: message,
					type: 'success',
					position: 'center'
				})
			},
			showToastFault(message) {
				this.$refs.uToast.show({
					title: message,
					type: 'error',
					position: 'center'
				})
			}
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
