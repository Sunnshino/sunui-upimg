#单个导入组件
```
    // 引入组件
    import sunsinUpimg from './components/sunsin-upimg.vue'

    // 注册组件
    components: {
        sunsinUpimg
    },
```

#全局导入组件(main.js)-使用具体参考(https://uniapp.dcloud.io/use?id=%E5%85%A8%E5%B1%80%E7%BB%84%E4%BB%B6)
```
    // 引入组件
    import sunsinUpimg from './components/sunsin-upimg.vue'

    // 注册组件
    Vue.component('sunsin-upimg', sunsinUpimg)
```

##组件使用(页面使用,的确很简单,就3个参数)
```
	<sunsin-upimg url="https://xxx" :count="2" :autoup="false" />
```




##页面参数说明

###count: Number
上传图片数量

###autoup: Boolean
是否自动上传图片(默认true)

###url: String
上传后端地址


####致谢
919809734@qq.com ->预览错误的问题，是因为每次都生成了新数组，而非合并数组 133行改成 _that.imgs = _that.imgs.concat(res.tempFilePaths) 即可 