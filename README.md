> 更多需求，请在评论处提交！

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
              <!-- 会覆盖限制上传图片数量，notli默认false -->
             <sunsin-upimg url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind" :notli="false" :count="2" :upreduce="true" @onUpImg="upImgData" />
             <!-- 不会覆盖限制上传图片数量 -->
             <sunsin-upimg url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind" :notli="true" :count="2" :upreduce="true" @onUpImg="upImgDatas" />
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
               <!-- 会覆盖限制上传图片数量（也就是count参数失效），notli默认false -->
              <sunsin-upimg url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind" :notli="false" :count="2" :upreduce="true" @onUpImg="upImgData" />
              <!-- 不会覆盖限制上传图片数量 -->
              <sunsin-upimg url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind" :notli="true" :count="2" :upreduce="true" @onUpImg="upImgDatas" />
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
				},
				//获取上传图片的所有信息,为数组
				upImgDatas(e){
					console.log('来了,伙计',e)
				}
			}
        }
    </script>

    <style>

    </style>
```

## 组件使用(请严格按照以下格式进行配置，目前仅支持以下几种图片上传方式)
```
	 <!-- 会覆盖限制上传图片数量（也就是count参数失效），notli默认false -->
	<sunsin-upimg url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind" :notli="false" :count="2" :upreduce="true" @onUpImg="upImgData" />
	<!-- 不会覆盖限制上传图片数量 -->
	<sunsin-upimg url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind" :notli="true" :count="2" :upreduce="true" @onUpImg="upImgDatas" />
```

## 关于获取上传后返回的值

##
##### v1.3更新：方法upImgData可获取上传图片的所有信息,为数组(可以通过此来计算图片长度以及其它信息)
##### v1.4更新：自定义样式名修改以及增加了上传图片压缩可选项
##### v1.5更新：限制上传图片或者不限制，notli参数为true会覆盖count参数! 自动参数autoup默认
##

## 页面参数说明

- count: String
上传图片数量

- url: String
上传后端地址

- notli: Boolean
是否开启不限制上传图片数量,默认false

- upreduce: Boolean
是否开启选择图片时压缩(不支持h5),默认false


#### 致谢
919809734@qq.com ->预览错误的问题，是因为每次都生成了新数组，而非合并数组 133行改成 _that.imgs = _that.imgs.concat(res.tempFilePaths) 即可
