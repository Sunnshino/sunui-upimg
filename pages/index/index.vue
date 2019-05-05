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
	export default {
		data() {
			return {
				/**
				 * 图片上传配置项(Chrome模拟器端测试可能会报错CORS/CORB,请使用小程序工具测试,谢谢!)
				 * 
				 * 因个人设计原因->后面版本会提供多个版本分离.
				 * 
				 * (一).使用阿里云oos和公司后端接口须知--我默认注释了七牛云
				 *          使用时注意注释sunui-upimg的33行和135~154行以及212~224行(此屏蔽的代码属于七牛云图片上传)
				 * (二).使用七牛云须知
				 *          使用时注释157~205行(此屏蔽的代码属于阿里云和后端上传)
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
						key: (new Date()).getTime()
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
					maxsize: 1,
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
