# 单个导入组件
```
    // 1.引入组件
    import sunsinUpimg from './components/sunsin-upimg.vue'

    // 2.注册组件
    components: {
        sunsinUpimg
    },

    //页面-实例
    <template>
        <view>
            <view>
                <sunsin-upimg url="https://ww...." :count="2" :autoplay="true" @onUpImg="upImgData"></sunsin-upimg>
            </view>
        </view>
    </template>

    <script>
        export default {
            data() {
                return {

                };
            },
             // 注册组件
            components: {
                sunsinUpimg
            },
			//获取上传图片的所有信息,为数组
			upImgData(e){
				console.log('来了,伙计',e)
			}
        }
    </script>

    <style>

    </style>
```

# 全局导入组件(main.js)
```
       // 1.引入组件
    import sunsinUpimg from './components/sunsin-upimg.vue'

    // 2.注册组件
    Vue.component('sunsin-upimg', sunsinUpimg)

   // 页面-实例
    <template>
        <view>
            <view>
                <sunsin-upimg url="https://ww...." :count="2" :autoplay="true" @onUpImg="upImgData"></sunsin-upimg>
            </view>
        </view>
    </template>

    <script>
        export default {
            data() {
                return {

                };
            },
			methods:{
				//获取上传图片的所有信息,为数组
				upImgData(e){
					console.log('来了,伙计',e)
				}
			}
        }
    </script>

    <style>

    </style>
```

## 组件使用(请严格按照以下格式进行配置，目前仅支持以下3种图片上传方式)
```
	<sunsin-upimg url="https://xxx" :count="2" :autoup="true" @onUpImg="upImgData" /> 限制上传图片数量
	<sunsin-upimg url="https://xxx" :count="2" :autoup="false" @onUpImg="upImgData" /> 限制上传图片数量
	<sunsin-upimg url="https://xxx"  :notli="true" @onUpImg="upImgData" /> 不限制上传图片数量 
```

## 关于获取上传后返回的值
v1.3更新：方法upImgData可获取上传图片的所有信息,为数组(可以通过此来计算图片长度以及其它信息)


## 页面参数说明

- count: String
上传图片数量

- autoup: Boolean
是否自动上传图片(默认true)

- url: String
上传后端地址

- notli: Boolean
是否开启不限制上传图片数量,默认false

## 参数搭配说明
必须参数： url,notil  
可选参数： count,autoup  
count不可和notil参数搭配,其余皆可.  


#### 致谢
919809734@qq.com ->预览错误的问题，是因为每次都生成了新数组，而非合并数组 133行改成 _that.imgs = _that.imgs.concat(res.tempFilePaths) 即可
