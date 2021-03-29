<template>
	<view>
		<view class="header">
			<view class="touxiang">
				<u-avatar :src="src" mode="square" size="120"></u-avatar>
			</view>
			<view class="message">
				<view class="name">
					{{name}}
				</view>
				
				<view class="id">
					<!-- <text>到云账号 : {{id}}</text> -->
					<!-- <u-icon name="arrow-right" style="margin-left: 20rpx;" @click="changeMessgage" ></u-icon> -->
					<view class="cloud">
						到云账号 : {{id}}
					</view>
					<view>
						<u-cell-item arrow-direction="right"></u-cell-item>
					</view>
				</view>
			</view>
		</view>

		<view class="setting">
			<u-cell-group>
				<u-cell-item icon="order" title="用户协议" :arrow="true" arrow-direction="right"></u-cell-item>
				<u-cell-item icon="lock" title="隐私政策" :arrow="true" arrow-direction="right"></u-cell-item>
				<u-cell-item icon="setting" title="设置" :arrow="true" arrow-direction="right"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>

	export default {
			data() {
				return {
					src: '/static/logo.png',
					name:"小发",
					id:"825655513"
				}
			}
		}
</script>

<style lang="scss">
	page{
		background-color: #F0F0F0;
	}
	.header{
		width: 100%;
		height: 300rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.touxiang{
			transform: translate(100%,10%);
		}
		.message{
			transform: translate(0,10%);
			margin-left: 40rpx;
			.name{
				font-size: 50rpx;
				font-weight: bold;
				transform: translate(0,10%);
			}
			.id{
				color: #606060; 
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
	.setting{
		margin-top: 20rpx;
	}
</style>
