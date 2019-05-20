<template>
	<view>
		<sunui-upcos :upImgConfig="upImgCos" @onUpImg="upCosData" @onImgDel="delImgInfo" ref="uImage"></sunui-upcos>
		<button type="primary" @tap="getUpImgInfoCos">获取上传Cos图片信息</button>
		<button type="primary" @tap="uImageTap">手动上传图片</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cosFlag:true,
				cosArr: [],
				upImgCos: {
					cosConfig: {
						Bucket: 'uniapp-1257202511', //replace with yours
						Region: 'ap-chengdu', //replace with yours
						SecretId: 'AKIDlzhgQX1Siv76tYR2LP6hAlXD9wlo9v1w', //replace with yours
						SecretKey: '8OekJdjBNOI1Vt8tbAWkviSzxkMtBD0G' //replace with yours
					},
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 2,
					// 上传图片背景修改 
					upBgColor: '#E8A400',
					// 上传icon图标颜色修改(仅限于iconfont)
					upIconColor: '#eee',
					// 上传svg图标名称
					upSvgIconName: 'icon-certificate'
				}
			}
		},
		methods: {
			// 手动上传图片(适用于表单等上传) -2019/05/10增加
			uImageTap() {
				this.$refs.uImage.uploadimage(this.upImgCos);
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e);
			},
			// 腾讯云
			async upCosData(e) {
				if(this.cosFlag){
					this.cosArr = await e;
					// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
					if (this.cosArr.length == this.upImgCos.cosConfig.count) {
						uni.showToast({
							title: `上传成功`,
							icon: 'none'
						});
					}
				}
				this.cosFlag = false;
				
			},
			// 获取上传图片腾讯云
			async getUpImgInfoCos() {
				let arrImg = [];
				for (let i = 0, len = this.cosArr.length; i < len; i++) {
					try {
						if (this.cosArr[i].path_server != "") {
							await arrImg.push(this.cosArr[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				console.log('腾讯云转成一维数组:', arrImg.join().split(','));
			}
		}
	}
</script>

<style>

</style>
