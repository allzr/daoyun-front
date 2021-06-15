<template>
	<view>
		<view>
			<view v-if="current == 0">
				<u-cell-group>
					<u-cell-item class="line" style="border-top: #E4E7ED solid 0.1rpx;" title="班课号" :arrow="false">
						{{cource.classID}}
					</u-cell-item>
					<u-cell-item class="line" title="课程名" :arrow="false">{{cource.className}}</u-cell-item>
					<u-cell-item class="line" title="学校" :arrow="false">{{cource.schoolName}}</u-cell-item>
					<u-cell-item class="line" title="学院" :arrow="false">{{cource.collegeName}}</u-cell-item>
					<u-cell-item class="line" title="主讲老师" :arrow="false">{{cource.teacherName}}</u-cell-item>
					<u-cell-item class="line" style="border-bottom: #E4E7ED solid 0.1rpx;" title="开课时间" :arrow="false">
						{{cource.createTime}}
					</u-cell-item>
					<u-cell-item class="line" title="是否开放" :arrow="false">
						<u-switch v-model="cource.isOpen" @change="change()"></u-switch>
					</u-cell-item>
					<u-cell-item class="line" title="是否结束" :arrow="false">
						<u-switch v-model="cource.isEnd" @change="change1()"></u-switch>
					</u-cell-item>
				</u-cell-group>


				<view>
					<u-button @click="showQrcode" type="primary">生成班课二维码</u-button>
				</view>

				<u-modal v-model="modal_qr" title="班课二维码">
					<view class="picture">
						<view style="padding-right: 50rpx;padding-top: 30rpx;">
							<ayQrcode ref="qrcode" :modal="modal_qr" :url="cource.classID" @hideQrcode="hideQrcode"
								:height="200" :width="200" themeColor="#33CCCC" />
						</view>
					</view>
				</u-modal>
			</view>
			<view v-if="current == 1">
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
			this.cource.classID = option.classID
			this.signMsg.teaCouID = Number(option.id)
			this.$api.getClassStudents(this.cource.classID).then(data => {
				this.students = data
			})
			let cource = uni.getStorageSync(this.cource.classID)
			if(cource){
				this.cource = cource
			}else{
				this.$api.classDetail(this.cource.classID).then(data => {
					this.cource.teacherName = data.teacherName
					this.cource.createTime = data.createTime
					var msg = data.className.split('-')
					this.cource.className = msg[0]
					this.cource.schoolName = msg[1]
					this.cource.collegeName = msg[2]
				})
			}
			
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
				cource: {
					classID: '',
					teacherName: "",
					createTime: "",
					className: "",
					schoolName: '',
					collegeName: '',
					isOpen:true,
					isEnd:false,
				},
				
				list1: [{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '信息',
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
			change() {
				uni.setStorageSync(this.cource.classID, this.cource)
			},
			change1() {
				uni.setStorageSync(this.cource.classID, this.cource)
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

	.picture {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>
