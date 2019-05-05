>**upimg for uniApp**  
>**如无法按照预期运行,请star并且watch本项目,以便得到最新的UI('_')**   

---------------------
### 现阶段支持功能如下
- 图片上传前预览
- 图片上传后预览
- 图片预览删除(可调接口删除,具体逻辑查看源码237行)
- 图片添加
- 图片上传限制
- 图片无上传限制
- 图片上传进度监控
- 支持阿里云oos上传
- 支持单页面多复用(@onUpImg="xxxx")
- 支持图片上传容量控制,单位为M,向上取整(暂时排除)
- 支持七牛云图片上传


### 开始考虑支持以下功能
- App上传任意图片数量


### 新增功能
- 支持手动上传图片(2019/3/29)
- 新增七牛云图片上传支持


### 未测试BUG
- h5端可能不支持获取图片信息api,未排除时屏蔽了291行~301行.


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
			<sunui-upimg :upImgConfig="upImgConfig" @onUpImg="upImgData" ref="uImage" />
			<!-- <button type="primary" @tap="uImageTap">上传图片</button> -->
			<button type="primary" @tap="getUpImgInfo">获取上传图片信息</button>
		</view>
	</view>
</template>

<script>
	// key-我这里用的是时间戳作为文件命名(你可以自定义) -> 七牛
	let timestamp = (new Date()).getTime();

	export default {
		data() {
			return {
				/**
				 * 图片上传配置项(Chrome模拟器端测试可能会报错CORS/CORB,请使用小程序工具测试,谢谢!)
				 * 
				 * 因个人设计原因->后面版本会提供多个版本分离.
				 * 
				 * (一).使用阿里云oos和公司后端接口须知--我默认注释了七牛云
				 * 			使用时注意注释sunui-upimg的32行和135~153行以及221~223行(此屏蔽的代码属于七牛云图片上传)
				 * (二).使用七牛云须知
				 * 			使用时注释156~204行(此屏蔽的代码属于阿里云和后端上传)
				 */
				upImgConfig: {
					// 是否阿里云oos且oos地址必须是https
					aliConfig: {
						// 阿里云oos上传key_secret(后端传)
						AccessKeySecret: 'zmOJcaqKJB5e4gqtLunHcNoMBTdDgp',
						// 阿里云oos上传key_id(后端传)
						OSSAccessKeyId: 'LTAIPcJL9J5OZr2G',
						// 阿里云oos上传目录(必须存在)
						oosDirectory: 'mifanimg',
						// 阿里云上传url
						url: 'http://4zlinkimgtest.oss-cn-beijing.aliyuncs.com/',
						// 是否阿里云oos,true启用;false使用basicConfig.url(也就是公司后端提供的接口)
						oos: true
					},
					// 七牛
					qiniuConfig: {
						region: 'SCN', // 华北区
						uptokenURL: 'wuqiangxi',
						uptoken: 'Ycs3ADclVWZAWvqdocpkr2i3oEHtg_LSJSFOBl2E:2u_pMpb_4vNZBsYyrsCiwqu3Pvk=:eyJzY29wZSI6Ind1cWlhbmd4aSIsImRlYWRsaW5lIjoxNTU3MDMxMDgxLCJ1cEhvc3RzIjpbImh0dHA6XC9cL3VwLXoyLnFpbml1LmNvbSIsImh0dHA6XC9cL3VwbG9hZC16Mi5xaW5pdS5jb20iLCItSCB1cC16Mi5xaW5pdS5jb20gaHR0cDpcL1wvMTQuMTUyLjM3LjQiXX0=',
						domain: 'wpx.weijuyunke.cn',
						shouldUseQiniuFileName: false,
						fileHead: 'file',
						key: timestamp
					},
					// 后端图片接口地址
					basicConfig: {
						url: 'https://p.dns06.net.cn/index.php?m=Api&c=index&a=upload'
					},
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 2,
					// 过滤图片容量大于或等于3M的图片(2019/4/11新增)
					maxsize: 3,
					// 相机来源([相机,相册],[相机])
					sourceType: true,
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 新增上传背景修改
					bgColor: '#0089FC',
					// 新增上传icon图标颜色修改
					iconColor: '#fff',
					// 上传文字描述(仅限四个字)
					text: '上传图片',
					// 删除图标定义背景颜色
					delIconColor: '',
					// 删除图标字体颜色
					delIconText: '',
					// 上传图标替换(+),是个http,https图片地址(https://www.playsort.cn/right.png)
					iconReplace: ''
				},
				imgArr: []
			};
		},
		onLoad() {
		
		},
		methods: {
			// 上传图片(2019/3/29新增) -> 手动上传(需要传入上传url,还需要搭配count参数使用!)
			uImageTap() {
				this.$refs.uImage.uploadimage('http://4zlinkimgtest.oss-cn-beijing.aliyuncs.com/');
			},
			//获取上传图片返回来的数组(Step1)
			async upImgData(e) {
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					if (e[i].path_server != "") {
						console.log(i);
						await arrImg.push(e[i].path_server.split(','));
					}
				}
				// 图片信息保存到data数组
				this.imgArr = arrImg;

				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (this.imgArr.length == this.upImgConfig.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},
			// 获取上传图片的所有信息(Step2)
			getUpImgInfo() {
				console.log('转成多维数组:', this.imgArr);
				console.log('转成一维数组:', this.imgArr.join().split(','));
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
- 更改上传对象配置项
- 修改选择图片bug以及选择数量限制(仅小程序、App端、h5不限制选择数量但已做处理)


##### *其它待开发...*
