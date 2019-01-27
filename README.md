#单个导入组件
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
                <sunsin-upimg url="https://ww...." :count="2" :autoplay="true"></sunsin-upimg>
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
            }
        }
    </script>

    <style>

    </style>
```

#全局导入组件(main.js)
```
       // 1.引入组件
    import sunsinUpimg from './components/sunsin-upimg.vue'

    // 2.注册组件
    Vue.component('sunsin-upimg', sunsinUpimg)

   // 页面-实例
    <template>
        <view>
            <view>
                <sunsin-upimg url="https://ww...." :count="2" :autoplay="true"></sunsin-upimg>
            </view>
        </view>
    </template>

    <script>
        export default {
            data() {
                return {

                };
            }
        }
    </script>

    <style>

    </style>
```

##组件使用
```
	<sunsin-upimg url="https://xxx" :count="2" :autoup="false" /> 限制上传图片数量
	<sunsin-upimg url="https://xxx"  :notli="true" /> 不限制上传图片数量 
```

##关于获取上传后返回的值(url)
大家可以使用钩子获取组件值以及使用缓存解决,代码为105行.


##页面参数说明

###count: String
上传图片数量

###autoup: Boolean
是否自动上传图片(默认true)

###url: String
上传后端地址

###notli: Boolean
是否开启不限制上传图片数量,默认false


####致谢
919809734@qq.com ->预览错误的问题，是因为每次都生成了新数组，而非合并数组 133行改成 _that.imgs = _that.imgs.concat(res.tempFilePaths) 即可
####
langice@126.com -> 计算图片数量