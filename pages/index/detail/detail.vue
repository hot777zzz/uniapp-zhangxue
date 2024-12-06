<template>
	<view class="detail">
		<!-- 轮播图 -->
		<swiper class="swiper" circular indicator-dots autoplay>
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" class="swiper-image"></image>
			</swiper-item>
		</swiper>

		<!-- 摩托车型号选择 -->
		<scroll-view scroll-x class="model-select">
			<view class="button-group">
				<view v-for="(item, index) in motorcycleModels" 
					  :key="index" 
					  class="button-item"
					  :class="{'active': currentModel === item.id}"
					  @tap="handleModelChange(item.id)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>

		<!-- 颜色选择区域 -->
		<view class="color-select">
			<view class="color-title">可选颜色</view>
			<scroll-view scroll-y class="color-list">
				<view class="color-grid">
					<view v-for="(color, index) in colorList" 
						  :key="index"
						  class="color-item"
						  :class="{'active': currentColor === color.id}"
						  @tap="handleColorChange(color)">
						<image :src="color.image" mode="aspectFit" class="color-image"></image>
						<text class="color-name">{{color.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 摩托参数 -->
		<view class="params-section" v-if="currentModelData">
			<view class="params-title">车辆参数</view>
			<view class="params-grid">
				<view class="param-item">
					<text class="param-label">发动机</text>
					<text class="param-value">{{currentModelData.params.engine}}</text>
				</view>
				<view class="param-item">
					<text class="param-label">最大功率</text>
					<text class="param-value">{{currentModelData.params.power}}</text>
				</view>
				<view class="param-item">
					<text class="param-label">最大扭矩</text>
					<text class="param-value">{{currentModelData.params.torque}}</text>
				</view>
				<view class="param-item">
					<text class="param-label">整备质量</text>
					<text class="param-value">{{currentModelData.params.weight}}</text>
				</view>
				<view class="param-item">
					<text class="param-label">参考价格</text>
					<text class="param-value">¥{{currentModelData.params.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from '../../../request/data.js'

export default {
	data() {
		return {
			currentId: '',
			swiperList: [],
			motorcycleModels: [],
			currentModel: '',
			currentColor: ''
		}
	},
	onLoad(options) {
		this.currentId = options.id
		this.loadMotorcycleData()
	},
	computed: {
		currentModelData() {
			return this.motorcycleModels.find(item => item.id === this.currentModel)
		},
		colorList() {
			return this.currentModelData ? this.currentModelData.colors : []
		}
	},
	methods: {
		loadMotorcycleData() {
			const data = request.request.getMotorcycleData(this.currentId)
			if (data) {
				this.swiperList = data.swiper
				this.motorcycleModels = data.models
				this.currentModel = data.models[0].id
				this.currentColor = data.models[0].colors[0].id
			}
		},
		handleModelChange(modelId) {
			this.currentModel = modelId
			if (this.currentModelData && this.currentModelData.colors.length > 0) {
				this.currentColor = this.currentModelData.colors[0].id
			}
		},
		handleColorChange(color) {
			this.currentColor = color.id
		}
	}
}
</script>

<style>
.detail {
	padding: 30rpx;
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.swiper {
	width: 100%;
	height: 400rpx;
	margin-bottom: 30rpx;
}

.swiper-image {
	width: 100%;
	height: 100%;
}

.model-select {
	white-space: nowrap;
	margin-bottom: 30rpx;
}

.button-group {
	display: flex;
	padding: 20rpx;
}

.button-item {
	min-width: 160rpx;
	height: 70rpx;
	line-height: 70rpx;
	text-align: center;
	margin-right: 20rpx;
	padding: 0 30rpx;
	background-color: #f5f5f5;
	border-radius: 35rpx;
	font-size: 28rpx;
	color: #333;
	transition: all 0.3s ease;
}

.button-item.active {
	background-color: #007AFF;
	color: #ffffff;
	box-shadow: 0 2rpx 8rpx rgba(0, 122, 255, 0.3);
}

.color-select {
	flex: 1;
	min-height: 30vh;
	background-color: #f8f8f8;
	border-radius: 20rpx;
	padding: 20rpx;
}

.color-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	padding-left: 20rpx;
}

.color-list {
	height: calc(100% - 60rpx);
}

.color-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200rpx, 1fr));
	gap: 20rpx;
	padding: 10rpx;
}

.color-item {
	background-color: #ffffff;
	border-radius: 15rpx;
	padding: 15rpx;
	text-align: center;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.color-item.active {
	border: 2rpx solid #007AFF;
	transform: scale(1.02);
	transition: all 0.3s ease;
}

.color-image {
	width: 100%;
	height: 180rpx;
	border-radius: 10rpx;
}

.color-name {
	font-size: 26rpx;
	margin-top: 10rpx;
	display: block;
	color: #333;
}

.params-section {
	margin-top: 30rpx;
	padding: 20rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
}

.params-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.params-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.param-item {
	background-color: #f8f8f8;
	padding: 20rpx;
	border-radius: 10rpx;
}

.param-label {
	font-size: 24rpx;
	color: #666;
	display: block;
	margin-bottom: 10rpx;
}

.param-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

/* 适配 iPhone 底部安全区域 */
/* #ifdef H5 */
@supports (bottom: constant(safe-area-inset-bottom)) {
	.detail {
		padding-bottom: constant(safe-area-inset-bottom);
	}
}
@supports (bottom: env(safe-area-inset-bottom)) {
	.detail {
		padding-bottom: env(safe-area-inset-bottom);
	}
}
/* #endif */
</style>
