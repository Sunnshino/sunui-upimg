<template name='sunui-upimg'>
	<view>
		<view class="sunsin_picture_list">
			<view v-for="(item,index) in upload_picture_list" :key="index" class="sunsin_picture_item">
				<image v-show="item.upload_percent < 100" :src="item.path" mode="aspectFill"></image>
				<image v-show="item.upload_percent == 100" :src="item.path_server" mode="aspectFill" :data-idx="index" @click="previewImgs"></image>
				<view class="sunsin_upload_progress" v-show="item.upload_percent < 100" :data-index="index" @click="previewImg">{{item.upload_percent}}%</view>
				<text class='del' @click='deleteImg' :data-url="item.path_server" :data-index="index" :style="'color:'+upImgConfig.delIconText+';background-color:'+upImgConfig.delIconColor">×</text>
			</view>
			<view>
				<view class='sunsin_picture_item' v-show="upload_picture_list.length<upImgConfig.count || upImgConfig.notli" v-if="upImgConfig.iconReplace =='' || upImgConfig.iconReplace==undefined">
					<view class="sunsin-add-image" @click='chooseImage(upImgConfig.count)' :style="'background-color:'+upImgConfig.bgColor+''">
						<view class="icon-addicon"></view>
						<view class="icon-text" :style="'color:'+upImgConfig.iconColor+''">{{upImgConfig.text}}</view>
					</view>
				</view>
				<view class='sunsin_picture_item' v-show="upload_picture_list.length<upImgConfig.count || upImgConfig.notli" v-else>
					<view class="sunsin-add-image" @click='chooseImage(upImgConfig.count)' :style="'background-color:#fff;'">
						<image :src="upImgConfig.iconReplace" mode="widthFix" style="width: 160upx;height: 160upx;"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const qiniuUploader = require('./qiniu/qiniuUploader.js');
	export default {
		data() {
			return {
				imgs: [],
				upLen: "",
				upload_picture_list: [],
			};
		},
		name: 'sunui-upimg',
		props: {
			upImgConfig: {
				type: Object
			}
		},
		created() {
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
	const upload_file_server = async (url, _this, configs, upload_picture_list, j) => {
		let qiniuConfig = {
			region: configs.qiniuConfig.region,
			uptokenURL: configs.qiniuConfig.uptokenURL,
			uptoken: configs.qiniuConfig.uptoken,
			domain: configs.qiniuConfig.domain,
			shouldUseQiniuFileName: configs.qiniuConfig.shouldUseQiniuFileName || false,
			fileHead: configs.qiniuConfig.fileHead || 'file',
			key: configs.qiniuConfig.key || (new Date()).getTime()
		}
		initQiniu(qiniuConfig);
		qiniuUploader.upload(upload_picture_list[j]['path'], async (res) => {
				upload_picture_list[j]['path_server'] = `http://${res.fileUrl}`;
				_this.upload_picture_list = upload_picture_list;
				await _this.$emit('onUpImg', _this.upload_picture_list);
			}, (error) => {
				console.error('error: ' + JSON.stringify(error));
			},
			null,
			(progress) => {
				for (let i = 0, len = _this.upload_picture_list.length; i < len; i++) {
					upload_picture_list[i]['upload_percent'] = progress.progress;
				}
				_this.upload_picture_list = upload_picture_list
				// 				console.log('上传进度', progress.progress)
				// 				console.log('已经上传的数据长度', progress.totalBytesSent)
				// 				console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
			});

	}
	const initQiniu = async (qiniuConfig) => {
		let timestamp = (new Date()).getTime();
		let options = {
			region: qiniuConfig.region || 'NCN', // 华北区
			uptokenURL: qiniuConfig.uptokenURL || 'https://[yourserver.com]/api/uptoken',
			uptoken: qiniuConfig.uptoken || 'xxxx=',
			domain: qiniuConfig.domain || 'http://[yourBucketId].bkt.clouddn.com',
			shouldUseQiniuFileName: qiniuConfig.shouldUseQiniuFileName || false,
			fileHead: qiniuConfig.fileHead || 'file',
			key: qiniuConfig.key || timestamp
		};
		await qiniuUploader.init(options);
	}

	// 上传图片(通用)
	const uImage = async (_this, url, config) => {
		for (let j = 0, len = _this.upload_picture_list.length; j < len; j++) {
			if (_this.upload_picture_list[j]['upload_percent'] == 0) {
				await upload_file_server(url, _this, config, _this.upload_picture_list, j)
			}
		}
	}

	// 删除图片(通用)
	const dImage = async (e, _this) => {
		await _this.$emit('onImgDel',{url:e.currentTarget.dataset.url});
		_this.upload_picture_list.splice(e.currentTarget.dataset.index, 1);
		_this.imgs.splice(e.currentTarget.dataset.index, 1);
		_this.upload_picture_list = _this.upload_picture_list;
	}


	// 选择图片(通用)
	const cImage = (_this, count, configs) => {
		let config = {
			qiniuConfig: {
				region: configs.qiniuConfig.region,
				uptokenURL: configs.qiniuConfig.uptokenURL,
				uptoken: configs.qiniuConfig.uptoken,
				domain: configs.qiniuConfig.domain,
				shouldUseQiniuFileName: configs.qiniuConfig.shouldUseQiniuFileName,
				fileHead: 'file',
				key: configs.qiniuConfig.key || (new Date()).getTime(),
				qiniu: configs.qiniuConfig.qiniu
			},
			count: count,
			notli: _this.upImgConfig.notli,
			sourceType: _this.upImgConfig.sourceType,
			sizeType: _this.upImgConfig.sizeType
		}
		uni.chooseImage({
			count: config.notli ? config.count = 9 : _this.imgs.length == 0 ? config.count : config.count - _this.imgs.length,
			sizeType: config.sizeType ? ['compressed'] : ['original'],
			sourceType: config.sourceType ? ['album', 'camera'] : ['camera'],
			success(res) {
				for (let i = 0, len = res.tempFiles.length; i < len; i++) {
					res.tempFiles[i]['upload_percent'] = 0;
					res.tempFiles[i]['path_server'] = '';
					_this.upload_picture_list.push(res.tempFiles[i]);
					_this.upload_picture_list.length > config.count ? _this.upload_picture_list = _this.upload_picture_list.slice(0,
						config.count) : '';
				}
				!config.notli && config.count == _this.upload_picture_list.length ? uImage(_this, url, config) : '';
				config.notli && config.count == 9 ? uImage(_this, url, config) : '';
				config.notli ? console.log(`%c up-img提醒您，开启了最大上传图片模式(单次选择最多9张,选择完即上传)`,
					`color:#f00;font-weight:bold;`) : console.log(
					`%c up-img提醒您，开启了限制上传图片模式，目标数量为：${config.count}`, `color:#f00;font-weight:bold;`);
				_this.imgs = _this.imgs.concat(
					res.tempFilePaths).slice(0, config.count);
				_this.upload_picture_list = _this.upload_picture_list.slice(0, config.count);
			}
		})
	}

	// 上传前预览图片(通用)
	const pImage = (e, _this) => {
		uni.previewImage({
			current: _this.imgs[e.currentTarget.dataset.index],
			urls: _this.imgs
		})
	}

	// 上传后预览(通用)
	const puImage = (e, _this) => {
		let cacheImg = [];
		for (let i = 0, len = _this.upload_picture_list.length; i < len; i++) {
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
		background: url('../static/sunui-upimg/icon/icon-up.svg') no-repeat;
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

	.sunsin_picture_list {
		width: 100%;
		padding: 20upx;
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

	.sunsin-add-image {
		width: 160upx;
		height: 160upx;
		color: #ddd;
		font-size: 144upx;
		text-align: center;
		margin: 2% 0 0 2%;
		background-color: #eee;
		cursor: pointer;
		border-radius: 10upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.sunsin_picture_item {
		margin: 20upx;
		margin-left: 0;
		position: relative;
		width: 160upx;
		height: 160upx;
	}

	.sunsin_picture_item .del {
		position: absolute;
		top: 0;
		right: -6upx;
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

	.sunsin_upload_progress {
		font-size: 24upx;
		color: #fff;
		width: 162upx;
		height: 160upx;
		margin-left: 3%;
		text-align: center;
		line-height: 160upx;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.7;
		border-radius: 8upx;
		background-color: #000;
	}

	.sunsin_picture_item image {
		width: 160upx;
		height: 160upx;
		box-shadow: 6upx 6upx 12upx rgba(112, 128, 144, 0.7);
		border-radius: 15upx;
	}
</style>
