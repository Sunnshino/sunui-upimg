<template>
	<view>
		<sunui-upqiniu :upImgConfig="upImgQiniu" @onUpImg="upQiniuData" @onImgDel="delImgInfo" ref="uImages"></sunui-upqiniu>
		<sunui-upqiniu :upImgConfig="upImgQiniu" @onUpImg="upQiniuData2" @onImgDel="delImgInfo" ref="uImage"></sunui-upqiniu>
		<button type="primary" @tap="getUpImgInfoQiniu">获取上传Qiniu图片信息</button>
		<button type="primary" @tap="uImageTap">手动上传图片</button>
	</view>
</template>

<script>
	import sunUiqiNiu from "@/components/sunui-upimg/sunui-upimg-qiniu.vue";
	export default {
		data() {
			return {
				// 配置项1(复用1)
				qiniuArr: [],
				// 配置项2(复用2)
				qiniuArr2: [],
				arrImgs: [],
				// 七牛云相关配置(复用时只需要配置一项即可)
				upImgQiniu: {

				}
			}
		},
		components: {
			'sunui-upqiniu': sunUiqiNiu
		},
		onReady() {
			// 监听页面渲染完成,服务器预览图片传入
			this.arrImgs = [{
				path_server: 'http://a01.dns06.net.cn/tmp/touristappid.o6zAJs6xfs6t1MXi0Bt0DsldjnS0.KKLMyuMY3Sb10aaf10f322ed20df8bc867d11fd8535a.png',
				upload_percent: 100
			}, {
				path_server: 'http://a01.dns06.net.cn/tmp/touristappid.o6zAJs6xfs6t1MXi0Bt0DsldjnS0.KKLMyuMY3Sb10aaf10f322ed20df8bc867d11fd8535a.png',
				upload_percent: 100
			}];
			this.$refs.uImages.initServerImage(this.arrImgs);
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
			// 七牛云(复用1)
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
			async upQiniuData2(e) {
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
				this.qiniuArr2 = arrImg;
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
				console.log('七牛云转成一维数组2:', this.qiniuArr2.join().split(','));
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
						// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
						notli: false,
						// 图片数量
						count: 2,
						// 相机来源(相机->camera,相册->album,两者都有->all,默认all)
						sourceType: 'all',
						// 上传图片背景修改 
						upBgColor: '#467CD4',
						// 上传icon图标颜色修改(仅限于iconfont)
						upIconColor: '#fff',
						// 上传字体图标图标名称(关于扩展,查看iconfont)
						upIconName: 'icon-shangchuantupian',
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
