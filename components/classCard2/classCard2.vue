<template>
	<view class="classsCard2" @click="classDetail">
		<view class="picture">
			<u-avatar :src="src" mode="square" size="140"></u-avatar>
		</view>
		<view class="message">
			<view style="font-size: 40rpx; font-weight: bolder;" >
				{{className}}
			</view>
			<view class="classDetail" >
				<view style="float: left;">{{teacherName}}</view>
				<view style="float: righ; color: #606060;">{{createTime}}</view>
			</view>
		</view>
		<view>
			<u-cell-item arrow-direction="right"></u-cell-item>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			className:"",
			teacherName:"",
			createTime:""
		},
		data() {
			return {
				src: '/static/logo.png',
				
			};
		},
		methods:{
			sign(){
				this.show = true;
			},
			click(index){
				console.log(index);
			},
			classDetail(){
				uni.navigateTo({
					url:"../../pages/home/class/classForTeacher/classForTeacher"
				})
			}
		}
	}
</script>

<style lang="scss">
		.classsCard2 {
			display: flex;
			height: 230rpx;
			justify-content: space-between;
			align-items: center;
			padding-left: 30rpx;

			.message {
				display: flex;
				flex-direction: column;
				align-items: stretch;
				width: 50%;
				.classDetail{
					display: flex;
					justify-content: space-between;
					margin-top: 10rpx;
				}
				.operate {
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
				}
			}
		}
</style>
