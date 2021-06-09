<template>
	<view>
		<view class="header">
			<navbar @navselect="navselect" @banke="banke"></navbar>
		</view>

		<view class="body">
			<view style="padding-bottom: 10rpx;">
				<u-search placeholder="请输入课程名称" v-model="keyword"></u-search>
			</view>
			<view v-if="index == 0">
				<view v-for="(item,idx) in classcreate" :key='idx' style="border-bottom: #ECF5FF 0.5rpx solid;">
					<classCard2 :className="item.className" :teacherName="item.teacherName"
						:createTime="item.createTime" :id='item.id' :classID="item.classID"></classCard2>
				</view>
			</view>
			
			<view v-if="index == 1">
				<view v-for="(item,idx) in classadd" :key='idx' style="border-bottom: #ECF5FF 0.5rpx solid;">
					<classCard :className="item.className" :teacherName="item.teacherName" :createTime="item.createTime"
						:id='item.id' :classID="item.classID"></classCard>
				</view>
			</view>
		</view>


		<!-- 加入班课组件 -->
		<u-modal v-model="showPop" title="加入班课" show-cancel-button @confirm="confirmPop">
			<view class="slot-content">
				<view>
					<input type='text' placeholder="请输入班课号" v-model="classid" />
				</view>
			</view>
		</u-modal>

		<!-- 创建班课组件 -->
		<u-modal v-model="showPop1" title="创建班课" show-cancel-button @confirm="confirmPop1">
			<view class="calssForm">
				<u-form :model="form" ref="uForm">
					<u-form-item label="课名">
						<u-input placeholder="请输入班课名称" v-model="form.className" />
					</u-form-item>
					<u-form-item label="时间">
						<u-input placeholder="请输入开课时间" v-model="form.openYear" />
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		onLoad() {
			this.checkLogin();
			this.getClass();
		},
		data() {
			return {
				index: 0,
				keyword: '',
				classcreate: [{
					className: "暂无创建",
					createTime: "",
					id: "",
					classID: "",
					teacherName: "点击右上角，创建班课"
				}],
				classadd: [{
					className: "暂无加入",
					createTime: "",
					id: "",
					classID: "",
					teacherName: "点击右上角，加入班课"
				}],
				showPop: false,
				showPop1: false,
				classid: '',
				form: {
					className: '',
					openYear: '',
				},
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000)
			this.$api.getCreateClass().then((data) => {
				this.classcreate = data
			})
			this.$api.getJoinClass().then(data=>{
				this.classadd = data
			})
		},
		methods: {
			navselect({
				index
			}) {
				this.index = index
			},
			banke({
				index
			}) {
				if (index == 1) {
					this.showPop = true
				} else if (index == 0) {
					this.showPop1 = true
				} else {
					uni.scanCode({
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							this.$u.toast(res.result);
							console.log('条码内容：' + res.result);
						}
					});
				}
			},
			getClass() {
				this.$api.getCreateClass().then((data) => {
					this.classcreate = data
				})
				this.$api.getJoinClass().then(data=>{
					this.classadd = data
				})
			},
			confirmPop() { //确定
				if (this.classid.length == 8){
					this.$api.joinClass(this.classid).then((res)=>{
						this.showToast('加入成功')
					})
				}else{
					this.showToastFault('请输入8位课程号')
				}
				this.classid = ''
			},
			confirmPop1() { //确定
				if (this.form.className == '' || this.form.openYear == '') {
					this.showToastFault('输入不正确')
				} else {
					const data = {
						openYear: Number(this.form.openYear),
						course: {
							name: this.form.className,
						}
					}
					this.$http.httpTokenRequest({
						url: "/course/create",
						method: "POST",
						data: data
					}).then((res) => {
						this.showToast('创建成功')
					})
				}
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
		},
		onReady() {
			let info = uni.getStorageSync('info')
			if (info.UserMessageSetting) {
				uni.showModal({
					title: "请修改密码",
					content: "默认密码是您的手机号",
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "setting/changePassword/changePassword"
							})
						}
					}
				})
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

	.slot-content {
		padding-left: 30rpx;
		font-size: 24rpx;
		color: $u-content-color;
	}

	.calssForm {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
</style>
