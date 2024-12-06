<template>
    <view class="content">
      <map style="width: 100%; height: 100vh;" :layer-style='5'   :show-location='true'  :latitude="mapData.latitude" :longitude="mapData.longitude" :markers="mapData.marker" :scale="mapData.scale"  @markertap="markertap"   @callouttap='markertap'>
       </map>
    </view>
</template>

<script>
	import request from '../../request/data.js'
    export default {
        data() {
            return {
                mapData:{}
            }
			},
        onLoad() {
			this.mapData = request.request.getmapData()
			console.log(this.mapData);
        },
        computed:{
                    mapheight(){
                        let data =''
                        if(this.bottomData){
                            if(this.upTop){
                                data ='50px'
                            }else{
                                data ='200px'
                            }
                        }else{
                            data ='90vh'
                        }
                        return data
                    },
                    coverbottom(){
                        let data =''
                        if(this.bottomData){
                            data ='20rpx'
                        }else{
                            data ='100rpx'
                        }
                        return data
                    }
                },
        methods:{
                //地图点击事件
            markertap(e) {
                console.log("点击了标记点=",e)
				 let name = this.mapData.marker.filter((item)=>item.id == e.markerId)
				uni.showModal({
					content:name[0].callout.content,
				})
				console.log(name[0].callout.content);
                },
        }
    }
</script>
<style>
		.content{
			height: 100vh;
		}
</style>