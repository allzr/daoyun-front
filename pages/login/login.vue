<template>
	<view class="login">
		<view>
			<u-subsection :list="list" :current="curNar" style="padding: 0rpx;" buttonColor="#58C3E0"
				@change="sectionChange" :animation="true"></u-subsection>
		</view>

		<view class="body">
			<view class="login-message" v-show="curNar == 0">
				<u-form :model="form" ref="uForm">
					<u-form-item prop="phone">
						<label>手机号</label>
						<u-input placeholder="请输入手机号" v-model="form.phone"></u-input>
					</u-form-item>
					<u-form-item prop="vcode">
						<label>验证码</label>
						<u-input placeholder="请输入验证码" v-model="form.vcode"></u-input>
						<u-button @click="getVcode" size="mini" style="color: #58C3E0;">获取验证码</u-button>
					</u-form-item>
					<u-button @click="login" style="color: #58C3E0;">登录</u-button>
				</u-form>
			</view>
			<view class="login-password" v-show="curNar == 1">
				<u-form>
					<u-form-item>
						<label>用户名</label>
						<u-input placeholder="请输入用户名"></u-input>
					</u-form-item>
					<u-form-item>
						<label>密&#12288码 </label>
						<u-input placeholder="请输入密码" type="password"></u-input>
					</u-form-item>
					<u-button @click="login" style="color: #58C3E0;">登录</u-button>
				</u-form>
			</view>
			<view class="other">
				<text class="regist" @click="register">注册新账号</text>
				<text class="findpwd" @click="findpwd">找回密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list: [{
					name: "短信登陆"
				}, {
					name: "密码登录"
				}],
				curNar: 0,

				// 第一个表单数据验证
				form: {
					phone: '',
					vcode: '',
				},
				// 第一个表单验证规则
				rules: {
					phone: [{
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
					vcode: [{
							required: true,
							message: '请输入6位验证码',
							len:6,
							trigger: ['blur'],
						}
					]
				}
			}
		},
		onLoad() {

		},
		methods: {
			login() {
				uni.setStorage({
					key: 'token',
					data: 'hastoken'
				});
				uni.switchTab({
					url: '../home/home'
				})
			},
			sectionChange(index) {
				this.curNar = index
				this.$emit('navselect', {
					index: index
				})
			},
			register() {
				uni.navigateTo({
					url: "../register/register",
				});
			},
			findpwd() {
				console.log("zhaomima")
			}

		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	.login {
		width: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -80%);
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
