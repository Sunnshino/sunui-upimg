<template>
	<view>
		<sunui-upqiniu :upImgConfig="upImgQiniu" @onUpImg="upQiniuData" @onImgDel="delImgInfo" ref="uImage"></sunui-upqiniu>
		<button type="primary" @tap="getUpImgInfoQiniu">获取上传Qiniu图片信息</button>
		<button type="primary" @tap="uImageTap">手动上传图片</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
					// 是否开启提示(提醒上传图片的数量)
					// tips: false,
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 2,
					// 相机来源(相机->camera,相册->album,两者都有->all,默认all)
					sourceType: 'camera',
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 上传图片背景修改 
					upBgColor: '#467CD4',
					// 上传icon图标颜色修改(仅限于iconfont)
					upIconColor: '#fff',
					// 上传svg图标名称
					upSvgIconName: 'icon-card',
					// 上传文字描述(仅限四个字)
					upTextDesc: '上传身份证',
					// 删除按钮位置(left,right,bleft,bright),默认右上角
					// delBtnLocation: 'bleft',
					// 是否隐藏添加图片
					// isAddImage: false,
					// 是否隐藏删除图标
					// isDelIcon: false,
					// 删除图标定义背景颜色
					// delIconColor: '',
					// 删除图标字体颜色
					// delIconText: '',
					// 上传图标替换(+),是个http,https图片地址(https://www.playsort.cn/right.png)
					iconReplace: ''
				}
			}
		},
		methods: {
			// 手动上传图片(适用于表单等上传) -2019/05/10增加
			uImageTap() {
				this.$refs.uImage.uploadimage(this.upImgQiniu);
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.qiniuArr.splice(e.index, 1));
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
			// 获取上传图片七牛云
			getUpImgInfoQiniu() {
				console.log('七牛云转成一维数组:', this.qiniuArr.join().split(','));
			}
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
						// 是否开启提示(提醒上传图片的数量)
						// tips: false,
						// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
						notli: false,
						// 图片数量
						count: 2,
						// 相机来源([相机,相册],[相机])
						sourceType: true,
						// 是否压缩上传照片(仅小程序生效)
						sizeType: true,
						// 上传图片背景修改 
						upBgColor: '#467CD4',
						// 上传icon图标颜色修改(仅限于iconfont)
						upIconColor: '#fff',
						// 上传svg图标名称
						upSvgIconName: 'icon-card',
						// 上传文字描述(仅限四个字)
						// upTextDesc: '上传证书',
						// 删除按钮位置(left,right,bleft,bright),默认右上角
						// delBtnLocation: 'bleft',
						// 是否隐藏添加图片
						// isAddImage: false,
						// 是否隐藏删除图标
						// isDelIcon: false,
						// 删除图标定义背景颜色
						// delIconColor: '',
						// 删除图标字体颜色
						// delIconText: '',
						// 上传图标替换(+),是个http,https图片地址(https://www.playsort.cn/right.png)
						iconReplace: ''
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style>

</style>
