<template>
	<view>
		<view class="header">
			<navbar @navselect="navselect" @banke="banke"></navbar>
		</view>

		<view class="body">
			<view>
				<u-search placeholder="请输入课程名称" v-model="keyword"></u-search>
			</view>
			<view v-if="index == 0">
				<classCard2 :className="className" :teacherName="teacherName" :createTime="createTime"></classCard2>
			</view>
			<view v-if="index == 1">
				<classCard :className="className" :teacherName="teacherName" :createTime="createTime"></classCard>
			</view>
		</view>
		<u-modal v-model="showPop" title="加入班课" show-cancel-button @cancel="cancelPop" @confirm="confirmPop">
			<view class="slot-content">
				<view>
					<input type='text' placeholder="请输入班课号" v-model="classid" />
				</view>
			</view>
		</u-modal>

		<u-modal v-model="showPop1" title="创建班课" show-cancel-button @cancel="cancelPop1" @confirm="confirmPop1">
			<view class="slot-content">
				<br>
				<view>
					<input type='text' placeholder="请输入班课名称" v-model="form.className">
				</view>
				<br>
				<view>
					<input type='text' placeholder="请输入开始时间" v-model="form.createTime">
				</view>
				<br>
			</view>
		</u-modal>

	</view>
</template>
<script>
	export default {
		onLoad() {
			this.checkLogin();
		},
		data() {
			return {
				index: 0,
				keyword: '',
				className: "工程训练",
				teacherName: "老池",
				createTime: "2021-01",
				showPop: false,
				showPop1: false,
				classid: '',
				form: {
					className: '',
					createTime: '',
				}
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
				uni.showToast({
					title: "刷新成功",
					duration: 500
				})
			}, 1000)
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
				} else if (index == 0) {
					this.showPop1 = true
				} else {
					uni.scanCode({
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							this.$u.toast(res.result);
							console.log('条码内容：' + res.result);
						}
					});
				}
			},
			confirmPop() { //确定
				console.log(this.classid)

			},
			confirmPop1() { //确定
				console.log(this.classid)
			},

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
</style>
