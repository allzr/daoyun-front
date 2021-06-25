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
					<classCard2 :className="item.className.split('-')[0]" :teacherName="item.teacherName"
						:createTime="item.createTime" :id='item.id' :classID="item.classID"></classCard2>
				</view>
			</view>

			<view v-if="index == 1">
				<view v-for="(item,idx) in classadd" :key='idx' style="border-bottom: #ECF5FF 0.5rpx solid;">
					<classCard :className="item.className.split('-')[0]" :teacherName="item.teacherName"
						:createTime="item.createTime" :id='item.id' :classID="item.classID"></classCard>
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
					<u-form-item label="课名" prop="className">
						<u-input placeholder="请输入班课名称" v-model="form.className" />
						<u-icon name="arrow-down-fill" @click="selectClass()"></u-icon>
					</u-form-item>
					<u-form-item label="班级">
						<u-input placeholder="请输入班级" v-model="form.classNumber" />
					</u-form-item>
					<u-form-item label="学期" prop="openYear">
						<!-- <u-input placeholder="请输入开课时间" v-model="form.openYear" /> -->
						<u-input type="select" :select-open="selectShow2" v-model="form.openYear" placeholder="请选择开学年份"
							@click="selectShow2 = true"></u-input>
					</u-form-item>
					<u-form-item label="学校" prop="schoolName">
						<u-input type="select" :select-open="selectShow" v-model="form.schoolName" placeholder="请选择学校"
							@click="selectShow = true"></u-input>
					</u-form-item>
					<u-form-item label="学院" prop="collegeName">
						<u-input v-model="form.collegeName"></u-input>
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-modal v-model="showPop2" title="班课信息" show-cancel-button @confirm="confirmPop2">
			<u-cell-group>
				<u-cell-item class="line" title="课程名" :arrow="false">{{cource.className}}</u-cell-item>
				<u-cell-item class="line" title="学校" :arrow="false">{{cource.schoolName}}</u-cell-item>
				<u-cell-item class="line" title="学院" :arrow="false">{{cource.collegeName}}</u-cell-item>
				<u-cell-item class="line" title="主讲老师" :arrow="false">{{cource.teacherName}}</u-cell-item>
				<u-cell-item class="line" style="border-bottom: #E4E7ED solid 0.1rpx;" title="开课时间" :arrow="false">
					{{cource.createTime}}
				</u-cell-item>
			</u-cell-group>
		</u-modal>
		<u-select mode="mutil-column-auto" :list="schoolList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="classNameList" v-model="classSelect" @confirm="classSelectConfirm">
		</u-select>
		<u-select mode="single-column" :list="yearList" v-model="selectShow2" @confirm="selectConfirm2"></u-select>
		<u-keyboard ref="uKeyboard" mode="number" @change="valChange" @backspace="backspace" v-model="showKeyboard"
			:mask="false"></u-keyboard>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		onLoad() {
			this.checkLogin();
			this.$api.getCreateClass().then((data) => {
				if (data.length > 0) {
					this.classcreate = data
				} else {
					this.classcreate = [{
						className: "暂无创建",
						createTime: "",
						id: "",
						classID: "",
						teacherName: "点击右上角，创建班课"
					}]
				}
			})
			this.$api.getJoinClass().then(data => {
				if (data.length > 0) {
					this.classadd = data
				} else {
					this.classadd = [{
						className: "暂无加入",
						createTime: "",
						id: "",
						classID: "",
						teacherName: "点击右上角，加入班课"
					}]
				}
			})
		},
		data() {
			return {
				index: 0,
				keyword: '',
				classid: '',
				showKeyboard: false,
				classcreate: [],
				classadd: [],
				form: {
					className: '',
					openYear: '',
					schoolName: '',
					collegeName: '',
					classNumber: ''
				},
				showPop: false,
				showPop1: false,
				showPop2: false,
				selectShow: false,
				selectShow1: false,
				selectShow2: false,
				classSelect: false,
				schoolList: [{
						label: '福州大学',
						children: [{
							label: '数计学院'
						}, {
							label: '物信学院'
						}, {
							label: '生工学院'
						}]
					},
					{
						label: '厦门大学',
						children: [{
							label: '数计学院'
						}, {
							label: '化学学院'
						}, {
							label: '电气学院'
						}]
					},
					{
						label: '清华大学',
						children: [{
							label: '人文学院'
						}, {
							label: '美术学院'
						}, {
							label: '体育学院'
						}]
					}
				],
				yearList: [],
				classNameList: [],
				cource: {
					teacherName: "",
					createTime: "",
					className: "",
					schoolName: '',
					collegeName: ''
				},
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000)
			this.$api.getCreateClass().then((data) => {
				if (data.length > 0) {
					this.classcreate = data
				} else {
					this.classcreate = [{
						className: "暂无创建",
						createTime: "",
						id: "",
						classID: "",
						teacherName: "点击右上角，创建班课"
					}]
				}
			})
			this.$api.getJoinClass().then(data => {
				if (data.length > 0) {
					this.classadd = data
				} else {
					this.classadd = [{
						className: "暂无加入",
						createTime: "",
						id: "",
						classID: "",
						teacherName: "点击右上角，加入班课"
					}]
				}
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
					this.showKeyboard = true
				} else if (index == 0) {
					this.showPop1 = true
				} else {
					this.$api.getCode().then(res => {
						if (res.length == 8) {
							for (var i = 0; i < this.classadd.length; i++) {
								if (this.classadd[i].classID === res) {
									this.showToastFault('您已加入改班课')
									return 
								}
							}
							let course = uni.getStorageSync(res)
							if (course) {
								if (!course.isOpen) {
									this.showToast('课程暂未开放')
									return
								}
								if (course.isEnd) {
									this.showToast('课程已经结束')
									return
								}
							}
							this.$api.joinClass(res).then((res) => {
								this.showToast('加入班课成功')
								this.index = 1
								this.getClass()
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '二维码内容错误',
								duration: 2000
							});
						}
					})
				}
			},
			selectClass() {
				this.classNameList = []
				this.$http.httpTokenRequest2({
					url: '/course/getCourses',
					method: 'get',
				}).then((res) => {
					for (var i = 0; i < res.length; i++) {
						this.classNameList.push({
							label: res[i]
						})
					}
				})
				this.classSelect = true
			},
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.classid += val;
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.classid.length) this.classid = this.classid.substr(0, this.classid.length - 1);
			},
			getClass() {
				this.$api.getCreateClass().then((data) => {
					if (data.length > 0) {
						this.classcreate = data
					} else {
						this.classcreate = [{
							className: "暂无创建",
							createTime: "",
							id: "",
							classID: "",
							teacherName: "点击右上角，创建班课"
						}]
					}
				})
				this.$api.getJoinClass().then(data => {
					if (data.length > 0) {
						this.classadd = data
					} else {
						this.classadd = [{
							className: "暂无加入",
							createTime: "",
							id: "",
							classID: "",
							teacherName: "点击右上角，加入班课"
						}]
					}
				})
			},
			confirmPop() { //确定
				if (this.classid.length == 8) {
					if (!this.makesurediff()) {
						this.showToastFault('您已加入班课')
						return
					}
					let course = uni.getStorageSync(this.classid)
					if (course) {
						if (!course.isOpen) {
							this.showToast('课程暂未开放')
							return
						}
						if (course.isEnd) {
							this.showToast('课程已经结束')
							return
						}
					}
					this.$api.classDetail(this.classid).then((data) => {
						this.cource.teacherName = data.teacherName
						this.cource.createTime = data.createTime
						var msg = data.className.split('-')
						this.cource.className = msg[0]
						this.cource.schoolName = msg[1]
						this.cource.collegeName = msg[2]
						this.showPop2 = true
					})
				} else {
					this.showToastFault('请输入8位课程号')
				}

			},
			confirmPop2() {
				this.$api.joinClass(this.classid).then((res) => {
					this.showToast('加入成功')
					this.index = 1
					this.getClass()
				})
				this.classid = ''
			},
			makesurediff() {
				for (var i = 0; i < this.classadd.length; i++) {
					if (this.classadd[i].classID === this.classid) {
						return false
					}
				}
				return true
			},
			confirmPop1() { //确定
				if (this.form.className == '' || this.form.openYear == '' || this.form.schoolName == '' || this.form
					.collegeName == '') {
					this.showToastFault('输入不正确')
				} else {
					const data = {
						openYear: Number(this.form.openYear),
						course: {
							name: this.form.className + '-' + this.form.schoolName + '-' + this.form.collegeName,
						}
					}
					this.$http.httpTokenRequest2({
						url: "/course/create",
						method: "POST",
						data: data
					}).then((res) => {
						this.showToast('创建成功,正在跳转...')
						setTimeout(() => {
							uni.navigateTo({
								url: "class/classForTeacher/classForTeacher?classID=" + res
									.classId +
									"&id=" +
									res.couID
							})
						}, 1000)
					})
				}
			},

			// 选择商品类型回调
			selectConfirm(e) {
				this.form.schoolName = e[0].label
				this.form.collegeName = e[1].label
			},
			// 选择商品类型回调
			selectConfirm1(e) {
				this.form.collegeName = '';
				e.map((val, index) => {
					this.form.collegeName += val.label;
				})
			},

			selectConfirm2(e) {
				e.map((val, index) => {
					this.form.openYear = String(val.label);
				})
			},
			classSelectConfirm(e) {
				e.map((val, index) => {
					this.form.className = val.label;
				})
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
			for (var i = 2021; i < 2031; i++) {
				this.yearList.push({
					label: i
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
