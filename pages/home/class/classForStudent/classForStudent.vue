<template>
	<view>
		<view class="u-page">
			<view v-if="current == 0">
				<u-cell-group>
					<u-cell-item class="line" style="border-top: #E4E7ED solid 0.1rpx;" title="班课号" :arrow="false">
						{{cource.classID}}</u-cell-item>
					<u-cell-item class="line" title="课程名" :arrow="false">{{cource.className}}</u-cell-item>
					<u-cell-item class="line" title="学校" :arrow="false">{{cource.schoolName}}</u-cell-item>
					<u-cell-item class="line" title="学院" :arrow="false">{{cource.collegeName}}</u-cell-item>
					<u-cell-item class="line" title="主讲老师" :arrow="false">{{cource.teacherName}}</u-cell-item>
					<u-cell-item class="line" style="border-bottom: #E4E7ED solid 0.1rpx;" title="开课时间" :arrow="false">
						{{cource.createTime}}</u-cell-item>
				</u-cell-group>
			</view>
			<view v-if="current == 1">
				<view class="sign">
					<view @click="sign" class="button">签到</view>
				</view>
			</view>
			<view v-if="current == 2">
				<view>
					<u-cell-group>
						<view v-for="(item,idx) in students" :key='idx' style="border-top: #CCCCCC 0.1rpx solid;">
							<u-cell-item class="line" icon="account-fill" :title="item.username">
								学号:{{item.studentNumber}}&nbsp&nbsp&nbsp&nbsp&nbsp经验:{{item.EXP}}</u-cell-item>
						</view>
					</u-cell-group>
				</view>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list"></u-tabbar>
		<u-modal v-model="show1" title="签到成功" content="获得2积分"></u-modal>
		<u-modal v-model="show2" title="签到失败" content="位置里老师太远"></u-modal>
		<u-modal v-model="show3" title="签到失败" content="时间过期"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.cource.classID = option.classID;
			this.signMsg.teaCouID = option.id
			this.$api.getClassStudents(this.cource.classID).then(data => {
				this.students = data
			})
			this.$api.classDetail(this.cource.classID).then(data => {
				this.cource.teacherName = data.teacherName
				this.cource.createTime = data.createTime
				var msg = data.className.split('-')
				this.cource.className = msg[0]
				this.cource.schoolName = msg[1]
				this.cource.collegeName = msg[2]
			})
		},
		data() {
			return {
				list: [{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '信息',
						customIcon: false,
					},
					{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '主页',
						customIcon: false,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '成员',
						customIcon: false,
					},
				],
				current: 0,
				show1: false,
				show2: false,
				show3: false,
				id: '',
				cource: {
					classID: '',
					teacherName: "",
					createTime: "",
					className: "",
					schoolName: '',
					collegeName: ''
				},
				students: [],
				signMsg: {
					locationX: '',
					locationY: '',
					teaCouID: 0,
					time: 0,
					userID: 0
				}
			}
		},
		methods: {
			sign() {
				this.signMsg.userID = this.$user.getUserId()
				this.$api.getLocal().then(
					(res) => {
						this.signMsg.locationX = res.locationX
						this.signMsg.locationY = res.locationY
						this.$api.studentSign(this.signMsg).then(res => {
							this.show1 = true;
						})
					}
				).catch(err => {
					this.showToastFault("位置获取失败")
				})
			},
			showToast(message) {
				this.$refs.uToast.show({
					title: message,
					type: 'success',
					position: 'center'
				})
			},
			showToastFault(message) {
				this.$refs.uToast.show({
					title: message,
					type: 'error',
					position: 'center'
				})
			}
		}
	}
</script>

<style lang="scss">
	.sign {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 800rpx;

		.button {
			font-size: 50rpx;
			width: 300rpx;
			height: 300rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $daoyun-main;
		}
	}
</style>
