>**upimg for uniApp**  
>**请star并且watch本项目,以便得到最新的UI('_')**   
>**推荐测试运行环境小程序开发者工具,避免出现CORS/CORB**  
>**如上传以后,出现错误(非CORS/CORB),就去修改图片返回地址,在各个插件版本有注释**  

---------------------

### 分离源码(集成版70k、后端版10k、阿里云版12k、七牛云版11k)
- sunui-upimg.vue(集成版),暂不提供更新.
- sunui-upimg-basic.vue(后端版),极易扩展
- sunui-upimg-alioos.vue(阿里云版),需要复制文件夹“ali-oos”
- sunui-upimg-qiniu.vue(七牛云版),需要复制文件夹“qiniu”
- sunui-sunui-upimg-tencent(腾讯云版),需要复制文件夹“tencent-cos”(**暂时不可用,请勿使用!!!**)

---------------------

### 现阶段支持功能如下
- 图片上传前预览
- 图片上传后预览
- 图片预览删除(可调接口删除,具体逻辑查看源码237行)
- 图片添加
- 图片上传限制
- 图片无上传限制
- 图片上传进度监控
- 支持阿里云oos图片上传
- 支持单页面多复用(@onUpImg="xxxx")
- 支持图片上传容量控制,单位为M,向上取整(暂时关闭该功能)
- 支持七牛云图片上传

---------------------


### 新增功能
- 支持手动上传图片 --2019/03/28
- 新增七牛云图片上传支持 --2019/05/05
- 新增隐藏删除图标 --2019/05/08

