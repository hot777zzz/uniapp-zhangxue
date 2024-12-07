<template>
	<view class="register-container">
		<form @submit="handleSubmit">
			<!-- 手机号 -->
			<view class="form-item">
				<text class="label required">手机号</text>
				<input class="input" type="number" v-model="formData.phone" placeholder="请输入手机号码" maxlength="11" />
			</view>
			
			<!-- 验证码 -->
			<view class="form-item code-item">
				<text class="label required">验证码</text>
				<view class="code-input-wrap">
					<input class="input code-input" type="number" v-model="formData.code" placeholder="请输入验证码" maxlength="6" />
					<button class="code-btn" :disabled="counting" @tap="handleSendCode">
						{{ counting ? `${countdown}s后重新获取` : '获取验证码' }}
					</button>
				</view>
			</view>
			
			<!-- 密码 -->
			<view class="form-item">
				<text class="label required">密码</text>
				<input class="input" type="password" v-model="formData.password" placeholder="请输入密码" />
			</view>
			
			<!-- 确认密码 -->
			<view class="form-item">
				<text class="label required">确认密码</text>
				<input class="input" type="password" v-model="formData.confirmPassword" placeholder="请再次输入密码" />
			</view>
			
			<!-- 注册按钮 -->
			<button class="submit-btn" form-type="submit">注册</button>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				phone: '',
				code: '',
				password: '',
				confirmPassword: ''
			},
			counting: false,
			countdown: 60
		}
	},
	methods: {
		// 发送验证码
		handleSendCode() {
			if(!/^1[3-9]\d{9}$/.test(this.formData.phone)) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none'
				})
				return
			}
			
			// TODO: 调用发送验证码接口
			console.log('发送验证码到：', this.formData.phone)
			
			// 开始倒计时
			this.counting = true
			this.countdown = 60
			
			const timer = setInterval(() => {
				this.countdown--
				if(this.countdown <= 0) {
					clearInterval(timer)
					this.counting = false
				}
			}, 1000)
			
			uni.showToast({
				title: '验证码已发送',
				icon: 'success'
			})
		},
		
		// 提交注册
		handleSubmit() {
			// 表单验证
			if(!/^1[3-9]\d{9}$/.test(this.formData.phone)) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none'
				})
				return
			}
			
			if(!/^\d{6}$/.test(this.formData.code)) {
				uni.showToast({
					title: '请输入6位验证码',
					icon: 'none'
				})
				return
			}
			
			if(this.formData.password.length < 6) {
				uni.showToast({
					title: '密码不能少于6位',
					icon: 'none'
				})
				return
			}
			
			if(this.formData.password !== this.formData.confirmPassword) {
				uni.showToast({
					title: '两次输入的密码不一致',
					icon: 'none'
				})
				return
			}
			
			// TODO: 调用注册接口
			console.log('注册信息：', this.formData)
			
			uni.showToast({
				title: '注册成功',
				icon: 'success',
				success: () => {
					// 注册成功后延迟跳转到登录页
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
.register-container {
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

.code-item .code-input-wrap {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.code-input {
	flex: 1;
}

.code-btn {
	width: 200rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 26rpx;
	color: #007AFF;
	background-color: #f8f8f8;
	border-radius: 8rpx;
	padding: 0;
}

.code-btn[disabled] {
	color: #999;
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
