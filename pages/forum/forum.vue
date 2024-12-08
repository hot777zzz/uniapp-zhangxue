<template>
	<view class="forum-container">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="search-input-wrap">
				<text class="iconfont icon-search"></text>
				<input type="text" 
					   class="search-input" 
					   v-model="searchKey" 
					   placeholder="搜索帖子" 
					   @confirm="handleSearch"/>
			</view>
		</view>
		
		<!-- 排序选项 -->
		<view class="sort-bar">
			<view class="sort-item" 
				  v-for="(item, index) in sortOptions" 
				  :key="index"
				  :class="{'active': currentSort === item.value}"
				  @tap="handleSort(item.value)">
				{{item.label}}
			</view>
		</view>
		
		<!-- 文章列表 -->
		<scroll-view scroll-y class="article-list" 
					 @scrolltolower="loadMore"
					 refresher-enabled
					 :refresher-triggered="refreshing"
					 @refresherrefresh="refresh">
			<view class="article-item" 
				  v-for="(article, index) in articleList" 
				  :key="index"
				  @tap="goToDetail(article.id)">
				<view class="article-content">
					<view class="article-title">{{article.title}}</view>
					<view class="article-brief">{{article.content}}</view>
					<view class="article-images" v-if="article.images && article.images.length">
						<image v-for="(img, imgIndex) in article.images.slice(0, 3)" 
							   :key="imgIndex"
							   :src="img"
							   mode="aspectFill"
							   class="article-image"></image>
					</view>
					<view class="article-info">
						<view class="article-author">{{article.author}}</view>
						<view class="article-date">{{article.date}}</view>
					</view>
					<view class="article-actions">
						<view class="action-item" @tap.stop="handleLike(article)">
							<text class="iconfont" :value="article.isLiked ? 'icon-like-filled' : 'icon-like'"></text>
							<text class="action-num">{{article.likes}}</text>
						</view>
						<view class="action-item" @tap.stop="goToDetail(article.id)">
							<text class="iconfont icon-comment"></text>
							<text class="action-num">{{article.comments}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="loading" v-if="loading">加载中...</view>
			<view class="no-more" v-if="noMore">没有更多了</view>
		</scroll-view>
		
		<!-- 发帖按钮 -->
		<view class="post-btn" @tap="goToPost">
		<text style="color: #fff;">+</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchKey: '',
			currentSort: 'date',
			sortOptions: [
				{ label: '最新', value: 'date' },
				{ label: '热度', value: 'hot' },
				{ label: '点赞', value: 'likes' }
			],
			articleList: [],
			page: 1,
			loading: false,
			noMore: false,
			refreshing: false
		}
	},
	onLoad() {
		this.loadArticles()
	},
	methods: {
		// 加载文章列表
		async loadArticles() {
			if(this.loading || this.noMore) return
			
			this.loading = true
			// TODO: 调用接口获取文章列表
			// 模拟数据
			setTimeout(() => {
				const newArticles = Array(10).fill(0).map((_, index) => ({
					id: this.page * 10 + index,
					title: `文章标题 ${this.page * 10 + index}`,
					content: 'asdjj卡纳达克瓦德纳我看你兰卡威的那两款我那看来我得看完那我离开克鲁瓦你看论文哪里看能力',
					images: [
						'/static/images/article1.jpg',
						'/static/images/article2.jpg',
						'/static/images/article3.jpg'
					],
					author: '用户名',
					date: '2024-03-20',
					likes: Math.floor(Math.random() * 100),
					comments: Math.floor(Math.random() * 50),
					isLiked: false
				}))
				
				this.articleList = [...this.articleList, ...newArticles]
				this.loading = false
				this.page++
				
				if(this.page > 3) {
					this.noMore = true
				}
			}, 1000)
		},
		
		// 搜索
		handleSearch() {
			this.articleList = []
			this.page = 1
			this.noMore = false
			this.loadArticles()
		},
		
		// 排序
		handleSort(sort) {
			if(this.currentSort === sort) return
			this.currentSort = sort
			this.articleList = []
			this.page = 1
			this.noMore = false
			this.loadArticles()
		},
		
		// 点赞
		handleLike(article) {
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
						}
					}
				})
				return
			}
			
			article.isLiked = !article.isLiked
			article.likes += article.isLiked ? 1 : -1
			// TODO: 调用点赞接口
		},
		
		// 加载更多
		loadMore() {
			this.loadArticles()
		},
		
		// 下拉刷新
		async refresh() {
			this.refreshing = true
			this.articleList = []
			this.page = 1
			this.noMore = false
			await this.loadArticles()
			this.refreshing = false
		},
		
		// 跳转到文章详情
		goToDetail(id) {
			uni.navigateTo({
				url: `/pages/forum/detail/detail?id=${id}`
			})
		},
		
		// 跳转到发帖页面
		goToPost() {
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
						}
					}
				})
				return
			}
			
			uni.navigateTo({
				url: '/pages/forum/post/post'
			})
		}
	}
}
</script>

<style>
.forum-container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
}

.search-bar {
	padding: 20rpx;
	background-color: #ffffff;
	position: sticky;
	top: 0;
	z-index: 100;
}

.search-input-wrap {
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
}

.icon-search {
	font-size: 28rpx;
	color: #999;
	margin-right: 10rpx;
}

.search-input {
	flex: 1;
	height: 60rpx;
	font-size: 28rpx;
}

.sort-bar {
	display: flex;
	background-color: #ffffff;
	padding: 20rpx;
	position: sticky;
	top: 100rpx;
	z-index: 100;
}

.sort-item {
	padding: 10rpx 30rpx;
	font-size: 28rpx;
	color: #666;
	position: relative;
}

.sort-item.active {
	color: #007AFF;
}

.sort-item.active::after {
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

.article-list {
	height: calc(100vh - 200rpx);
}

.article-item {
	margin: 20rpx;
	padding: 20rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
}

.article-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.article-brief {
	font-size: 28rpx;
	color: #666;
	line-height: 1.5;
	margin-bottom: 10rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.article-images {
	display: flex;
	gap: 10rpx;
	margin-bottom: 10rpx;
}

.article-image {
	width: 220rpx;
	height: 220rpx;
	border-radius: 8rpx;
}

.article-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10rpx;
}

.article-author {
	font-size: 24rpx;
	color: #666;
}

.article-date {
	font-size: 24rpx;
	color: #999;
}

.article-actions {
	display: flex;
	gap: 30rpx;
}

.action-item {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.action-item .iconfont {
	font-size: 32rpx;
	color: #666;
}

.icon-like-filled {
	color: #ff4d4f !important;
}

.action-num {
	font-size: 24rpx;
	color: #666;
}

.loading, .no-more {
	text-align: center;
	padding: 30rpx;
	color: #999;
	font-size: 24rpx;
}

.post-btn {
	position: fixed;
	right: 30rpx;
	bottom: 30rpx;
	width: 100rpx;
	height: 100rpx;
	background-color: #007AFF;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 16rpx rgba(0,122,255,0.3);
}

.post-btn .iconfont {
	font-size: 40rpx;
	color: #ffffff;
}
</style>