---------------------
### BUG以及更改
- 上传图片组件progress进度条bug修改
- 上传图片组件内进行注释修改
- 上传图片组件已支持阿里云oos
- 更改上传对象配置项
- 修改选择图片bug以及选择数量限制(仅小程序、App端、h5不限制选择数量但已做处理)
- iconfont图标对比svg性能以及实用性来说,下个版本会使用svg --2019/05/05
- 2.0版本已使用svg图标,如使用iconfont,可参考sunui-upimg.vue
- 下版本2.1增强稳定性以及错误提示 -- 2019/05/06
- 修复未上传图片预览,增加预览前图片提示(sunui-upimg.vue) --2019/05/06
- 修复App上传后旋转90°(等待测试),引入(http://ext.dcloud.net.cn/plugin?id=341)  h5待修复;sunui-upimg.vue暂时停止更新,而后增注释版 --2019/05/08
- 尽量使用微信开发者工具测试,(阿里云、七牛云、后端)测试提供的接口尽量选择小容量图片,只要参数引入正确就OK --2019/05/08
- 优化一些样式,增加些注释;譬如上传身份证模板改造一下样式即可使用 --2019/05/08
- 通过配置参数(isDelIcon:true/false)可动态显示/隐藏删除按钮 --2019/05/08
- 通过配置参数(isAddImage:true/false)可动态显示/隐藏添加图片图标 --2019/05/08
- 腾讯云云存储未使用过,所以暂时不可用 --2019/05/08
- 优化七牛云和阿里云以及上传失败后置空,并打印一些错误信息 --2019/05/08

---------------------

### 后期计划
- 增强稳定性以及提供错误提示
- 解决h5预览图片旋转90°问题
- 增加腾讯云上传图片插件


### 使用Step1(导入main.js,)=>导入组件这一步可以参考：http://ask.dcloud.net.cn/article/35409
```
 import sunUpImg from './components/sunui-upimg/sunui-upimg.vue'
 Vue.component('sunui-upimg', sunUpImg)
```


### 使用Step2(具体看以下实例)
```
<template>
	<view>
		<view>
			<!-- 不会覆盖限制上传图片数量（也就是count参数生效），notli默认false -->
			<!-- 			<sunui-upimg :upImgConfig="upImgConfig" @onUpImg="upImgData" ref="uImage" />
			<button type="primary" @tap="getUpImgInfo">获取上传图片信息</button> -->

			<sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData"></sunui-upbasic>
			<button type="primary" @tap="getUpImgInfoBasic">获取上传Basic图片信息</button>


			<sunui-upoos :upImgConfig="upImgOos" @onUpImg="upOosData" @onImgDel="delImgInfo"></sunui-upoos>
			<button type="primary" @tap="getUpImgInfoOos">获取上传Oos图片信息</button>

			<sunui-upqiniu :upImgConfig="upImgQiniu" @onUpImg="upQiniuData"></sunui-upqiniu>
			<button type="primary" @tap="getUpImgInfoQiniu">获取上传Qiniu图片信息</button>
			<!-- <button type="primary" @tap="uImageTap">上传图片</button> -->

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				basicArr: [],
				imgArr: [],
				oosArr: [],
				qiniuArr: [],
				// 七牛云相关配置
				upImgQiniu: {
					qiniuConfig: {
						region: 'SCN',
						uptokenURL: 'wuqiangxi',
						uptoken: 'Ycs3ADclVWZAWvqdocpkr2i3oEHtg_LSJSFOBl2E:ByonLMLAXxIoBAp943dIwieET-E=:eyJzY29wZSI6Ind1cWlhbmd4aSIsImRlYWRsaW5lIjoxNTU3MjA1NzA1LCJ1cEhvc3RzIjpbImh0dHA6XC9cL3VwLXoyLnFpbml1LmNvbSIsImh0dHA6XC9cL3VwbG9hZC16Mi5xaW5pdS5jb20iLCItSCB1cC16Mi5xaW5pdS5jb20gaHR0cDpcL1wvMTQuMTUyLjM3LjQiXX0=',
						domain: 'wpx.weijuyunke.cn',
						shouldUseQiniuFileName: false,
						fileHead: 'file',
						key: (new Date()).getTime()
					},
					// 是否开启提示(提醒上传)
					tips: false,
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 2,
					// 相机来源([相机,相册],[相机])
					sourceType: true,
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 新增上传背景修改
					bgColor: '#0089FC',
					// 新增上传icon图标颜色修改(仅限于iconfont)
					iconColor: '#fff',
					// 上传文字描述(仅限四个字)
					text: '上传照片',
					// 删除图标定义背景颜色
					delIconColor: '#f00',
					// 删除图标字体颜色
					delIconText: '',
					// 上传图标替换(+),是个http,https图片地址(https://www.playsort.cn/right.png)
					iconReplace: ''
				},
				// 阿里云oos相关配置
				upImgOos: {
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
					},
					// 是否开启提示(提醒上传)
					tips: false,
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 1,
					// 相机来源([相机,相册],[相机])
					sourceType: true,
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 新增上传背景修改
					bgColor: '#0089FC',
					// 新增上传icon图标颜色修改(仅限于iconfont)
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
				// 基础版配置
				upImgBasic: {
					// 后端图片接口地址
					basicConfig: {
						url: 'https://p.dns06.net.cn/index.php?m=Api&c=index&a=upload'
					},
					// 是否开启提示(提醒上传)
					tips: false,
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 2,
					// 相机来源([相机,相册],[相机])
					sourceType: true,
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 新增上传背景修改
					bgColor: '#0089FC',
					// 新增上传icon图标颜色修改(仅限于iconfont)
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
				// 集成版相关配置
				upImgConfig: {
					// 阿里云相关配置
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
					// 七牛云相关配置
					qiniuConfig: {
						region: 'SCN', // 华北区
						uptokenURL: 'wuqiangxi',
						uptoken: 'Ycs3ADclVWZAWvqdocpkr2i3oEHtg_LSJSFOBl2E:2u_pMpb_4vNZBsYyrsCiwqu3Pvk=:eyJzY29wZSI6Ind1cWlhbmd4aSIsImRlYWRsaW5lIjoxNTU3MDMxMDgxLCJ1cEhvc3RzIjpbImh0dHA6XC9cL3VwLXoyLnFpbml1LmNvbSIsImh0dHA6XC9cL3VwbG9hZC16Mi5xaW5pdS5jb20iLCItSCB1cC16Mi5xaW5pdS5jb20gaHR0cDpcL1wvMTQuMTUyLjM3LjQiXX0=',
						domain: 'wpx.weijuyunke.cn',
						shouldUseQiniuFileName: false,
						fileHead: 'file',
						key: (new Date()).getTime()
					},
					// 后端接口相关配置
					basicConfig: {
						url: 'https://p.dns06.net.cn/index.php?m=Api&c=index&a=upload'
					},
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 2,
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
				}
			};
		},
		onLoad() {
			uni.request({
				url: 'https://a1.dns06.net.cn/app/index.php?i=2&c=entry&a=wxapp&do=Upload_qiniu&m=yyf_company',
				method: 'POST',
				data: {},
				success: res => {
					console.log(res)
					// 七牛云相关配置
					this.upImgQiniu = {
						qiniuConfig: {
							region: 'SCN',
							uptokenURL: 'wuqiangxi',
							uptoken: res.data.info.token,
							domain: 'wpx.weijuyunke.cn',
							shouldUseQiniuFileName: false,
							fileHead: 'file',
							key: (new Date()).getTime()
						},
						// 是否开启提示(提醒上传)
						tips: false,
						// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
						notli: false,
						// 图片数量
						count: 2,
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
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			// 删除图片
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e);
			},
			// 上传图片(2019/3/29新增) -> 手动上传(需要传入上传url,还需要搭配count参数使用!)
			// 			uImageTap() {
			// 				this.$refs.uImage.uploadimage('http://4zlinkimgtest.oss-cn-beijing.aliyuncs.com/');
			// 			},

			// 七牛云
			async upQiniuData(e) {
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						// let reg = /([^\s]+(?=\.(jpg|png|gif))\.\2)/gi;
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.qiniuArr = arrImg;
				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgQiniu.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},

			// 阿里云
			async upOosData(e) {
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.oosArr = arrImg;

				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgOos.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},

			// 基础版
			async upBasicData(e) {
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.basicArr = arrImg;

				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgBasic.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},
			//获取上传图片返回来的数组(完整示例版)
			async upImgData(e) {
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != "") {
							await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.imgArr = arrImg;

				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgConfig.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},
			// 获取上传图片的所有信息(完整示例版)
			getUpImgInfo() {
				console.log('转成多维数组:', this.imgArr);
				console.log('转成一维数组:', this.imgArr.join().split(','));
			},
			// 获取上传图片basic
			getUpImgInfoBasic() {
				console.log('转成多维数组:', this.basicArr);
				console.log('转成一维数组:', this.basicArr.join().split(','));
			},
			// 获取上传图片阿里云
			getUpImgInfoOos() {
				console.log('转成多维数组:', this.oosArr);
				console.log('转成一维数组:', this.oosArr.join().split(','));
			},
			// 获取上传图片七牛云
			getUpImgInfoQiniu() {
				console.log('转成多维数组:', this.qiniuArr);
				console.log('转成一维数组:', this.qiniuArr.join().split(','));
			}
		}
	}
</script>


<style>

</style>

```



##### *其它待开发...*
