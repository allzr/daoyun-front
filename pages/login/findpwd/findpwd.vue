<template>
	<view>
		<view>
			<u-steps :list="numList" :current="step"></u-steps>
		</view>
		<view  v-show="step == 0">
			<u-form :model="form">
				<u-form-item prop="phone">
					<label>手机号</label>
					<u-input placeholder="请输入手机号" v-model="form.phone"></u-input>
				</u-form-item>
				<u-form-item prop="vcode">
					<label>验证码</label>
					<u-input placeholder="请输入验证码" v-model="form.vcode"></u-input>
					<u-button @click="getVcode" size="mini" :disabled="disabled">{{yzmTitle}}</u-button>
				</u-form-item>
				<u-button @click="checkVcode" type="primary">验证</u-button>
			</u-form>
		</view>
		<view  v-show="step == 1">
			<u-form :model="form">
				<u-form-item prop="phone">
					<label>新密码</label>
					<u-input placeholder="输入新密码" v-model="form.phone"></u-input>
				</u-form-item>
				<u-form-item prop="vcode">
					<label>确认码</label>
					<u-input placeholder="再次输入新密码" v-model="form.vcode"></u-input>
				</u-form-item>
				<u-button @click="commit" type="primary">提交修改</u-button>
			</u-form>
		</view>
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
				step: 0,
				disabled: false,
				yzmTitle: "获取验证码",
				form: {
					phone: '',
					vcode: '',
				},
			}
		},
		methods: {
			validateBtn() {
				//倒计时
				let time = 60	
				this.yzmTitle = time + "秒后重试";
				let timer = setInterval(() => {
					if (time == 0) {
						clearInterval(timer);
						this.disabled = false;
						this.yzmTitle = "获取验证码";
					} else {
						this.yzmTitle = time + "秒后重试";
						time--;
					}
				}, 1000);
			},
			getVcode() {
				this.disabled = true;
				this.validateBtn();	
			},
			checkVcode(){
				this.step+=1;
			},
			commit(){
				
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		padding: 0 20rpx;
	}
	
	label{
		margin-right: 20rpx;
	}
</style>
