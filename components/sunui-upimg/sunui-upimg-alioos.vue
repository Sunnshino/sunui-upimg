<template name='sunui-upimg'>
	<view>
		<view class="sunsin_picture_list">
			<view v-for="(item,index) in upload_picture_list" :key="index" class="sunsin_picture_item">
				<image v-show="item.upload_percent < 100" class="sunsin_width" :src="item.path" mode="aspectFill"></image>
				<image v-show="item.upload_percent == 100" class="sunsin_width" :src="item.path_server" mode="aspectFill" :data-idx="index"
				 @click="previewImgs"></image>
				<view class="sunsin_upload_progress sunsin_width" v-show="item.upload_percent < 100" :data-index="index" @click="previewImg">{{item.upload_percent}}%</view>
				<text class='del iconfont icon-shanchu' :class="upImgConfig.delBtnLocation=='left'?'left':upImgConfig.delBtnLocation=='right'?'right':upImgConfig.delBtnLocation=='bleft'?'bleft':upImgConfig.delBtnLocation=='bright'?'bright':'right'"
				 @click='deleteImg' :data-url="item.path_server" :data-index="index" :style="'color:'+upImgConfig.delIconText+';background-color:'+upImgConfig.delIconColor"
				 :hidden="upImgConfig.isDelIcon || false">×</text>
			</view>
			<view>
				<view class='sunsin_picture_item sunsin_width' v-show="upload_picture_list.length<upImgConfig.count || upImgConfig.notli"
				 v-if="upImgConfig.iconReplace =='' || upImgConfig.iconReplace==undefined">
					<view class="sunsin_add_image sunsin_width" @click='chooseImage(upImgConfig.count)' :style="'background-color:'+upImgConfig.upBgColor+''"
					 v-show="!upImgConfig.isAddImage || false">
						<view>
							<text class="iconfont" :class="[upImgConfig.upIconName==undefined?'icon-shangchuantupian':upImgConfig.upIconName]"
							 style="font-size: 72upx;margin-bottom: 12upx;" :style="'color:'+upImgConfig.upIconColor+';width:100%;'"></text>
						</view>
						<view class="icon-text" :style="'color:'+upImgConfig.upIconColor+';width:100%;'">{{upImgConfig.upTextDesc==undefined ||upImgConfig.upTextDesc==''?'上传照片':upImgConfig.upTextDesc}}</view>
					</view>
				</view>
				<view class='sunsin_picture_item sunsin_width' v-show="upload_picture_list.length<upImgConfig.count || upImgConfig.notli"
				 v-else>
					<view class="sunsin_add_image sunsin_width" @click='chooseImage(upImgConfig.count)' style="'background-color:#fff;'"
					 v-show="upImgConfig.isAddImage || true">
						<image :src="upImgConfig.iconReplace" class="icon_replace"></image>
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
				upload_after_list: [],
				upload_picture_list: []
			};
		},
		name: 'sunui-upimg',
		props: {
			upImgConfig: {
				type: Object
			}
		},
		created() {},
		methods: {
			initServerImage(e) {
				this.upload_picture_list = e;
			},
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
	const getPolicyBase64 = () => {
		let date = new Date();
		date.setHours(date.getHours() + env.timeout);
		let srcT = date.toISOString();
		const policyText = {
			"expiration": srcT,
			"conditions": [
				["content-length-range", 0, 5 * 1024 * 1024] //上传容量最大为5M
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
	const upload_file_server = async (_this, configs, upload_picture_list, j) => {
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
					console.log(`%c 阿里云上传(成功返回地址):${filename}`, 'color:#1AAD19');
					upload_picture_list[j]['path_server'] = filename;
					_this.upload_picture_list = upload_picture_list;
					await _this.$emit('onUpImg', _this.upload_picture_list);
					uni.hideLoading();
				} else {
					uni.showLoading({
						title: `上传失败!`
					});
					setTimeout(() => {
						uni.hideLoading();
					}, 2000);
					_this.upload_picture_list = [];
					_this.upload_after_list = [];
					console.warn(`阿里云上传图片失败,返回状态码:`, res.statusCode);
				}
			},
			async fail(err) {
				uni.showLoading({
					title: `上传失败!`
				});
				setTimeout(() => {
					uni.hideLoading();
				}, 2000);
				console.log(err);
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
	const uImage = async (_this, config) => {
		for (let j = 0, len = _this.upload_picture_list.length; j < len; j++) {
			if (_this.upload_picture_list[j]['upload_percent'] == 0) {
				await upload_file_server(_this, config, _this.upload_picture_list, j)
			}
		}
	}

	// 删除图片(通用)
	const dImage = async (e, _this) => {
		await _this.$emit('onImgDel', {
			url: e.currentTarget.dataset.url,
			index: e.currentTarget.dataset.index
		});
		_this.upload_picture_list.splice(e.currentTarget.dataset.index, 1);
		_this.upload_after_list.splice(e.currentTarget.dataset.index, 1);
		_this.upload_picture_list = _this.upload_picture_list;
	}


	// 选择图片(通用)
	const cImage = (_this, count, configs) => {
		let config = {
			aliConfig: {
				AccessKeySecret: configs.aliConfig.AccessKeySecret,
				OSSAccessKeyId: configs.aliConfig.OSSAccessKeyId,
				oosDirectory: configs.aliConfig.oosDirectory,
				url: configs.aliConfig.url
			},
			count,
			tips: configs.tips || false,
			notli: configs.notli,
			sourceType: configs.sourceType,
			sizeType: configs.sizeType
		}
		uni.chooseImage({
			count: config.notli ? config.count = 9 : _this.upload_after_list.length == 0 ? config.count : config.count -
				_this.upload_after_list.length,
			sizeType: config.sizeType == "" || config.sizeType == undefined || config.sizeType == true ? ['compressed'] : [
				'original'
			],
			sourceType: config.sourceType == "" || config.sourceType == undefined ? ['album', 'camera'] : config.sourceType ==
				'camera' ? ['camera'] : config.sourceType == 'album' ? ['album'] : ['album', 'camera'],
			success: async (res) => {
				for (let i = 0, len = res.tempFiles.length; i < len; i++) {
					res.tempFiles[i]['upload_percent'] = 0;
					res.tempFiles[i]['path_server'] = '';
					_this.upload_picture_list.push(res.tempFiles[i]);
					_this.upload_picture_list.length > config.count ? _this.upload_picture_list = _this.upload_picture_list.slice(
						0,
						config.count) : '';
				}
				// 过滤多出的预览图片
				await fImage(_this, res, config);
			}
		})
	}


	// 过滤超出的图片以及上传(通用)
	const fImage = (_this, res, config) => {
		!config.notli && config.count == _this.upload_picture_list.length ? uImage(_this, config) : '';
		config.notli && config.count == 9 ? uImage(_this, config) : '';
		_this.upload_after_list = _this.upload_after_list.concat(res.tempFilePaths).slice(0, config.count);
		_this.upload_picture_list = _this.upload_picture_list.slice(0, config.count);
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
		let prevImgArr = [];
		for (let i = 0, len = _this.upload_picture_list.length; i < len; i++) {
			prevImgArr.push(_this.upload_picture_list[i].path_server);
		}
		uni.previewImage({
			current: e.currentTarget.dataset.src,
			urls: prevImgArr
		});
	}
</script>

<style scoped>
	@import url("iconfont");
	/* 
		2019-07-25 更改图标为字体图标
	*/

	.icon-text {
		font-size: 26upx;
	}


	/* 图片宽高+遮罩层宽高+遮罩层行高 */
	.sunsin_width {
		width: 160upx !important;
		height: 160upx !important;
		line-height: 160upx !important;
	}

	/* 循环列表样式 */
	.sunsin_picture_list {
		width: 96%;
		padding: 2%;
		display: flex;
		flex-wrap: wrap;
		text-align: center;
	}

	.sunsin_picture_list image {
		width: 40upx;
		height: 40upx;
		margin: 0 4%;
	}

	/* 添加图片样式 */
	.sunsin_add_image {
		color: #ddd;
		font-size: 144upx;
		text-align: center;
		line-height: 0 !important;
		margin: 2% 0 0 4%;
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
		margin: 20upx 21upx 0 0;
	}

	/* 删除按钮样式 */
	.sunsin_picture_item .del {
		position: absolute;
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

	/* 删除图标位置(上左) */
	.sunsin_picture_item .del.left {
		top: 0;
		left: 0;
		margin-left: 4%;
		border-top-right-radius: 0;
		border-top-left-radius: 6upx;
	}

	/* 删除图标位置(上右) */
	.sunsin_picture_item .del.right {
		top: 0;
		right: -4.2%;
	}

	/* 删除图标位置(下左) */
	.sunsin_picture_item .del.bleft {
		bottom: 0;
		left: 4%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 6upx;
	}

	/* 删除图标位置(下右) */
	.sunsin_picture_item .del.bright {
		right: -4.2%;
		bottom: 0;
		border-top-right-radius: 0;
	}

	/* 进度遮罩层样式 */
	.sunsin_upload_progress {
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		font-size: 24upx;
		text-align: center;
		line-height: 160upx;
		margin-left: 4%;
		border-radius: 8upx;
		background-color: rgba(0, 0, 0, .7);
	}

	/* 自定义添加图片样式 */
	.sunsin_picture_item image {
		box-shadow: 6upx 6upx 12upx rgba(112, 128, 144, 0.7);
		border-radius: 15upx;
	}
</style>
