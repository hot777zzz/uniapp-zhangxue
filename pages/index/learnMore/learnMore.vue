<template>
	<view class="learn-more">
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

		<!-- 当前选中型号展示 -->
		<view class="current-model" v-if="currentModelData">
			<image :src="currentModelData.image" mode="widthFix" class="model-image"></image>
			<text class="model-name">{{currentModelData.name}}</text>
		</view>

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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				motorcycleModels: [
					{
						id: '1',
						name: '1号车',
						image: '/static/motorcycle/sport.png',
						colors: [
							{
								id: '1-1',
								name: '炫酷黑',
								image: '/static/motorcycle/sport-black.png'
							},
							{
								id: '1-2',
								name: '激情红',
								image: '/static/motorcycle/sport-red.png'
							}
						]
					},
					{
						id: '2',
						name: '2号车',
						image: '/static/motorcycle/street.png',
						colors: [
							{
								id: '2-1',
								name: '典雅白',
								image: '/static/motorcycle/street-white.png'
							},
							{
								id: '2-2',
								name: '深邃蓝',
								image: '/static/motorcycle/street-blue.png'
							}
						]
					},
					
				],
				currentModel: '1',
				currentColor: '1-1'
			}
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
			handleModelChange(modelId) {
				this.currentModel = modelId
				// 切换型号时，默认选择该型号的第一个颜色
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
.learn-more {
	padding: 30rpx;
	height: 100vh;
	display: flex;
	flex-direction: column;
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

.current-model {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30rpx;
}

.model-image {
	width: 90%;
	max-height: 40vh;
	object-fit: contain;
}

.model-name {
	font-size: 32rpx;
	font-weight: bold;
	margin-top: 20rpx;
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

/* 适配 iPhone 底部安全区域 */
/* #ifdef H5 */
@supports (bottom: constant(safe-area-inset-bottom)) {
	.learn-more {
		padding-bottom: constant(safe-area-inset-bottom);
	}
}
@supports (bottom: env(safe-area-inset-bottom)) {
	.learn-more {
		padding-bottom: env(safe-area-inset-bottom);
	}
}
/* #endif */
</style>
