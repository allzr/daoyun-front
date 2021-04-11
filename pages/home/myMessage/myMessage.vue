<template>
	<view>
		<view class="header">
			<view class="touxiang">
				<u-avatar :src="src" mode="square" size="120"></u-avatar>
				<view class="name">
					<view>{{user.name}}</view>
					<view>{{user.phone}}</view>
				</view>
			</view>
			<view>
				<view>
					<u-cell-item arrow-direction="right"></u-cell-item>
				</view>
			</view>
		</view>
		<u-select v-model="show" :list="years" @confirm="confirm"></u-select>
		<view class="setting">
			<u-cell-group>
				<u-cell-item class="line" title="姓名" :arrow="false"><input v-model="user.name"></u-cell-item>
				<u-cell-item class="line" title="昵称" :arrow="false"><input v-model="user.name"></u-cell-item>
				<u-cell-item class="line" title="出生年份" :arrow="false"> <text
						@click="show = true">{{user.brithDay}}</text></u-cell-item>
			</u-cell-group>
			<u-cell-group class="line" style="margin-top: 20rpx;">
				<u-cell-item class="line" @click="shownan = false" title="男" :arrow="false">
					<u-icon v-show="!shownan" color="#58C3e0" name="checkbox-mark"></u-icon>
				</u-cell-item>
				<u-cell-item class="line" @click="shownan = true" title="女" :arrow="false">
					<u-icon v-show="shownan" color="#58C3e0" name="checkbox-mark"></u-icon>
				</u-cell-item>
			</u-cell-group>
			<u-cell-group class="line" style="margin-top: 20rpx;">
				<u-cell-item class="line" @click="showstudent = false" title="我是学生" :arrow="false">
					<u-icon v-show="!showstudent" color="#58C3e0" name="checkbox-mark"></u-icon>
				</u-cell-item>
				<u-cell-item class="line" @click="showstudent = true" title="我是老师" :arrow="false">
					<u-icon v-show="showstudent" color="#58C3e0" name="checkbox-mark"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view>
			<u-button type="success" style="margin-top: 20rpx;">提交修改</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			this.years = [];
			for (let i = 0; i < 60; i++) {
				this.years.push({
					value: i,
					label: year - i
				});
			}
		},
		data() {
			return {
				src: '/static/logo.png',
				
				user: {
					phone:"17396510930",
					name: "陈发荣",
					nickName: "摇井",
					brithDay: "1998",
					sex: "男",
				},
				shownan: true,
				showstudent: true,
				show: false,
				years: []
			}
		},
		methods: {
			confirm(e) {
				console.log(String(e[0].label))
				this.user.brithDay = String(e[0].label)
			}
		}
	}
</script>

<style lang="scss">
	.header {
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0rpx 20rpx 20rpx;

		.touxiang {
			display: flex;
			align-items: center;

			.name {
				margin-left: 30rpx;
				display: flex;
				flex-direction: column;
				align-items: stretch;
			}
		}
	}
</style>
