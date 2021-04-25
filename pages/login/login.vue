<template>
	<view class="login">
		<view class="header">
			<u-subsection class="section" :list="list" :current="curNar" style="padding: 0rpx;" buttonColor="#58C3E0"
				@change="sectionChange" :animation="true"></u-subsection>
		</view>

		<view class="body">
			<view class="login-message" v-show="curNar == 0">
				<u-form :model="form" ref="uForm">
					<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai"
						label="手机号" prop="phoneNumber" label-width="150">
						<u-input placeholder="请输入手机号" v-model="form.phoneNumber" type="number"></u-input>
					</u-form-item>
					<u-form-item label="验证码" prop="password" label-width="150">
						<u-input placeholder="请输入验证码" v-model="form.password" type="text"></u-input>
						<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
					</u-form-item>
					<u-button @click="loginByCode" style="color: #58C3E0;">登录</u-button>
				</u-form>
			</view>
			<view class="login-password" v-show="curNar == 1">
				<u-form :model="form1" ref="uForm1">
					<u-form-item prop="phoneNumber" label="账号" label-width="150"
						:rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai">
						<u-input placeholder="账号 邮箱 手机号" v-model="form1.phoneNumber"></u-input>
					</u-form-item>
					<u-form-item prop="password" label="密码" label-width="150">
						<u-input placeholder="请输入密码" type="password" v-model="form1.password"></u-input>
					</u-form-item>
					<u-button @click="loginByPassword" style="color: #58C3E0;">登录</u-button>
				</u-form>
			</view>
			<view class="other">
				<text class="regist" @click="register">注册新账号</text>
				<text class="findpwd" @click="findpwd">找回密码</text>
			</view>
			<view>
				
			</view>
			<u-toast ref="uToast" />
		</view>
		<!-- <navigator url="./loginGithub/loginGithub">访问官网</navigator> -->
		<a href="https://github.com/login/oauth/authorize?client_id=601c024ea0657ca6cb13">github</a>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
		
</template>

<script>
	export default {
		data() {
			return {
				remberme: false,
				title: 'Hello',
				list: [{
					name: "短信登陆"
				}, {
					name: "密码登录"
				}],
				curNar: 0,

				// 第一个表单数据验证
				form: {
					phoneNumber: '',
					password: '',
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
				form1: {
					phoneNumber: '',
					password: ''
				},
				// 第二个表单验证规则
				rules1: {
					phoneNumber: [{
						required: true,
						message: '请输账号',
						trigger: ['blur'],
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: ['blur'],
					}]
				},
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
							if (res.data.code == 200 || res.data.code == 202) {
								this.showToast("登录成功");
								uni.setStorageSync('token',res.data.obj.token);
								uni.setStorage({
									key:'phone',
									data:this.form.phoneNumber
								})
								this.getUserMessage(this.form.phoneNumber);
								let onR = {UserMessageSetting:true}
								uni.setStorage({
									key:'info',
									data:onR
								})
								uni.switchTab({
									url: '../home/home'
								});
							}else{
								this.$u.toast(res.data.message);
							}
						}).catch((err)=>{
							this.$u.toast('网络错误');
						})
					}
				})
			},
			 loginByPassword() {
				this.$refs.uForm1.validate((valid) => {
					if (valid) {
						let loginForm = this.$u.deepClone(this.form1);
						loginForm.password = this.md5(loginForm.password);
						this.$http.httpRequest({
							url: "/user/loginByPassword",
							method: "POST",
							data: loginForm
						}).then((res) => {
							if (res.data.code == 200) {
								uni.setStorageSync('token',res.data.obj.token);
								uni.setStorage({
									key:'phone',
									data:loginForm.phoneNumber
								})
								this.getUserMessage(this.form1.phoneNumber);
								uni.switchTab({
									url: '../home/home'
								});
							} else {
								this.$u.toast(res.data.message);
							}
						}).catch((err)=>{
							this.$u.toast('网络错误');
						})
					}
				})
			},
			sectionChange(index) {
				this.curNar = index
				this.$emit('navselect', {
					index: index
				})
			},
			codeChange(text) {
				this.codeTips = text;
			},
			register() {
				uni.navigateTo({
					url: "./register/register"
				});
			},
			findpwd() {
				uni.navigateTo({
					url: "./findpwd/findpwd"
				})
			},
			showToast(message) {
				this.$refs.uToast.show({
					title: message,
					type: 'success',
					position: 'bottom'
				})
			},
			getUserMessage(phoneNumber){
				let ul =  "/user/info/"+phoneNumber;
				this.$http.httpTokenRequest({
					url:ul,
					method: "GET",
					data:''
				}).then((res)=>{
					console.log(res)
					uni.setStorageSync('user',res.data.obj)
				})
			},
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm1.setRules(this.rules1);
			this.form.phoneNumber = uni.getStorageSync('phone');
			this.form1.phoneNumber = this.form.phoneNumber;
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.login {
		width: 100%;
		position: absolute;
		top: 20%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.header {
			width: 80%;
			margin-bottom: 50rpx;
		}

		.body {
			width: 80%;
		}
	}

	label {
		margin-right: 20rpx;
	}

	.other {
		margin-top: 30rpx;

		.regist {
			color: $daoyun-main;
			float: left;
		}

		.findpwd {
			color: $daoyun-main;
			float: right;
		}
	}
</style>
