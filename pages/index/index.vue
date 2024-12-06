<template>
	<view class="content">
		<swiper circular indicator-dots>
					<!-- v-for循环遍历数组 -->
					<swiper-item v-for="item in swipers" :key="item.id">
						<image :src="item.url" @click="getDetail(item.id)"></image>
					</swiper-item>
		</swiper>
		<view class="learn_more" @click="goLearnMore">
			<text style="color: #fff; font-weight: 500;" >了解更多 ></text>
		</view>
	</view>
</template>

<script>
	import request from '../../request/data.js'
	export default {
		data() {
			return {
				swipers:[],
				
				
				}	
			
		},
		onShow() {
			//这里需要获取轮播图数据
			this.swipers = request.request.getSwiper()
			
			// console.log(request);
		},
		methods: {
			getDetail(id){
				console.log(id);
				uni.navigateTo({
					url:"/pages/index/detail/detail?id="+id
				})
			},
			goLearnMore(){
				uni.navigateTo({
					url:"/pages/index/learnMore/learnMore"
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	swiper{
		width: 750rpx;
		height: 100vh;
	}		
	image{
		width: 100%;
		height: 100%;
	}
	.learn_more{
		position: absolute;
		bottom: 15vh;
		width: 50%;
		height: 50px;
		background-color:rgba(54, 54, 54, 0.4);
		border-radius: 10px;
		box-shadow: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
