<template>
	<view class="test-drive-container">
		<form @submit="handleSubmit">
			<!-- 预约车型 -->
			<view class="form-item">
				<text class="label required">预约车型</text>
				<input class="input" type="text" v-model="formData.modelName" disabled />
			</view>
			
			<!-- 称呼 -->
			<view class="form-item">
				<text class="label required">您的称呼</text>
				<input class="input" type="text" v-model="formData.name" placeholder="请输入您的称呼" />
			</view>
			
			<!-- 城市选择 -->
			<view class="form-item">
				<text class="label required">您的城市</text>
				<picker class="picker" mode="selector" :range="cityList" range-key="name" 
					@change="handleCityChange">
					<view class="picker-value">
						{{ formData.city ? formData.city.name : '请选择城市' }}
					</view>
				</picker>
			</view>
			
			<!-- 门店选择 -->
			<view class="form-item">
				<text class="label required">门店选择</text>
				<picker class="picker" mode="selector" :range="storeList" range-key="name" 
					@change="handleStoreChange" :disabled="!formData.city">
					<view class="picker-value">
						{{ formData.store ? formData.store.name : '请选择门店' }}
					</view>
				</picker>
			</view>
			
			<!-- 意向时间 -->
			<view class="form-item">
				<text class="label required">意向时间</text>
				<picker class="picker" mode="date" :start="startDate" :end="endDate" 
					@change="handleDateChange">
					<view class="picker-value">
						{{ formData.date || '请选择意向时间' }}
					</view>
				</picker>
			</view>
			
			<!-- 联系方式 -->
			<view class="form-item">
				<text class="label required">联系方式</text>
				<input class="input" type="number" v-model="formData.phone" placeholder="请输入手机号码" maxlength="11" />
			</view>
			
			<!-- 提交按钮 -->
			<button class="submit-btn" form-type="submit">提交预约</button>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				modelName: '',
				name: '',
				city: null,
				store: null,
				date: '',
				phone: ''
			},
			cityList: [
				{ id: 1, name: '北京市' },
				{ id: 2, name: '上海市' },
				{ id: 3, name: '广州市' },
				{ id: 4, name: '深圳市' }
			],
			storeListMap: {
				1: [
					{ id: 11, name: '北京朝阳店' },
					{ id: 12, name: '北京海淀店' }
				],
				2: [
					{ id: 21, name: '上海浦东店' },
					{ id: 22, name: '上海静安店' }
				],
				3: [
					{ id: 31, name: '广州天河店' },
					{ id: 32, name: '广州越秀店' }
				],
				4: [
					{ id: 41, name: '深圳南山店' },
					{ id: 42, name: '深圳福田店' }
				]
			},
			storeList: [],
			startDate: '',
			endDate: ''
		}
	},
	onLoad(options) {
		// 设置预约车型
		if(options.modelName) {
			this.formData.modelName = options.modelName
		}
		
		// 设置日期范围
		const now = new Date()
		this.startDate = this.formatDate(now)
		
		const maxDate = new Date()
		maxDate.setMonth(maxDate.getMonth() + 3)
		this.endDate = this.formatDate(maxDate)
	},
	methods: {
		handleCityChange(e) {
			const index = e.detail.value
			this.formData.city = this.cityList[index]
			this.formData.store = null
			// 更新门店列表
			this.storeList = this.storeListMap[this.formData.city.id] || []
		},
		
		handleStoreChange(e) {
			const index = e.detail.value
			this.formData.store = this.storeList[index]
		},
		
		handleDateChange(e) {
			this.formData.date = e.detail.value
		},
		
		formatDate(date) {
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		},
		
		handleSubmit() {
			// 表单验证
			if(!this.formData.name.trim()) {
				uni.showToast({
					title: '请输入您的称呼',
					icon: 'none'
				})
				return
			}
			if(!this.formData.city) {
				uni.showToast({
					title: '请选择城市',
					icon: 'none'
				})
				return
			}
			if(!this.formData.store) {
				uni.showToast({
					title: '请选择门店',
					icon: 'none'
				})
				return
			}
			if(!this.formData.date) {
				uni.showToast({
					title: '请选择意向时间',
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
			
			// TODO: 提交预约信息到服务器
			console.log('预约信息：', this.formData)
			uni.showToast({
				title: '预约成功',
				icon: 'success'
			})
		}
	}
}
</script>

<style>
.test-drive-container {
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
	color: #333;
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
