<template name='sunui-upimg'>
	<view>
		<view class="sunsin_picture_list">
			<view v-for="(item,index) in upload_picture_list" :key="index" class="sunsin_picture_item">
				<image v-show="item.upload_percent < 100" class="sunsin_width" :src="item.path" mode="aspectFill"></image>
				<image v-show="item.upload_percent == 100" class="sunsin_width" :src="item.path_server" :data-src="item.path_server"
				 mode="aspectFill" :data-idx="index" @click="previewImgs"></image>
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
	let COS = require('./tencent-cos/cos-wx-sdk-v5.js');

	export default {
		data() {
			return {
				upload_after_list: [],
				upload_picture_list: [

				]
			};
		},
		name: 'sunui-upimg',
		props: {
			upImgConfig: {
				type: Object
			}
		},
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

	// 上传文件
	const upload_file_server = async (_this, configs, upload_picture_list, j) => {
		// 腾讯云配置
		let cosConfig = {
			Bucket: configs.cosConfig.Bucket,
			Region: configs.cosConfig.Region,
			SecretId: configs.cosConfig.SecretId,
			SecretKey: configs.cosConfig.SecretKey
		}

		let cos = new COS({
			getAuthorization: (params, callback) => { //获取签名 必填参数
				// 推荐(服务器计算签名接口)
				// 				 uni.request({
				// 				    url: 'SIGN_SERVER_URL',
				// 				    data: {
				// 				        Method: params.Method,
				// 				        Key: params.Key
				// 				    },
				// 				    dataType: 'text',
				// 				    success: function (result) {
				// 				        callback(result.data);
				// 				    }
				// 				});
				// 方便前端调试
				let authorization = COS.getAuthorization({
					SecretId: cosConfig.SecretId,
					SecretKey: cosConfig.SecretKey,
					Method: params.Method,
					Key: params.Key
				});
				callback(authorization);
			}
		});

		let filePath = upload_picture_list[j]['path'];
		let Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名

		cos.postObject({
			Bucket: cosConfig.Bucket,
			Region: cosConfig.Region,
			Key: Key,
			FilePath: filePath
		}, (err, data) => {
			if (err == null) {
				console.log(`%c 腾讯云上传(成功返回地址):${data.headers.Location}`, 'color:#1AAD19');
				upload_picture_list[j]['path_server'] = data.headers.Location;
				upload_picture_list[j]['upload_percent'] = 100;
			} else {
				console.log(`%c 腾讯云上传失败:${JSON.stringify(err)}`, 'color:#f00');
				return;
			}
		});
		await _this.$emit('onUpImg', upload_picture_list);
		_this.upload_picture_list = upload_picture_list;
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
			cosConfig: {
				Bucket: configs.cosConfig.Bucket, //replace with yours
				Region: configs.cosConfig.Region, //replace with yours
				SecretId: configs.cosConfig.SecretId, //replace with yours
				SecretKey: configs.cosConfig.SecretKey //replace with yours
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


	// 过滤超出的预览图片以及上传(通用)
	const fImage = (_this, res, config) => {
		!config.notli && config.count == _this.upload_picture_list.length ? uImage(_this, config) : '';
		config.notli && config.count == 9 ? uImage(_this, config) : '';
		_this.upload_after_list = _this.upload_after_list.concat(res.tempFilePaths).slice(0, config.count);
		_this.upload_picture_list = _this.upload_picture_list.slice(0, config.count);
	}

	// 上传前预览图片(通用)
	const pImage = (e, _this) => {
		let _cacheImg = [];
		for (let i = 0, len = _this.upload_picture_list.length; i < len; i++) {
			_cacheImg.push(_this.upload_picture_list[i].path);
		}
		uni.previewImage({
			current: _this.upload_picture_list[e.currentTarget.dataset.index].path,
			urls: _cacheImg
		});
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
		font-size: .2em;
	}

	/* 宽度 */
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
