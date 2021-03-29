<template>
	<view>
		<navbar @navselect="navselect"></navbar>
		<view v-if="index == 0">
			<text> 你还没有创建班课 </text>
		</view>
		<view v-if="index == 1">
			<text> 你还没有加入班课 </text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			var loginRes = this.checkLogin();
			if (!loginRes) {
				return false;
			}
		},
		data() {
			return {
				index: 0,
			}
		},
		methods: {
			navselect({index}) {
				this.index = index
			}
		}
	}
</script>

<style>

</style>
