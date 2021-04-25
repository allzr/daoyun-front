<template>
	<view class="wrap">
		<u-form :model="user" :rules="rules" ref="uForm">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="150"
				:label-position="labelPosition" label="用户名" prop="username">
				<u-input :border="border" placeholder="请输入姓名" v-model="user.username" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150"
				:label-position="labelPosition" label="真实姓名">
				<u-input :border="border" placeholder="请输入真实姓名" v-model="user.realName" type="text"></u-input>
			</u-form-item>

			

			<u-form-item :label-position="labelPosition" label="出生年份" label-width="150">
				<u-input :border="border" placeholder="请输入出生年份" prop="bornYear" v-model="user.bornYear" type="text"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="学校" label-width="150">
				<u-input :border="border" placeholder="请输入学校"  v-model="user.schoolName" type="text"></u-input>
			</u-form-item>
			
			<u-form-item :label-position="labelPosition" label="学院" label-width="150">
				<u-input :border="border" placeholder="请输入学院"  v-model="user.collegeName" type="text"></u-input>
			</u-form-item>
			
					
			<u-form-item :label-position="labelPosition" label="身份类别" label-width="150">
				<u-radio-group @change="radioGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
					<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>

			<u-form-item :label-position="labelPosition" label="用户性别" label-width="150">
				<u-radio-group @change="radioGroupChange1" :width="radioCheckWidth" :wrap="radioCheckWrap">
					<u-radio shape="circle" v-for="(item, index) in radioList1" :key="index" :name="item.name">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<u-toast ref="uToast" />
		<u-button @click="submit" type="primary">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				years: [],
				show: false,
				user: {
					bornYear: '2000',
					collegeName: null,
					phoneNumber: "17396510930",
					realName: null,
					schoolName: null,
					sex: 0,
					userType: 0,
					username: "",
				},
				agreement: false,
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
						},
						{
							min: 1,
							max: 5,
							message: '姓名长度在1到5个字符',
							trigger: ['blur'],
						},
					],
					bornYear:[{
						required:true,
						min:4,
						max:4,
						message:'请输入正确年份'
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

				radioList1: [{
						name: '男',
						checked: true,
						disabled: false
					},
					{
						name: '女',
						checked: false,
						disabled: false
					},
				],

				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				labelPosition: 'left',
			};
		},
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
				// this.$refs.uForm.validate(valid => {
				// 	if (valid) {
				// 		if (!this.agreement) return this.$u.toast('请勾选协议');
				// 		let registerForm = this.$u.deepClone(this.form);
				// 		registerForm.password = this.md5(registerForm.password);
				// 		registerForm.rePassword = this.md5(registerForm.rePassword);
				// 		this.$http.httpRequest({
				// 			url: '/user/register',
				// 			method: 'POST',
				// 			data: registerForm
				// 		}).then((res) => {
				// 			if (res.data.code == 200) {
				// 				uni.setStorage({
				// 					key: 'phone',
				// 					data: this.model.phoneNumber
				// 				})
				// 				this.$u.toast('注册成功，正在跳转登录...');
				// 				setTimeout(() => {
				// 					uni.navigateTo({
				// 						url: '../login'
				// 					});
				// 				}, 1000)
				// 			} else {
				// 				this.$u.toast(res.data.message);
				// 			}
				// 		})
				// 	} else {
				// 		this.$u.toast('网络错误')
				// 	}
				// });
			},
			radioGroupChange(e) {
				if (e == '老师') {
					this.user.userType = 2
				} else {
					this.user.userType = 1
				}
			},
			radioGroupChange1(e) {
				if (e == '男') {
					this.user.sex = 1
				} else {
					this.user.sex = 2
				}
			},
			confirm(e) {
				this.user.brithDay = String(e[0].label)
			}
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
