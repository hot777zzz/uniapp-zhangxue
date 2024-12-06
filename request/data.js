//各类静态数据
const swiper = [{
					id:1,
					url:'https://ts3.cn.mm.bing.net/th?id=OIP-C.WqTHAoFXl4tm3moKBp6WoQHaNK&w=187&h=333&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
					},
					{
					id:2,
					url:'https://ts3.cn.mm.bing.net/th?id=OIP-C.ZxPJsMuW7vf-T2QziAg7hgHaJa&w=221&h=281&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
				}]



const mapData = {
						latitude:30.6667, //纬度
                        longitude:104.0667,//经度
                        scale:13,//缩放级别
                        bottomData:false,
                        marker: [
                                            {
                                            id:4,
                                           latitude:30.69, //纬度
                                           longitude:104.0767,//经度
                                            iconPath: '',    //显示的图标        
                                            rotate:0,   // 旋转度数
                                            width:20,   //宽
                                            height:30,   //高
                                                //   title:'我在这里',//标注点名
                                            alpha:0.5,   //透明度
                                            callout:{//自定义标记点上方的气泡窗口 点击有效  
                                            content:'xx大厦',//文本
                                            color:'#ffffff',//文字颜色
                                            fontSize:14,//文本大小
                                            borderRadius:15,//边框圆角
                                            borderWidth:'10',
                                            bgColor:'#e51860',//背景颜色
                                            display:'ALWAYS',//常显
													},
                                            },
                                            {
											id:1234597,
                                                    latitude:  23.106574,//纬度
                                                    longitude: 113.324587,//经度
                                                    iconPath: '',    //显示的图标        
                                                    rotate:0,   // 旋转度数
                                                    width:20,   //宽
                                                height:30,   //高
                                            //  title:'我在这里',//标注点名
                                                    alpha:0.5,   //透明度
                                                //      label:{//为标记点旁边增加标签   //因背景颜色H5不支持
                                                //   color:'red',//文本颜色
                                                //      },
                                                    callout:{//自定义标记点上方的气泡窗口 点击有效  
                                                content:'广州塔',//文本
                                                color:'#ffffff',//文字颜色
                                                fontSize:14,//文本大小
                                                borderRadius:15,//边框圆角
                                                borderWidth:'10',
                                                bgColor:'#e51860',//背景颜色
                                                display:'ALWAYS',//常显
                                                },
                                            },
                                            {
                                                    id:2,
                                                    latitude:  23.1338,//纬度
                                                    longitude: 113.33052,//经度
                                                    iconPath: '',    //显示的图标        
                                                    rotate:0,   // 旋转度数
                                                  width:20,   //宽
                                                    height:30,   //高
                                                    alpha:0.5,   //透明度
                                            callout:{//自定义标记点上方的气泡窗口 点击有效  
                                                content:'德隆大厦',//文本
                                                color:'#ffffff',//文字颜色
                                                fontSize:14,//文本大小
                                                borderRadius:15,//边框圆角
                                                borderWidth:'10',
                                                bgColor:'#e51860',//背景颜色
                                                display:'ALWAYS',//常显
                                                },
                                            },
                                            
                                        ],
            }
			

// 在现有代码中添加摩托车数据
const motorcycleData = {
    1: {
        swiper: [
            { url: '/static/motorcycle/sport-1.png' },
            { url: '/static/motorcycle/sport-2.png' },
            { url: '/static/motorcycle/sport-3.png' }
        ],
        models: [
            {
                id: '1',
                name: '普通版',
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
                ],
                params: {
                    engine: '1000cc',
                    power: '180hp',
                    torque: '120N·m',
                    weight: '198kg',
                    price: '139,800'
                }
            },
            {
                id: '2',
                name: '赛道版',
                image: '/static/motorcycle/sport-race.png',
                colors: [
                    {
                        id: '2-1',
                        name: '赛道黄',
                        image: '/static/motorcycle/sport-race-yellow.png'
                    },
                    {
                        id: '2-2',
                        name: '竞技蓝',
                        image: '/static/motorcycle/sport-race-blue.png'
                    }
                ],
                params: {
                    engine: '1000cc',
                    power: '200hp',
                    torque: '130N·m',
                    weight: '195kg',
                    price: '159,800'
                }
            }
        ]
    },
    2: {
        // 可以添加其他型号的数据
    }
}

const request ={
	getSwiper(){
	return swiper
    },
	getmapData(){
	return mapData
	},
	getMotorcycleData(id) {
        return motorcycleData[id] || null
    }
}





export default{
	request
}