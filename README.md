>**upimg for uniApp**  
>**请star并且watch本项目,以便得到最新的UI('_')**   
>**推荐测试运行环境小程序开发者工具,避免出现CORS/CORB**  
>**如上传以后,出现错误(非CORS/CORB),就去修改图片返回地址,在各个插件版本有注释**  


---------------------

### 分离源码(后端版10k、阿里云版12k、七牛云版11k)
>例子：假如我使用七牛云的上传图片(sunui-upimg目录我就只需要保留sunui-upimg-qiniu.vue和“qiniu”文件夹即可;在sunui-upimg目录其它均可删除)
- sunui-upimg-basic.vue(后端版),极易扩展
- sunui-upimg-alioos.vue(阿里云版),需要复制文件夹“ali-oos”
- sunui-upimg-qiniu.vue(七牛云版),需要复制文件夹“qiniu”
- sunui-sunui-upimg-tencent(腾讯云版),需要复制文件夹“tencent-cos”(**暂时不可用,请勿使用!!!**)

---------------------

### 现阶段支持功能如下

- 图片上传前预览
- 图片上传后预览
- 图片预览删除(可调接口删除,详情看阿里云删除返回)
- 图片添加
- 图片上传限制
- 图片无上传限制
- 图片上传进度监控
- 支持阿里云oos图片上传
- 支持单页面多复用(@onUpImg="xxxx")
- 支持图片上传容量控制,单位为M,向上取整(暂时关闭该功能)
- 支持七牛云图片上传
- 支持手动上传(多谢**“手动党”**提出的建议->节约流量)

---------------------


### 新增功能
- 支持手动上传图片 --2019/03/28
- 新增七牛云图片上传支持 --2019/05/05
- 新增隐藏删除图标 --2019/05/08
- 手动上传图片 --2019/05/10(小伙伴们注意了,**图片上传也不是那么快的**)

---------------------

### 通用配置

|版本号	|更新时间	|关键字			|功能作用																			|类型			|
|--		|--			|--				|--																					|--				|
|v1.x	|			|tips			|显示将要上传图片的提示信息															|Boolean		|
|v1.x	|			|notli			|是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)			|Boolean		|
|v1.x	|			|count			|上传图片数量																		|String,Number	|
|v1.x	|			|sourceType		|照片来源([相机,相册],[相机])														|Boolean		|
|v1.x	|			|sizeType		|是否压缩上传照片(仅小程序生效)														|Boolean		|
|v1.x	|			|bgColor		|上传背景颜色更改																	|RGB			|
|v1.x	|			|iconColor		|上传icon图标颜色修改(仅限于字体图标/iconfont)										|RGB			|
|v1.x	|			|text			|上传文字描述(仅限四个字,默认上传图片)												|String			|
|v1.x	|			|delIconColor	|删除按钮的背景颜色																	|RGB			|
|v1.x	|			|delIconText	|删除按钮的文字颜色																	|RGB			|
|v1.x	|			|iconReplace	|使用图片来替换上传图片(需要是http/https链接地址)									|String			|
|v2.1	|2019/05/08	|isDelIcon		|是否显示上传图片的删除图标															|Boolean		|
|v2.1	|2019/05/08	|isAddImage		|是否显示上传图片的添加按钮															|Boolean		|
|v2.24	|2019/05/10	|iconLocation	|上传图片的删除图标位置:左上角(left)、右上角(right)、左下角(bleft)、右下角(bright)	|String			|





### BUG以及更改

