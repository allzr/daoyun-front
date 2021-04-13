<template>
	<u-form :model="form" ref="uForm">
		<u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
		<u-form-item label="性别">
			<u-radio-group v-model="radio">
				<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
					{{ item.name }}
				</u-radio>
			</u-radio-group>
		</u-form-item>
		<u-form-item prop="phone" label="手机号">
			<u-input placeholder="请输入手机号" v-model="form.phone"></u-input>
		</u-form-item>
		<u-form-item prop="vcode" label="验证码">
			<u-input placeholder="请输入验证码" v-model="form.vcode"></u-input>
			<u-button @click="getVcode" size="mini" type="primary">获取验证码</u-button>
		</u-form-item>
	</u-form>
</template>

<script>
export default {
	data() {
		return {
			form: {
				phone:'',
				vcode:'',
				name: '',
				intro: '',
				sex: ''
			},
			radioList: [
				{
					name: '男',
					disabled: false
				},
				{
					name: '女',
					disabled: false
				}
			],
		};
	}
};
</script>
<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}
</style>
