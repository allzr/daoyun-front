<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120"
				:label-position="labelPosition" label="姓名" prop="username">
				<u-input :border="border" placeholder="请输入姓名" v-model="model.username" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password"
					placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
				<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="身份类别" prop="userType" label-width="150">
				<u-radio-group @change="radioGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
					<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">
						{{ item.name }}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai"
				:label-position="labelPosition" label="手机号码" prop="phoneNumber" label-width="150">
				<u-input :border="border" placeholder="请输入手机号" v-model="model.phoneNumber" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="验证码" prop="code" label-width="150">
				<u-input :border="border" placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
		</u-form>
		<view class="agreement">
			<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
			<view class="agreement-text">
				勾选代表同意到云的版权协议
			</view>
		</view>
		<u-button @click="submit" type="primary">提交</u-button>
		<u-verification-code seconds="60" ref="uCode"  @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				model: {
					username: "",
					password: "",
					rePassword: "",
					phoneNumber: "",
					userType: 1,
					code:'',
					agreement:false
				},
				verfy:{
					code:'',
					canUse:false
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 5,
							message: '姓名长度在3到5个字符',
							trigger: [ 'blur'],
						},
					],
					phoneNumber: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: [ 'blur'],
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
							trigger: [ 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不相等',
							trigger: [ 'blur'],
						}
					],
					code:[{
						required: true,
						message: '请输入6位验证码',
						size:6,
						trigger: [ 'blur'],
					}]
				},
				border: false,
				check: false,
				radioList: [{
						name: '老师',
						checked: true,
						disabled: false
					},
					{
						name: '学生',
						checked: false,
						disabled: false
					},
				],
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				labelPosition: 'left',
				codeTips: '获取验证码',
			};
		},
		onLoad() {},
		computed: {
			borderCurrent() {
				return this.border ? 0 : 1;
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (!this.model.agreement) return this.$u.toast('请勾选协议');
						if (!this.verfy.canUse ) return this.$u.toast('验证码过期');
						if (this.verfy.code != this.model.code) return this.$u.toast('验证码错误');
						
						this.$http.httpRequest({
							url:'/user/register',
							method:'POST',
							data:this.model
						}).then((res)=>{
							console.log(res.data);
						}).catch((err)=>{
							
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			// checkbox选择发生变化
			checkboxGroupChange(e) {
				this.model.likeFruit = e;
			},
			// 勾选版权协议
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			codeChange(text) {
				this.codeTips = text;
			},
			radioGroupChange(e){
				if (e == '老师'){
					this.model.userType = 2
				}else{
					this.model.userType = 1
				}
			},
			// 获取验证码
			getCode() {
				if (this.model.phoneNumber == '') return this.$u.toast('手机号码为空');
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					this.$http.httpRequest({
						url:'/user/code',
						method:'POST',
						data:this.model.phoneNumber
					}).then((res)=>{
						console.log(res)
						this.verfy.code = res.data.obj;
						console.log(this.verfy.code);
						this.verfy.canUse = true
					})
					setTimeout(()=>{
						this.verfy.canUse = false
					},60000)
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1500);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
		}
	};
</script>

<style scoped lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.wrap {
		padding: 30rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