|版本号		|修复(更改)时间	|更新(提示)内容																														|
|--			|--				|--																																	|
|v1.x		|				|上传图片组件progress进度条bug修改																									|
|v1.x		|				|上传图片组件内进行注释修改																											|
|v1.x		|				|上传图片组件已支持阿里云oos																										|
|v1.x		|				|修改选择图片bug以及选择数量限制(仅小程序、App端、h5不限制选择数量但已做处理)														|
|v1.9		|2019/05/05		|iconfont图标对比svg性能以及实用性来说,下个版本会使用svg																			|
|v1.9		|2019/05/05		|2.0版本已使用svg图标,如使用iconfont,可参考sunui-upimg.vue																			|
|v2.0		|2019/05/06		|版本2.1增强稳定性以及错误提示																										|
|v2.1		|2019/05/07		|修复未上传图片预览,增加预览前图片提示(sunui-upimg.vue)																				|
|v2.2(beta)	|2019/05/08		|修复App上传后旋转90°(等待测试),引入(**http://ext.dcloud.net.cn/plugin?id=341**)  h5待修复;sunui-upimg.vue暂时停止更新,而后增注释版	|
|v2.2(beta)	|2019/05/08		|尽量使用微信开发者工具测试,(阿里云、七牛云、后端)测试提供的接口尽量选择小容量图片,只要参数引入正确就OK								|
|v2.2(beta)	|2019/05/08		|优化一些样式,增加些注释**;譬如上传身份证模板改造一下样式即可使用**																	|
|v2.2(beta)	|2019/05/08		|通过配置参数(isDelIcon:true/false)可动态显示/隐藏删除按钮																			|
|v2.2(beta)	|2019/05/08		|通过配置参数(isAddImage:true/false)可动态显示/隐藏添加图片图标																		|
|v2.2(beta)	|2019/05/08		|腾讯云云存储未使用过,所以暂时不可用																								|
|v2.2(beta)	|2019/05/09		|更改App条件编译,优化七牛云和阿里云以及上传失败后置空,并打印一些错误信息															|
|v2.2(beta)	|2019/05/09		|**拍照逆转90°的原因是:ios/android竖屏拍照导致倾斜90°**,用兼容写法的话,代价太大(增加了很多代码容量,后续看情况兼容或者提供最简版本)	|
|v2.21		|2019/05/09		|置空上传失败后的图片路径,因上传失败有很多种原因,所以就没有一一测试																	|
|v2.22		|2019/05/10		|删除sunui-upimg.vue,更新使用文档																									|
|v2.25		|2019/05/10		|可引入iconfont自定义删除图标,具体引入请查看sunui-upimg-basic																		|
|v2.26		|2019/05/11		|可**手动(调用)上传图片**,具体查看阿里云上传示例,**注意配合count参数**使用; 注意看方法:**uImageTap**								|
|v2.27		|2019/05/11		|修改配置文件,使其更加标准化、语义化																								|



---------------------

### 后期计划

- 增强稳定性以及提供错误提示
- 解决h5预览图片旋转90°问题
- 增加腾讯云上传图片插件
- 删除图标可动态设置(上、左、下、右)
- 使用canvas压缩上传前的图片


### 使用Step1(导入main.js,)=>导入组件这一步可以参考：http://ask.dcloud.net.cn/article/35409
```
import sunUiBasic from './components/sunui-upimg/sunui-upimg-basic.vue'
import sunUiOos from './components/sunui-upimg/sunui-upimg-alioos.vue'
import sunUiqiNiu from './components/sunui-upimg/sunui-upimg-qiniu.vue'
Vue.component('sunui-upbasic',sunUiBasic)
Vue.component('sunui-upoos',sunUiOos)
Vue.component('sunui-upqiniu',sunUiqiNiu)
```

### 使用Step2(具体看以下实例)
```
<template>
	<view>
		<view>

			<sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData"></sunui-upbasic>
			<button type="primary" @tap="getUpImgInfoBasic">获取上传Basic图片信息</button>

			<sunui-upoos :upImgConfig="upImgOos" @onUpImg="upOosData" @onImgDel="delImgInfo" ref="uImage"></sunui-upoos>
			<button type="primary" @tap="getUpImgInfoOos">获取上传Oos图片信息</button>
			<button type="primary" @tap="uImageTap">手动上传图片</button>

			<sunui-upqiniu :upImgConfig="upImgQiniu" @onUpImg="upQiniuData"></sunui-upqiniu>
			<button type="primary" @tap="getUpImgInfoQiniu">获取上传Qiniu图片信息</button>

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
				cosArr: [],
				upImgCos: {
					cosConfig: {
						Bucket: 'test-1256264554', //replace with yours
						Region: 'ap-shanghai', //replace with yours
						SecretId: 'AKID32qSZjlaJqERTJriDb5AAat3c6TfPR7', //replace with yours
						SecretKey: 'AGKtOitGco5crbGm7GHZntpgfgdXVL0' //replace with yours
					}
				},
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
					// 是否开启提示(提醒上传图片的数量)
					tips: true,
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 5,
					// 相机来源([相机,相册],[相机])
					sourceType: true,
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 上传图片背景修改 
					upBgColor: '#E8A400',
					// 上传icon图标颜色修改(仅限于iconfont)
					upIconColor: '#fff',
					// 上传文字描述(仅限四个字)
					upTextDesc: '上传照片',
					// 删除按钮位置(left,right,bleft,bright),默认右上角
					delBtnLocation: 'bleft',
					// 是否显示添加图片
					isAddImage: true,
					// 是否显示删除图标
					isDelIcon: true,
					// 删除图标定义背景颜色
					delIconColor: '',
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
						url: 'http://4zlinkimgtest.oss-cn-beijing.aliyuncs.com/'
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
					// 上传图片背景修改 
					upBgColor: '#0089FC',
					// 上传icon图标颜色修改(仅限于iconfont)
					upIconColor: '#fff',
					// 上传文字描述(仅限四个字)
					upTextDesc: '上传照片',
					// 删除按钮位置(left,right,bleft,bright),默认右上角
					delBtnLocation: 'bright',
					// 是否显示添加图片
					isAddImage: true,
					// 是否显示删除图标
					isDelIcon: true,
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
					// 上传图片背景修改 
					upBgColor: '#1AA034',
					// 上传icon图标颜色和描述文字修改(仅限于iconfont)
					upIconColor: '#fff',
					// 上传文字描述(仅限四个字)
					upTextDesc: '上传照片',
					// 删除按钮位置(left,right,bleft,bright),默认右上角
					delBtnLocation: 'right',
					// 是否显示添加图片
					isAddImage: true,
					// 是否显示删除图标
					isDelIcon: true,
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
							region: res.data.info.area,
							uptokenURL: res.data.info.bucket,
							uptoken: res.data.info.token,
							domain: res.data.info.url,
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
						// 上传图片背景修改 
						upBgColor: '#E8A400',
						// 上传icon图标颜色修改(仅限于iconfont)
						upIconColor: '#fff',
						// 上传文字描述(仅限四个字)
						upTextDesc: '上传照片',
						// 删除按钮位置(left,right,bleft,bright),默认右上角
						delBtnLocation: 'bleft',
						// 是否显示添加图片
						isAddImage: true,
						// 是否显示删除图标
						isDelIcon: true,
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
			// 手动上传图片(适用于表单等上传) -2019/05/10增加
			uImageTap() {
				this.$refs.uImage.uploadimage(this.upImgOos);
			},
			// 删除图片
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e);
			},
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
			// 获取上传图片basic
			getUpImgInfoBasic() {
				console.log('转成一维数组:', this.basicArr.join().split(','));
			},
			// 获取上传图片阿里云
			getUpImgInfoOos() {
				console.log('转成一维数组:', this.oosArr.join().split(','));
			},
			// 获取上传图片七牛云
			getUpImgInfoQiniu() {
				console.log('转成一维数组:', this.qiniuArr.join().split(','));
			}
		}
	}
</script>


<style>
	button,
	button:after {
		border-radius: 0;
	}
</style>


```

### License
#### MIT  
Copyright (c) 2018-present, 1940694428@qq.com

##### *其它待开发...*
