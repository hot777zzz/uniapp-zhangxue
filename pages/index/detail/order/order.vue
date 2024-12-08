<template>
	<view class="order-container">
		<!-- 商品信息 -->
		<view class="product-section">
			<image class="product-image" :src="productInfo.image" mode="aspectFit"></image>
			<view class="product-info">
				<text class="product-name">{{productInfo.name}}</text>
				<text class="product-price">¥{{productInfo.price}}</text>
			</view>
		</view>
		
		<!-- 颜色选择 -->
		<view class="section-card">
			<view class="section-title">颜色选择</view>
			<scroll-view scroll-x class="color-list">
				<view class="color-items">
					<view v-for="(color, index) in colorList" 
						  :key="index"
						  class="color-item"
						  :class="{'active': selectedColor === color.id}"
						  @tap="handleColorSelect(color)">
						<image :src="color.image" mode="aspectFit" class="color-image"></image>
						<text class="color-name">{{color.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 配置选择 -->
		<view class="section-card">
			<view class="section-title">配置选择</view>
			<radio-group class="config-list" @change="handleConfigChange">
				<label v-for="(config, index) in configList" :key="index" class="config-item">
					<radio :value="config.id" :checked="selectedConfig === config.id" color="#007AFF"/>
					<view class="config-info">
						<text class="config-name">{{config.name}}</text>
						<text class="config-price">¥{{config.price}}</text>
					</view>
				</label>
			</radio-group>
		</view>
		
		<!-- 预定方式 -->
		<view class="section-card">
			<view class="section-title">预定方式</view>
			<view class="deposit-info">
				<text class="deposit-label">预付定金</text>
				<text class="deposit-amount">¥{{depositAmount}}</text>
			</view>
			<text class="deposit-tip">支付定金后锁定订单，剩余款项提车时支付</text>
		</view>
		
		<!-- 提车人信息 -->
		<view class="section-card">
			<view class="section-title">提车人信息</view>
			<view class="form-item">
				<text class="label required">您的称呼</text>
				<input class="input" type="text" v-model="formData.name" placeholder="请输入姓名" />
			</view>
			<view class="form-item">
				<text class="label required">身份证号</text>
				<input class="input" type="idcard" v-model="formData.idCard" placeholder="请输入身份证号" maxlength="18" />
			</view>
			<view class="form-item">
				<text class="label required">提车城市</text>
				<picker class="picker" mode="selector" :range="cityList" range-key="name" 
					@change="handleCityChange">
					<view class="picker-value">
						{{ formData.city ? formData.city.name : '请选择城市' }}
					</view>
				</picker>
			</view>
			<view class="form-item">
				<text class="label required">提车门店</text>
				<picker class="picker" mode="selector" :range="storeList" range-key="name" 
					@change="handleStoreChange" :disabled="!formData.city">
					<view class="picker-value">
						{{ formData.store ? formData.store.name : '请选择门店' }}
					</view>
				</picker>
			</view>
			<view class="form-item">
				<text class="label required">联系方式</text>
				<input class="input" type="number" v-model="formData.phone" placeholder="请输入手机号码" maxlength="11" />
			</view>
		</view>
		
		<!-- 购车须知 -->
		<view class="notice-section">
			<checkbox-group @change="handleAgreementChange">
				<label class="agreement">
					<checkbox value="1" color="#007AFF" />
					<text class="agreement-text">我已阅读并同意</text>
					<text class="agreement-link" @tap="showNotice">《购车须知》</text>
				</label>
			</checkbox-group>
		</view>
		
		<!-- 底部提交栏 -->
		<view class="submit-bar">
			<view class="price-info">
				<text class="deposit-text">定金：</text>
				<text class="deposit-value">¥{{depositAmount}}</text>
			</view>
			<button class="submit-btn" :disabled="!agreed" @tap="handleSubmit">提交订单</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			productInfo: {
				image: '',
				name: '',
				price: ''
			},
			colorList: [],
			selectedColor: '',
			configList: [],
			selectedConfig: '',
			depositAmount: 5000,
			formData: {
				name: '',
				idCard: '',
				city: null,
				store: null,
				phone: ''
			},
			cityList: [
				{ id: 1, name: '北京市' },
				{ id: 2, name: '上海市' }
			],
			storeListMap: {
				1: [
					{ id: 11, name: '北京朝阳店' },
					{ id: 12, name: '北京海淀店' }
				],
				2: [
					{ id: 21, name: '上海浦东店' },
					{ id: 22, name: '上海静安店' }
				]
			},
			storeList: [],
			agreed: false
		}
	},
	onLoad(options) {
		// 检查登录状态
		const userInfo = uni.getStorageSync('userInfo')
		if(!userInfo) {
			uni.showModal({
				title: '提示',
				content: '请先登录后继续操作',
				confirmText: '去登录',
				success: (res) => {
					if(res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else {
						uni.navigateBack()
					}
				}
			})
			return
		}
		
		// 获取商品信息
		this.loadProductInfo(options)
		
		// 获取用户信息
		this.loadUserInfo()
	},
	methods: {
		loadProductInfo(options) {
			// TODO: 根据options获取商品信息
			this.productInfo = {
				image: '/static/images/product.png',
				name: '摩托车1号',
				price: '99999'
			}
			this.colorList = [
				{ id: 1, name: '经典黑', image: '/static/images/black.png' },
				{ id: 2, name: '珍珠白', image: '/static/images/white.png' }
			]
			this.configList = [
				{ id: 1, name: '标准版', price: '99999' },
				{ id: 2, name: '豪华版', price: '129999' }
			]
			this.selectedColor = this.colorList[0].id
			this.selectedConfig = this.configList[0].id
		},
		
		loadUserInfo() {
			const userInfo = uni.getStorageSync('userInfo')
			if(userInfo) {
				this.formData = {
					...this.formData,
					name: userInfo.realName || '',
					idCard: userInfo.idCard || '',
					phone: userInfo.phone || ''
				}
			}
		},
		
		handleColorSelect(color) {
			this.selectedColor = color.id
		},
		
		handleConfigChange(e) {
			this.selectedConfig = e.detail.value
		},
		
		handleCityChange(e) {
			const index = e.detail.value
			this.formData.city = this.cityList[index]
			this.formData.store = null
			this.storeList = this.storeListMap[this.formData.city.id] || []
		},
		
		handleStoreChange(e) {
			const index = e.detail.value
			this.formData.store = this.storeList[index]
		},
		
		handleAgreementChange(e) {
			this.agreed = e.detail.value.length > 0
		},
		
		showNotice() {
			// TODO: 显示购车须知
			uni.showModal({
				title: '购车须知',
				content: '...',
				showCancel: false
			})
		},
		
		validateForm() {
			if(!this.formData.name.trim()) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				})
				return false
			}
			if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.formData.idCard)) {
				uni.showToast({
					title: '请输入正确的身份证号',
					icon: 'none'
				})
				return false
			}
			if(!this.formData.city) {
				uni.showToast({
					title: '请选择提车城市',
					icon: 'none'
				})
				return false
			}
			if(!this.formData.store) {
				uni.showToast({
					title: '请选择提车门店',
					icon: 'none'
				})
				return false
			}
			if(!/^1[3-9]\d{9}$/.test(this.formData.phone)) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none'
				})
				return false
			}
			return true
		},
		
		handleSubmit() {
			if(!this.validateForm()) return
			
			// TODO: 提交订单
			console.log('订单信息：', {
				product: this.productInfo,
				color: this.selectedColor,
				config: this.selectedConfig,
				deposit: this.depositAmount,
				customer: this.formData
			})
			
			uni.showToast({
				title: '提交成功',
				icon: 'success',
				success: () => {
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/me/orders/motorcycle'
						})
					}, 1500)
				}
			})
		}
	}
}
</script>

