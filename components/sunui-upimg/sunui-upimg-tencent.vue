<template name='sunui-upimg'>
	<view>
		<view class="sunsin_picture_list">
			<view v-for="(item,index) in upload_picture_list" :key="index" class="sunsin_picture_item">
				<image v-show="item.upload_percent < 100" :src="item.path" mode="aspectFill"></image>
				<image v-show="item.upload_percent == 100" :src="item.path_server" mode="aspectFill" :data-idx="index" @click="previewImgs"></image>
				<view class="sunsin_upload_progress" v-show="item.upload_percent < 100" :data-index="index" @click="previewImg">{{item.upload_percent}}%</view>
				<text class='del' @click='deleteImg' :data-url="item.path_server" :data-index="index" :style="'color:'+upImgConfig.delIconText+';background-color:'+upImgConfig.delIconColor" :hidden="!upImgConfig.isDelIcon">×</text>
			</view>
			<view>
				<view class='sunsin_picture_item' v-show="upload_picture_list.length<upImgConfig.count || upImgConfig.notli" v-if="upImgConfig.iconReplace =='' || upImgConfig.iconReplace==undefined">
					<view class="sunsin_add_image" @click='chooseImage(upImgConfig.count)' :style="'background-color:'+upImgConfig.bgColor+''">
						<view class="icon-addicon"></view>
						<view class="icon-text" :style="'color:'+upImgConfig.iconColor+';width:100%;'">{{upImgConfig.text}}</view>
					</view>
				</view>
				<view class='sunsin_picture_item' v-show="upload_picture_list.length<upImgConfig.count || upImgConfig.notli" v-else>
					<view class="sunsin_add_image" @click='chooseImage(upImgConfig.count)' :style="'background-color:#fff;'">
						<image :src="upImgConfig.iconReplace" class="icon_replace"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const COS = require('./tencent-cos/cos-wx-sdk-v5.js');
	// #ifdef APP-PLUS
	const compressImage = require('../common/sunui-upimg-util.js'); //引入这位小伙伴的工具集:http://ext.dcloud.net.cn/plugin?id=341
	const device = uni.getSystemInfoSync();
	// #endif
	export default {
		data() {
			return {
				upload_after_list: [],
				upload_picture_list: [],
			};
		},
		name: 'sunui-upimg',
		props: {
			upImgConfig: {
				type: Object
			}
		},
		methods: {
			chooseImage(count) {
				cImage(this, parseInt(count), this.upImgConfig);
			},
			uploadimage(e) {
				uImage(this, e);
			},
			deleteImg(e) {
				dImage(e, this);
			},
			previewImg(e) {
				pImage(e, this);
			},
			previewImgs(e) {
				puImage(e, this);
			}
		}

	}

	// 上传文件
	const upload_file_server = async (_this, configs, upload_picture_list, j) => {

		// 腾讯云配置
		let cosConfig = {
			Bucket: configs.Bucket,
			Region: configs.Region,
			SecretId: configs.SecretId,
			SecretKey: configs.SecretKey
		}

		let cos = new COS({
			getAuthorization: (params, callback) => { //获取签名 必填参数
				let authorization = COS.getAuthorization({
					SecretId: cosConfig.SecretId,
					SecretKey: cosConfig.SecretKey,
					Method: params.Method,
					Key: params.Key
				});
				callback(authorization);
			}
		});


		// 腾讯云v5上传出错信息
		const requestCallback = (err, data) => {
			if (err && err.error) {
				uni.showModal({
					title: '返回错误',
					content: '请求失败：' + err.error.Message + '；状态码：' + err.statusCode,
					showCancel: false
				});
			} else if (err) {
				uni.showModal({
					title: '请求出错',
					content: '请求出错：' + err + '；状态码：' + err.statusCode,
					showCancel: false
				});
			} else {
				uni.showToast({
					title: '请求成功',
					icon: 'success',
					duration: 3000
				});
			}
		};

		cos.postObject({
			Bucket: cosConfig.Bucket,
			Region: cosConfig.Region,
			Key: new Date().getTime() + Math.floor(Math.random() * 150),
			FilePath: upload_picture_list[j]['path'],
			onProgress: (info) => {
				console.log(JSON.stringify(info));
			}
		}, requestCallback);

		// 		const upload_task = await uni.uploadFile({
		// 			url: basicConfig.url,
		// 			filePath: upload_picture_list[j]['path'],
		// 			name: 'file',
		// 			formData: {},
		// 			async success(res) {
		// 				if (res.statusCode == 200) {
		// 					let data = JSON.parse(res.data);
		// 					console.log('打印后端反馈的信息:', data);
		// 					// 先获取图片url(各个后端返回值不一，所以造成出入)
		// 					// 修改获取的图片返回值路径
		// 					// 提示：data.info改为你图片返回地址即可
		// 					upload_picture_list[j]['path_server'] = data.info; //修改返回图片地址即可(2019/05/06) => 无论是腾讯云还是阿里云或者其它(只要返回图片地址以及引入对应的js文件进行一些配置即可扩展本插件)
		// 					_this.upload_picture_list = upload_picture_list;
		// 					await _this.$emit('onUpImg', _this.upload_picture_list);
		// 					uni.hideLoading();
		// 				}
		// 			},
		// 			async fail(err) {
		// 				uni.showLoading({
		// 					title: `上传失败!`
		// 				})
		// 				setTimeout(() => {
		// 					uni.hideLoading();
		// 				}, 2000)
		// 				console.log(err)
		// 			}
		// 		});
		// 		upload_task.onProgressUpdate(async (res) => {
		// 			for (let i = 0, len = _this.upload_picture_list.length; i < len; i++) {
		// 				upload_picture_list[i]['upload_percent'] = await res.progress;
		// 			}
		// 			_this.upload_picture_list = upload_picture_list
		// 		});
	}

	const compressImageHandler = async (src) => {
		console.log('platform===' + device.platform)
		const tempPath = await compressImage(src, device.platform);
		console.log('tempPath-----' + tempPath);
		return tempPath;
	}


	// 上传图片(通用)
	const uImage = async (_this, config) => {
		console.log('URL:', config);
		for (let j = 0, len = _this.upload_picture_list.length; j < len; j++) {
			if (_this.upload_picture_list[j]['upload_percent'] == 0) {
				await upload_file_server(_this, config, _this.upload_picture_list, j)
			}
		}
	}

	// 删除图片(通用)
	const dImage = async (e, _this) => {
		await _this.$emit('onImgDel', {
			url: e.currentTarget.dataset.url
		});
		_this.upload_picture_list.splice(e.currentTarget.dataset.index, 1);
		_this.upload_after_list.splice(e.currentTarget.dataset.index, 1);
		_this.upload_picture_list = _this.upload_picture_list;
	}

	// 选择图片(通用)
	const cImage = (_this, count, configs) => {
		let config = {
			basicConfig: {
				url: configs.basicConfig.url
			},
			count,
			notli: configs.notli,
			sourceType: configs.sourceType,
			sizeType: configs.sizeType,
			tips: configs.tips || false
		}
		uni.chooseImage({
			count: config.notli ? config.count = 9 : _this.upload_after_list.length == 0 ? config.count : config.count -
				_this.upload_after_list.length,
			sizeType: config.sizeType ? ['compressed'] : ['original'],
			sourceType: config.sourceType ? ['album', 'camera'] : ['camera'],
			success: async (res) => {
				for (let i = 0, len = res.tempFiles.length; i < len; i++) {
					res.tempFiles[i]['upload_percent'] = 0;
					res.tempFiles[i]['path_server'] = '';
					// #ifdef APP-PLUS
					const src = await compressImageHandler(res.tempFilePaths[i]);
					_this.upload_picture_list.push(src);
					// #endif
					_this.upload_picture_list.push(res.tempFiles[i]);
					_this.upload_picture_list.length > config.count ? _this.upload_picture_list = _this.upload_picture_list.slice(
						0,
						config.count) : '';
				}!config.notli && config.count == _this.upload_picture_list.length ? uImage(_this, config) : '';
				config.notli && config.count == 9 ? uImage(_this, config) : '';
				if (config.tips) {
					config.notli ? console.log(`%c up-img提醒您，开启了最大上传图片模式(单次选择最多9张,选择完即上传)`,
						`color:#f00;font-weight:bold;`) : console.log(
						`%c up-img提醒您，开启了限制上传图片模式，目标数量为：${config.count}`, `color:#f00;font-weight:bold;`);
				}
				_this.upload_after_list = _this.upload_after_list.concat(res.tempFilePaths).slice(0, config.count);
				_this.upload_picture_list = _this.upload_picture_list.slice(0, config.count);
			}
		})
	}

	// 上传前预览图片(通用)
	const pImage = (e, _this) => {
		uni.previewImage({
			current: _this.upload_after_list[e.currentTarget.dataset.index],
			urls: _this.upload_after_list
		})
	}

	// 上传后预览(通用)
	const puImage = async (e, _this) => {
		let cacheImg = [];
		for (let i = 0, len = _this.upload_picture_list.length; i < len; i++) {
			// #ifdef APP-PLUS
			const src = await compressImageHandler(_this.upload_picture_list[i].path);
			cacheImg.push(src);
			// #endif
			cacheImg.push(_this.upload_picture_list[i].path);
		}
		uni.previewImage({
			current: cacheImg[e.currentTarget.dataset.idx],
			urls: cacheImg
		})
	}
