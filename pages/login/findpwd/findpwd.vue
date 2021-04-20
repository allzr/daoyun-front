<template>
	<view>
		<view>
			<u-steps :list="numList" :current="step"></u-steps>
		</view>
		<view v-show="step == 0">
			<u-form :model="form" ref="uForm">
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" label="手机号"
					prop="phoneNumber" label-width="150">
					<u-input placeholder="请输入手机号" v-model="form.phoneNumber" type="number"></u-input>
				</u-form-item>
				<u-form-item label="验证码" prop="password" label-width="150">
					<u-input placeholder="请输入验证码" v-model="form.password" type="text"></u-input>
					<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
				</u-form-item>
				<u-button @click="loginByCode" type="primary">验证身份</u-button>
			</u-form>
		</view>
		<view v-show="step == 1">
			<u-form :model="formPassword" ref="uForm1">
				<u-form-item label="新密码" prop="password" label-width="150">
					<u-input type="password" v-model="formPassword.password" placeholder="请输入密码"></u-input>
				</u-form-item>
				<u-form-item label="确认密码" label-width="150" prop="rePassword">
					<u-input type="password" v-model="formPassword.rePassword" placeholder="请确认密码"></u-input>
				</u-form-item>
				<u-button @click="commit" type="primary">提交修改</u-button>
			</u-form>
		</view>

		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numList: [{
					name: '短信验证'
				}, {
					name: '修改密码'
				}],
				form: {
					phoneNumber: '',
					password: '',
				},
				formPassword: {
					password: '',
					rePassword: ''
				},
				codeTips: '获取验证码',
				// 第一个表单验证规则
				rules: {
					phoneNumber: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],
					password: [{
						required: true,
						message: '请输入6位验证码',
						len: 6,
						trigger: ['blur'],
					}]
				},
				rule1: {
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['blur'],
						}
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['blur'],
						}
					],
				},
				step: 0
			}
		},
		methods: {
			// 获取验证码
			getCode() {
				if (this.form.phoneNumber == '') return this.$u.toast('手机号码为空');
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					this.$http.httpRequest({
						url: '/user/code',
						method: 'POST',
						data: this.form.phoneNumber
					}).then((res) => {
						uni.hideLoading();
						this.$u.toast(res.data.message);
						this.$refs.uCode.start();
					}).catch((err) => {
						uni.hideLoading();
						this.$u.toast('网络错误');
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			loginByCode() {
				this.$refs.uForm.validate((valid) => {
					if (valid) {
						this.$http.httpRequest({
							url: "/user/loginByCode",
							method: "POST",
							data: this.form
						}).then((res) => {
							if (res.data.code == 200) {
								uni.setStorageSync('token', res.data.obj.token);
								this.step = 1;
							} else {
								this.$u.toast(res.data.message);
							}
						}).catch((err) => {
							this.$u.toast('网络错误');
						})
					}
				})
			},
			commit() {
				if (this.formPassword.password != this.formPassword.rePassword || this.formPassword.password == '') {
					this.$u.toast('两次密码不一致')
				} else {
					let findBackPassword = {
						phoneNumber: this.form.phoneNumber,
						password: this.md5(this.formPassword.password)
					}
					this.$http.httpTokenRequest({
						url: '/user/changePassword',
						method: 'POST',
						data: findBackPassword
					}).then((res)=>{
						this.$u.toast('修改成功，正在跳转登录...');
						uni.setStorage({
							key:'phone',
							data:this.form.phoneNumber
						})
						setTimeout(()=>{
							uni.navigateTo({
								url: '../login'
							});
						},1000)
					})
				}
			},
			codeChange(text) {
				this.codeTips = text;
			},
		},

		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm1.setRules(this.rule1);
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		padding: 0 20rpx;
	}

	label {
		margin-right: 20rpx;
	}
</style>
