<template>
	<view class="me-container">
		<!-- 用户信息区域 -->
		<view class="user-section">
			<view class="avatar-wrap">
				<image class="avatar" src="/static/images/default-avatar.png"></image>
			</view>
			<view v-if="userInfo.phone" class="user-info">
				<text class="username">{{userInfo.nickname || userInfo.phone}}</text>
				<text class="points">积分: {{userInfo.points || 0}}</text>
			</view>
			<view v-else class="login-btn-wrap">
				<button class="login-btn" @tap="goLogin">登录/注册</button>
			</view>
		</view>

		<!-- 订单区域 -->
		<view class="order-section section-card">
			<view class="section-title">我的订单</view>
			<view class="order-grid">
				<view class="order-item" @tap="navigateTo('/pages/me/orders/motorcycle.vue')">
					<image class="order-icon" src="/static/images/motorcycle.png"></image>
					<text>购车订单</text>
				</view>
				<view class="order-item" @tap="navigateTo('/pages/index/detail/testDrive/testDrive')">
					<image class="order-icon" src="/static/images/test-drive.png"></image>
					<text>试驾预约</text>
				</view>
				<view class="order-item" @tap="navigateTo('/pages/me/orders/maintenance.vue')">
					<image class="order-icon" src="/static/images/maintenance.png"></image>
					<text>维修保养</text>
				</view>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="function-list">
			<view class="section-card" @tap="navigateTo('./completeProfile/completeProfile')" v-if="userInfo.phone">
				<view class="list-item">
					<text>完善资料</text>
					<text class="arrow">></text>
				</view>
			</view>

			<view class="section-card">
				<view class="list-item" @tap="navigateTo('/pages/me/points/points')" v-if="userInfo.phone">
					<text>积分中心</text>
					<view class="item-right">
						<text class="points-num">{{userInfo.points || 0}}分</text>
						<text class="arrow">></text>
					</view>
				</view>
			</view>

			<view class="section-card">
				<view class="list-item" @tap="showCustomerService">
					<text>客服热线</text>
					<text class="arrow">></text>
				</view>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="logout-wrap" v-if="userInfo.phone">
			<button class="logout-btn" @tap="handleLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			customerServicePhone: '400-888-8888'
		}
	},
	onShow() {
		this.getUserInfo()
	},
	methods: {
		getUserInfo() {
			const userInfo = uni.getStorageSync('userInfo')
			if(userInfo) {
				this.userInfo = userInfo
			}
		},
		goLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		navigateTo(url) {
			if(!this.userInfo.phone && url !== '/pages/login/login') {
				uni.showModal({
					title: '提示',
					content: '请先登录后继续操作',
					confirmText: '去登录',
					success: (res) => {
						if(res.confirm) {
							this.goLogin()
						}
					}
				})
				return
			}
			uni.navigateTo({
				url: url
			})
		},
		showCustomerService() {
			uni.showModal({
				title: '客服热线',
				content: this.customerServicePhone,
				confirmText: '拨打',
				success: (res) => {
					if(res.confirm) {
						uni.makePhoneCall({
							phoneNumber: this.customerServicePhone
						})
					}
				}
			})
		},
		handleLogout() {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: (res) => {
					if(res.confirm) {
						uni.removeStorageSync('userInfo')
						this.userInfo = {}
						uni.showToast({
							title: '已退出登录',
							icon: 'success'
						})
					}
				}
			})
		}
	}
}
</script>

<style>
.me-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 30rpx;
}

.user-section {
	background-color: #007AFF;
	padding: 40rpx 30rpx;
	display: flex;
	align-items: center;
}

.avatar-wrap {
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	overflow: hidden;
	margin-right: 30rpx;
	border: 4rpx solid rgba(255,255,255,0.3);
}

.avatar {
	width: 100%;
	height: 100%;
}

.user-info {
	color: #ffffff;
}

.username {
	font-size: 32rpx;
	font-weight: 500;
	margin-bottom: 10rpx;
	display: block;
}

.points {
	font-size: 24rpx;
	opacity: 0.9;
}

.login-btn {
	background: none;
	border: 2rpx solid #ffffff;
	color: #ffffff;
	font-size: 28rpx;
	padding: 10rpx 40rpx;
	border-radius: 30rpx;
}

.section-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	margin: 20rpx;
	padding: 20rpx;
}

.section-title {
	font-size: 28rpx;
	font-weight: 500;
	margin-bottom: 20rpx;
}

.order-grid {
	display: flex;
	justify-content: space-around;
}

.order-item {
	text-align: center;
	padding: 10rpx;
}

.order-icon {
	width: 60rpx;
	height: 60rpx;
	margin-bottom: 10rpx;
}

.order-item text {
	font-size: 24rpx;
	color: #333;
}

.list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	font-size: 28rpx;
}

.item-right {
	display: flex;
	align-items: center;
}

.points-num {
	font-size: 26rpx;
	color: #666;
	margin-right: 10rpx;
}

.arrow {
	color: #999;
	margin-left: 10rpx;
}

.logout-wrap {
	margin: 60rpx 20rpx;
}

.logout-btn {
	background-color: #ffffff;
	color: #ff4d4f;
	font-size: 28rpx;
}
</style>