</script>


<style scoped>
	/* 
		2019/05/05,新增svg(准备替换iconfont)->仍需使用iconfont,可以参考sunui-upimg.vue
		微信小程序不支持本地,而Apple不支持网络路径.所以你可能需要多写点兼容了,以下已给出示例.
		只需要去:https://www.iconfont.cn/search/index?searchType=icon&q=%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87下载对应的svg图标即可
	*/
	.icon-addicon {
		display: block;
		width: 72upx;
		height: 72upx;
		text-indent: 100%;
		overflow: hidden;
		white-space: nowrap;
		/* #ifdef MP-WEIXIN */
		background: url('https://www.playsort.cn/file/icon-up.svg') no-repeat;
		/* #endif */
		/* #ifdef H5 */
		background: url('../static/sunui-upimg/icon/icon-up.svg') no-repeat;
		/* #endif */
		background-position: center;
		background-size: cover;
	}

	.icon-text {
		font-size: 28upx;
		margin-top: -25%;
	}

	/* 循环列表样式 */
	.sunsin_picture_list {
		width: 96%;
		padding: 2%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: flex-start;
		flex-direction: row;
		justify-content: flex-start;
	}

	.sunsin_picture_list image {
		width: 40upx;
		height: 40upx;
		margin: 0 4%;
	}

	/* 添加图片样式 */
	.sunsin_add_image {
		width: 160upx;
		height: 160upx;
		color: #ddd;
		font-size: 144upx;
		text-align: center;
		margin: 2% 0 0 2%;
		background-color: #eee;
		cursor: pointer;
		border-radius: 8upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	/* 预览图片 */
	.sunsin_picture_item {
		position: relative;
		width: 160upx;
		height: 160upx;
		margin: 20upx;
		margin-left: 0;
	}

	/* 删除按钮样式 */
	.sunsin_picture_item .del {
		position: absolute;
		top: 0;
		right: -4.2%;
		color: #fff;
		border-radius: -4upx;
		border-top-right-radius: 6upx;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		z-index: 2;
		text-align: center;
		background-color: #E54D42;
	}

	/* 进度遮罩层样式 */
	.sunsin_upload_progress {
		font-size: 24upx;
		color: #fff;
		width: 160upx;
		height: 160upx;
		margin-left: 4%;
		text-align: center;
		line-height: 160upx;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.7;
		border-radius: 8upx;
		background-color: #000;
	}

	/* 自定义添加图片样式 */
	.sunsin_picture_item image {
		width: 160upx;
		height: 160upx;
		box-shadow: 6upx 6upx 12upx rgba(112, 128, 144, 0.7);
		border-radius: 15upx;
	}
</style>