<style>
.order-container {
	padding-bottom: 120rpx;
}

.product-section {
	padding: 30rpx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
}

.product-image {
	width: 200rpx;
	height: 200rpx;
	margin-right: 20rpx;
}

.product-info {
	flex: 1;
}

.product-name {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.product-price {
	color: #ff4d4f;
	font-size: 36rpx;
	font-weight: bold;
}

.section-card {
	margin: 20rpx;
	padding: 20rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
}

.section-title {
	font-size: 28rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.color-list {
	white-space: nowrap;
}

.color-items {
	display: inline-flex;
	padding: 10rpx;
}

.color-item {
	margin-right: 20rpx;
	text-align: center;
	padding: 10rpx;
	border: 2rpx solid transparent;
	border-radius: 8rpx;
}

.color-item.active {
	border-color: #007AFF;
}

.color-image {
	width: 120rpx;
	height: 120rpx;
}

.color-name {
	font-size: 24rpx;
	margin-top: 10rpx;
}

.config-list {
	display: flex;
	flex-direction: column;
}

.config-item {
	display: flex;
	align-items: center;
	padding: 20rpx 0;
}

.config-info {
	margin-left: 20rpx;
	flex: 1;
	display: flex;
	justify-content: space-between;
}

.config-name {
	font-size: 28rpx;
}

.config-price {
	color: #ff4d4f;
	font-size: 28rpx;
}

.deposit-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10rpx;
}

.deposit-label {
	font-size: 28rpx;
}

.deposit-amount {
	color: #ff4d4f;
	font-size: 32rpx;
	font-weight: bold;
}

.deposit-tip {
	font-size: 24rpx;
	color: #999;
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

.picker {
	width: 100%;
	height: 80rpx;
	background-color: #f8f8f8;
	border-radius: 8rpx;
}

.picker-value {
	height: 80rpx;
	line-height: 80rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
}

.notice-section {
	padding: 30rpx;
}

.agreement {
	display: flex;
	align-items: center;
}

.agreement-text {
	font-size: 26rpx;
	color: #666;
	margin-left: 10rpx;
}

.agreement-link {
	font-size: 26rpx;
	color: #007AFF;
}

.submit-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	padding: 0 30rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
}

.price-info {
	flex: 1;
}

.deposit-text {
	font-size: 28rpx;
	color: #666;
}

.deposit-value {
	font-size: 36rpx;
	color: #ff4d4f;
	font-weight: bold;
}

.submit-btn {
	width: 240rpx;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #007AFF;
	color: #ffffff;
	font-size: 28rpx;
	border-radius: 40rpx;
}

.submit-btn[disabled] {
	opacity: 0.6;
}
</style>
