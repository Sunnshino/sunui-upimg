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
	const env = require('./ali-oos/config.js'); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;
	const base64 = require('./ali-oos/base64.js'); //Base64,hmac,sha1,crypto相关算法
	require('./ali-oos/hmac.js');
	require('./ali-oos/sha1.js');
	const Crypto = require('./ali-oos/crypto.js');
	export default {
		data() {
			return {
				imgs: [],
				upLen: "",
				upload_picture_list: [],
				cacheBlob: ''
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
				cImage(this, parseInt(count), this.upImgConfig, this.upImgConfig.url);
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
	const getPolicyBase64 = () => {
		let date = new Date();
		date.setHours(date.getHours() + env.timeout);
		let srcT = date.toISOString();
		const policyText = {
			"expiration": srcT,
			"conditions": [
				["content-length-range", 0, 5 * 1024 * 1024]
			]
		};
		const policyBase64 = base64.encode(JSON.stringify(policyText));
		return policyBase64;
	}
	const getSignature = (_this, policyBase64) => {
		const accesskey = _this.upImgConfig.aliConfig.AccessKeySecret || env.AccessKeySecret;
		const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
			asBytes: true
		});
		const signature = Crypto.util.bytesToBase64(bytes);
		return signature;
	}

	// 上传文件
	const upload_file_server = async (url, _this, configs, upload_picture_list, j) => {
		
		let aliConfig = {
			aliyunFileKey: `${configs.aliConfig.oosDirectory}/` + new Date().getTime() + Math.floor(Math.random() *
					150) +
				'.png',
			aliyunServerURL: configs.aliConfig.url,
			accessid: configs.aliConfig.OSSAccessKeyId,
			url: configs.aliConfig.url || "",
			oos: configs.aliConfig.oos || false
		}
		
		const aliyunFileKey = aliConfig.aliyunFileKey ? aliConfig.aliyunFileKey : "";
		const aliyunServerURL = aliConfig.aliyunServerURL ? aliConfig.aliyunServerURL : "";
		const accessid = aliConfig.accessid ? aliConfig.accessid : "";
		const policyBase64 = getPolicyBase64();
		const signature = getSignature(_this, policyBase64);
		

		const upload_task = await uni.uploadFile({
			url: aliConfig.url,
			filePath: upload_picture_list[j]['path'],
			name: 'file',
			formData: {
				'key': aliyunFileKey,
				'policy': policyBase64,
				'OSSAccessKeyId': accessid,
				'signature': signature,
				'success_action_status': '200',
			},
			async success(res) {
				if (res.statusCode == 200) {
					// console.log('打印后端反馈的信息:',data);
					// 先获取图片url(各个后端返回值不一，所以造成出入)
					// 修改获取的图片返回值路径
					// 提示：data.info改为你图片返回地址即可
					let filename = aliyunServerURL + aliyunFileKey;
					upload_picture_list[j]['path_server'] = filename;
					_this.upload_picture_list = upload_picture_list;
					await _this.$emit('onUpImg', _this.upload_picture_list);
					uni.hideLoading();
				}
			},
			async fail(err) {
				uni.showLoading({
					title: `上传失败!`
				});
				setTimeout(() => {
					uni.hideLoading();
				}, 2000);
				console.log(err)
			}
		});
		upload_task.onProgressUpdate(async (res) => {
			for (let i = 0, len = _this.upload_picture_list.length; i < len; i++) {
				upload_picture_list[i]['upload_percent'] = await res.progress;
			}
			_this.upload_picture_list = upload_picture_list
		});
	}

	// 上传图片(通用)
	const uImage = async (_this, url, config) => {
		// console.log('URL:', url, config);
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
	const cImage = (_this, count, configs, url) => {
		let config = {
			aliConfig: {
				AccessKeySecret: configs.aliConfig.AccessKeySecret,
				OSSAccessKeyId: configs.aliConfig.OSSAccessKeyId,
				oosDirectory: configs.aliConfig.oosDirectory,
				url: configs.aliConfig.url
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
				_this.cacheBlob = res.tempFiles[0].path;
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
