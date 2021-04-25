<template>
	<view>
		<web-view :src="url" ></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"https://github.com/login/oauth/authorize?client_id=601c024ea0657ca6cb13",
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
