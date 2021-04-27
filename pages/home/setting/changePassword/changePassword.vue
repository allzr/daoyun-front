<template>
	<view>
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
</template>

<script>
	export default {
		data() {
			return {
				formPassword: {
					password: '',
					rePassword: ''
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
			}
		},
		methods: {
			commit() {
				if (this.formPassword.password == '') {
					this.$u.toast('密码不能为空')
				} else if (this.formPassword.password != this.formPassword.rePassword) {
					this.$u.toast('两次密码不一致')
				} else {
					let phone = uni.getStorageSync('phone')
					let findBackPassword = {
						phoneNumber: phone,
						password: this.md5(this.formPassword.password)
					}
					this.$http.httpTokenRequest({
						url: '/user/changePassword',
						method: 'POST',
						data: findBackPassword
					}).then((res) => {
						this.$u.toast('修改成功');
						uni.removeStorage({
							key: 'info'
						})
						uni.switchTab({
							url: '../../home'
						})

					})
				}
			},
			codeChange(text) {
				this.codeTips = text;
			},
		},

		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
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
