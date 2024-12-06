<template>
	<view>
	
		<view v-if="userInfo.phone">用户：{{userInfo.phone}}</view>
		<button v-else @tap="goLogin">去登陆</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>

</style>
