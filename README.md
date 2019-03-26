>**upimg for uniApp**  
>**如无法按照预期运行,请star并且watch本项目,以便得到最新的UI('_')**   

---------------------
### 现阶段支持功能如下
- 图片上传前预览
- 图片上传后预览
- 图片预览删除
- 图片添加
- 图片上传限制
- 图片无上传限制
- 图片上传进度监控
- 支持阿里云oos上传


### 开始考虑支持以下功能
- 上传图片拖拽排序


### 使用Step1(导入main.js).
```
 import sunUpImg from './components/sunui-upimg.vue'
 Vue.component('sunui-upimg', sunUpImg)
```


### 使用Step2(具体看以下实例)
```
<template>
	<view>
		<view>
			<!-- 不会覆盖限制上传图片数量（也就是count参数生效），notli默认false -->
			<view class="sun-title">上传图片</view>
			<sunui-upimg :upImgConfig="upImgConfig" @onUpImg="upImgData" />
			<!-- 会覆盖限制上传图片数量（也就是count参数失效），notli默认false -->
			<sunui-upimg :upImgConfig="upImgConfig1" @onUpImg="upImgDatas" />
		</view>
	</view>
</template>

<!-- 
 
 -->

<script>
	export default {
		data() {
			return {
				/**
				 * 图片上传配置项
				 * 
				 * 关于阿里云oos,开启oos的话(需要配置./ali-oos/config.js的配置项)
				 */
				upImgConfig: {
					// 是否阿里云oos(为true的话url将失效)且oos地址必须是https
					oos: true,
					// 阿里云oos上传目录(必须存在)
					oosDirectory:'mifanimg',
					// 后端图片接口地址
					url: 'https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind',
					// 是否开启notli(即选择完直接上传)
					notli: false,
					// 图片数量
					count: 2,
					// 新增上传背景修改
					bgColor: '#0089FC',
					// 新增上传icon图标颜色修改
					iconColor: '#fff',
					// 上传文字描述(仅限四个字)
					text: '添加图片',
					// 删除图标定义背景颜色
					delIconColor:'',
					// 删除图标字体颜色
					delIconText:'',
					// 上传图标替换(+),是个http,https网络图片地址,譬如这样(https://www.playsort.cn/right.png)
					iconReplace:''
				},
				/**
				 * 图片上传配置项2
				 */
				upImgConfig1: {
					// 后端图片接口地址
					url: 'https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwind',
					// 是否开启notli(即选择完直接上传)
					notli: true,
					// 图片数量(count参数失效)
					count: 2
				}
			};
		},
		methods: {
			//获取上传图片的所有信息,为数组
			upImgData(e) {
				console.log('来了,伙计1', e)
			},
			//获取上传图片的所有信息,为数组
			upImgDatas(e) {
				console.log('来了,伙计2', e)
			}
		}
	}
</script>

<style>

</style>


```

### BUG以及更改
- 上传图片组件progress进度条bug修改
- 上传图片组件内进行注释修改
- 上传图片组件已支持阿里云oos
- 修复ios上传图片逆转

##### *其它待开发...*
