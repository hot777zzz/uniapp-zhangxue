<template>
	<view class="login-container">
		<view class="login-header">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
			<text class="title">张雪机车</text>
		</view>
		
		<!-- 登录方式切换 -->
		<view class="login-type">
			<view class="type-item" 
				  :class="{'active': loginType === 'password'}" 
				  @tap="switchType('password')">密码登录</view>
			<view class="type-item" 
				  :class="{'active': loginType === 'sms'}" 
				  @tap="switchType('sms')">验证码登录</view>
		</view>
		
		<!-- 登录表单 -->
		<view class="login-form">
			<!-- 手机号输入 -->
			<view class="input-item">
				<text class="iconfont icon-phone"></text>
				<input type="number" 
					   v-model="phone" 
					   placeholder="请输入手机号" 
					   maxlength="11" />
			</view>
			
			<!-- 密码登录 -->
			<view class="input-item" v-if="loginType === 'password'">
				<text class="iconfont icon-password"></text>
				<input :type="showPassword ? 'text' : 'password'" 
					   v-model="password" 
					   placeholder="请输入密码" />
				<text class="show-pwd" 
					  :class="{'active': showPassword}" 
					  @tap="togglePassword">
					  {{showPassword ? '隐藏' : '显示'}}
				</text>
			</view>
			
			<!-- 验证码登录 -->
			<view class="input-item" v-else>
				<text class="iconfont icon-verify"></text>
				<input type="number" 
					   v-model="smsCode" 
					   placeholder="请输入验证码" 
					   maxlength="6" />
				<text class="send-code" 
					  :class="{'disabled': counting}" 
					  @tap="sendCode">
					  {{counting ? `${countdown}s后重新获取` : '获取验证码'}}
				</text>
			</view>
			
			<!-- 登录按钮 -->
			<button class="login-btn" 
					:disabled="!isFormValid" 
					:class="{'active': isFormValid}"
					@tap="handleLogin">
				登录
			</button>
			
			<!-- 注册入口 -->
			<view class="register-link">
				还没有账号？
				<text class="link" @tap="goRegister">立即注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginType: 'password', // password 或 sms
				phone: '',
				password: '',
				smsCode: '',
				showPassword: false,
				counting: false,
				countdown: 60
			}
		},
		computed: {
			isFormValid() {
				const phoneValid = /^1[3-9]\d{9}$/.test(this.phone)
				if (this.loginType === 'password') {
					return phoneValid && this.password.length >= 6
				} else {
					return phoneValid && this.smsCode.length === 6
				}
			}
		},
		methods: {
			switchType(type) {
				this.loginType = type
				// 切换时清空输入
				this.password = ''
				this.smsCode = ''
			},
			togglePassword() {
				this.showPassword = !this.showPassword
			},
			sendCode() {
				if (this.counting) return
				
				// 验证手机号
				if (!/^1[3-9]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}
				
				// 开始倒计时
				this.counting = true
				this.countdown = 60
				const timer = setInterval(() => {
					this.countdown--
					if (this.countdown <= 0) {
						clearInterval(timer)
						this.counting = false
					}
				}, 1000)
				
				// TODO: 调用发送验证码接口
				uni.showToast({
					title: '验证码已发送',
					icon: 'none'
				})
			},
			handleLogin() {
				if (!this.isFormValid) return
				
				// TODO: 调用登录接口
				const loginData = {
					phone: this.phone,
					type: this.loginType,
					...(this.loginType === 'password' 
						? { password: this.password }
						: { code: this.smsCode })
				}
				
				console.log('登录信息：', loginData)
				
				// 模拟登录成功
				uni.showToast({
					title: '登录成功',
					icon: 'success',
					duration: 1500,
					success: () => {
						uni.setStorageSync('userInfo', {
							phone: this.phone,
							token: '1234567890'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 1500)
					}
				})
			},
			goRegister() {
				uni.navigateTo({
					url: '/pages/login/register/register'
				})
			}
		}
	}
</script>

<style>
.login-container {
	padding: 60rpx 40rpx;
	min-height: 100vh;
	background-color: #fff;
}

.login-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80rpx;
}

.logo {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 20rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.login-type {
	display: flex;
	justify-content: center;
	margin-bottom: 50rpx;
}

.type-item {
	position: relative;
	padding: 20rpx 40rpx;
	font-size: 28rpx;
	color: #666;
}

.type-item.active {
	color: #007AFF;
	font-weight: 500;
}

.type-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 40rpx;
	height: 4rpx;
	background-color: #007AFF;
	border-radius: 2rpx;
}

.input-item {
	display: flex;
	align-items: center;
	height: 90rpx;
	margin-bottom: 30rpx;
	padding: 0 30rpx;
	background-color: #f8f8f8;
	border-radius: 45rpx;
}

.input-item .iconfont {
	font-size: 40rpx;
	color: #999;
	margin-right: 20rpx;
}

.input-item input {
	flex: 1;
	height: 90rpx;
	font-size: 28rpx;
}

.show-pwd,
.send-code {
	font-size: 26rpx;
	color: #007AFF;
	padding: 10rpx 20rpx;
}

.send-code.disabled {
	color: #999;
}

.login-btn {
	width: 100%;
	height: 90rpx;
	line-height: 90rpx;
	margin-top: 60rpx;
	background-color: #e6e6e6;
	color: #999;
	font-size: 32rpx;
	border-radius: 45rpx;
}

.login-btn.active {
	background-color: #007AFF;
	color: #fff;
}

.register-link {
	margin-top: 30rpx;
	text-align: center;
	font-size: 26rpx;
	color: #666;
}

.link {
	color: #007AFF;
	margin-left: 10rpx;
}
</style>
