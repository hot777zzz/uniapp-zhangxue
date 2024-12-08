<template>
	<view class="profile-container">
		<form @submit="handleSubmit">
			<!-- 用户名 -->
			<view class="form-item">
				<text class="label required">用户名</text>
				<input class="input" type="text" v-model="formData.username" placeholder="请输入用户名" />
			</view>
			
			<!-- 称呼 -->
			<view class="form-item">
				<text class="label required">您的称呼</text>
				<text class="sub-label">(上牌人姓名)</text>
				<input class="input" type="text" v-model="formData.realName" placeholder="请输入上牌人姓名" />
			</view>
			
			<!-- 身份证号 -->
			<view class="form-item">
				<text class="label required">身份证号</text>
				<text class="sub-label">(上牌人身份证号)</text>
				<input class="input" type="idcard" v-model="formData.idCard" placeholder="请输入身份证号" maxlength="18" />
			</view>
			
			<!-- 联系方式 -->
			<view class="form-item">
				<text class="label required">联系方式</text>
				<input class="input" type="number" v-model="formData.phone" placeholder="请输入手机号码" maxlength="11" />
			</view>
			
			<!-- 提交按钮 -->
			<button class="submit-btn" form-type="submit">保存</button>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				username: '',
				realName: '',
				idCard: '',
				phone: ''
			}
		}
	},
	onLoad() {
		// 获取已有的用户信息
		const userInfo = uni.getStorageSync('userInfo')
		if(userInfo) {
			this.formData = {
				...this.formData,
				...userInfo
			}
		}
	},
	methods: {
		// 验证身份证号
		validateIdCard(idCard) {
			const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			return reg.test(idCard)
		},
		
		handleSubmit() {
			// 表单验证
			if(!this.formData.username.trim()) {
				uni.showToast({
					title: '请输入用户名',
					icon: 'none'
				})
				return
			}
			
			if(!this.formData.realName.trim()) {
				uni.showToast({
					title: '请输入上牌人姓名',
					icon: 'none'
				})
				return
			}
			
			if(!this.validateIdCard(this.formData.idCard)) {
				uni.showToast({
					title: '请输入正确的身份证号',
					icon: 'none'
				})
				return
			}
			
			if(!/^1[3-9]\d{9}$/.test(this.formData.phone)) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none'
				})
				return
			}
			
			// TODO: 调用更新用户信息接口
			console.log('更新的用户信息：', this.formData)
			
			// 临时保存到本地
			const userInfo = uni.getStorageSync('userInfo') || {}
			uni.setStorageSync('userInfo', {
				...userInfo,
				...this.formData
			})
			
			uni.showToast({
				title: '保存成功',
				icon: 'success',
				success: () => {
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}
			})
		}
	}
}
</script>

<style>
.profile-container {
	padding: 30rpx;
}

.form-item {
	margin-bottom: 30rpx;
}

.label {
	display: block;
	font-size: 28rpx;
	color: #333;
	margin-bottom: 10rpx;
}

.sub-label {
	font-size: 24rpx;
	color: #999;
	margin-left: 10rpx;
}

.required::before {
	content: '*';
	color: #ff4d4f;
	margin-right: 4rpx;
}

.input {
	width: 100%;
	height: 80rpx;
	background-color: #f8f8f8;
	border-radius: 8rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
}

.submit-btn {
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	background-color: #007AFF;
	color: #ffffff;
	font-size: 32rpx;
	border-radius: 44rpx;
	margin-top: 60rpx;
}

.submit-btn:active {
	opacity: 0.8;
}
</style>