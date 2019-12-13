<!--
	版本号：3.0
	各位可以按需求更改兼容阿里云、七牛云、腾讯云以及其它(从老项目抽取导入一些JavaScript即可) - 有时间就进行迭代以前的版本
 -->

<template name='sunui-upimg'>
	<view class="sunui-uploader-bd">
		<view class="sunui-uploader-files">
			<block v-for="(item,index) in upload_before_list" :key='index'>
				<view class="sunui-uploader-file" :class="[item.upload_percent<100?'sunui-uploader-file-status':'']" @click="previewImage(index)">
					<image class="sunui-uploader-img" :style="'width:'+upload_img_wh+'rpx;height:'+upload_img_wh+'rpx;'" :src="item.path"
					 mode="aspectFill" />
					<view class="sunui-img-removeicon right" @click.stop="removeImage(index)">x</view>
					<view class="sunui-loader-filecontent" v-if="item.upload_percent<100">{{item.upload_percent}}%</view>
				</view>
			</block>
			<view v-show="upload_before_list.length<upload_count" hover-class="sunui-uploader-hover" class="sunui-uploader-inputbox"
			 @click="chooseImage" :style="'width:'+upload_img_wh+'rpx;height:'+upload_img_wh+'rpx;'">
				<view :style="'line-height:'+upload_img_wh+'rpx;'"><text class="iconfont icon-mn_shangchuantupian" style="color: #666;"></text></view>
				<!-- <view style="color: #666;">上传图片</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				// 选择图片tempFile
				upload_cache: [],
				// 预览数组->支持从服务器拉取
				upload_cache_list: [],
				// 上传数组
				upload_before_list: [],
				// 图片大小
				upload_img_size: [],
				// 超出限制数组
				upload_exceeded_list: [],
				// 上传数量
				upload_count: 9,
				// 最大上传容量(M)
				upload_max: 1,
				// 图片/选择宽高
				upload_img_wh: 162,
				// 测试接口(建议七牛、阿里云、腾讯云都采用后端对接，直接调用后端上传)
				url: 'https://a3.dns06.net.cn/app/index.php?i=2&c=entry&a=wxapp&do=Upload_qiniu_b&m=jzwx_a'
			}
		},
		name: 'sunui-upimg',
		props: {
			upload_auto: {
				type: Boolean,
				default: true
			}
		},
		created() {
			_self = this;
		},
		mounted() {
			_self.$nextTick(function() {
				_self.upload_before_list.map(function(item) {
					_self.upload_cache_list.push(item.path);
				});
				_self.emit();
			})
		},
		methods: {
			upImage(paths) {
				const promises = paths.map((path) => {
					return promisify(upload)({
						url: _self.url,
						path: path,
						name: 'file',
						extra: {},
					})
				})
				uni.showLoading({
					title: '正在上传...',
				});
				Promise.all(promises).then((data) => {
					uni.hideLoading();
					_self.upload_cache_list.push(...data);
					_self.emit();
				}).catch((res) => {
					console.log(res);
					uni.hideLoading();
				});
			},
			chooseImage() {
				uni.chooseImage({
					count: _self.upload_count - _self.upload_before_list.length,
					sizeType: ['compressed', 'original'],
					sourceType: ['album', 'camera'],
					success: async (res) => {
						for (let i = 0, len = res.tempFiles.length; i < len; i++) {
							res.tempFiles[i]['upload_percent'] = 0;
							if (Math.ceil(res.tempFiles[i].size / 1024) < _self.upload_max * 1024) {
								await _self.upload_img_size.push(Math.ceil(res.tempFiles[i].size / 1024));
								await _self.upload_before_list.push(res.tempFiles[i]);
								// TODO v3.1增加图片格式限制
							} else {
								res.tempFilePaths.splice(i, 1);
								_self.upload_exceeded_list.push(i === 0 ? 1 : i + 1);
								uni.showModal({
									title: '提示',
									content: `第${[...new Set(_self.upload_exceeded_list)].join(',')}张图片超出限制${_self.upload_max}M,已过滤`,
									showCancel: false,
									confirmText: '确认',
									success(res) {
										if (res.confirm) {
											_self.upload_img_size.splice(i--, 1);
											_self.upload_exceeded_list.splice(i--, 1);
										}
									}
								});
							}
						}
						_self.upload_cache = await res.tempFilePaths;
						_self.upload(_self.upload_auto);
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			async upload(upload_auto) {
				upload_auto ? await _self.upImage(_self.upload_cache) : console.warn(
					`传输参数:this.$refs.xx.upload(true)才可上传,默认false`);
			},
			previewImage(idx) {
				uni.previewImage({
					current: idx,
					urls: _self.upload_cache_list
				});
			},
			removeImage(idx) {
				_self.upload_before_list.splice(idx, 1);
				_self.upload_cache_list.splice(idx, 1);
				_self.emit();
			},
			emit() {
				_self.$emit('change', _self.upload_cache_list);
			}
		}
	}


	const promisify = (api) => {
		return (options, ...params) => {
			return new Promise((resolve, reject) => {
				api(Object.assign({}, options, {
					success: resolve,
					fail: reject
				}), ...params);
			});
		}
	}

	const upload = options => {
		var url = options.url,
			path = options.path,
			name = options.name,
			// data = options.data,
			extra = options.extra,
			success = options.success,
			progress = options.progress,
			fail = options.fail

		const uploadTask = uni.uploadFile({
			url: url,
			filePath: path,
			name: name,
			formData: extra,
			success: function(res) {
				var data = res.data
				try {
					//Tip : 切记->主要修改这里图片的返回值为真实返回路径!!! 详情见示例
					data = JSON.parse(res.data).info
				} catch (e) {
					throw (e)
				}
				// 根据自己的返回数据做相应判断,服务器返回200即代表成功请求
				if (res.statusCode == 200) {
					if (success) {
						success(data)
					}
				} else {
					if (fail) {
						fail(data)
					}
				}

			},
			fail: function(res) {
				console.log(res)
				if (fail) {
					fail(res)
				}
			}
		})
		uploadTask.onProgressUpdate(async (res) => {
			for (let i = 0, len = _self.upload_before_list.length; i < len; i++) {
				_self.upload_before_list[i]['upload_percent'] = await res.progress;
			}
			_self.upload_before_list = _self.upload_before_list;
		});
	}
</script>

<style lang="scss">
	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/iconfont.eot?t=1574391686418');
		/* IE9 */
		src: url('//at.alicdn.com/iconfont.eot?t=1574391686418#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMkAAsAAAAAB2QAAALYAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCYIJEATYCJAMICwYABCAFhG0HPRt3BhEVlCNkH4dxmzUXNsJHc1SNfR9KTkCtiXv/l+QDBQSFRBJdKoEsg60HUgCsOpWVnWxNx3BvVITqkj3fepbtzM/OfDo4D86iFEIiJAeX02+Bh/O84TLmsrEnYBxQoHtgm6xACoxTkN0zFsgEdQynCShpq7cwbsK0eTKROSkgbNu8cbUspRFrkoNMkC9ZGYWjcrJkX/IIR/zPhz/6hIxELmWmzdowfp1RvxdbYWm1VrUMCO54JvDrSNEbkTCv1DJDGvp6S5VUX9SRdSUHfi+u1cBZ7R+PQMgzEyugNcU5J67DO9VfJiCigD042iuNQqXSunGRfvrWV6/mvX49/+3bhW/eLHr4puOFtxMfvO5w9tX8yv7rIbf3Rrl84Mbe66XSzWet46nn/etMuALua5LqNZUqpKdfDKjsv2qef+yambJsTWM2zDtKIQ0pS7msvSTUpn1tNyts2xZmWUyw3LI4bPisSZNyOUc2y4/scfZs3QZ1UcgqUWtkVednsvnVs7NOHzmqglXIBnqU7+/M9Hp3y3L2RLWYA9uhlat61/LGGwVqt9Nvafv/8R2fmg/pu7LesH9ZOYL3/6e3P6Z2O0rbIztra+Dtc1u2RY1vapOocEtDiT0Kd1VUUkIN42joS19Fk1s1BVmKy0OioA2kMp1REdcbcsr6QV5mJJT0MnF9mbQRchZiET29CAT1fSBR1y1I1fdFRdwPcpr6Q179cIaSBaHRjmVdgxFjCSvGFuonmGYcpK1nESRfUC1dRUm+T3ggeeOEOIiywRwHpDHm+FUlzBIkjT1k5DzsuhEmGi02HGjmKQ1DWfaioBn7gzAWQRWGWqD2BIzGaCDRm4nc+y+QsuhUqKaqyviAiGcGB7FA1AKVS4ZWVddyibdSEoxJQCKjHsjIMNTpjMBUPsxCDRbQPTyTVGh1k20lwfyy/un2QYmpTII1I9Vo+1B4XQ2q0QvwvExGfTgA') format('woff2'),
			url('//at.alicdn.com/iconfont.woff?t=1574391686418') format('woff'),
			url('//at.alicdn.com/iconfont.ttf?t=1574391686418') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('//at.alicdn.com/iconfont.svg?t=1574391686418#iconfont') format('svg');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-mn_shangchuantupian:before {
		content: "\e559";
	}

	.icon-mn_shangchuantupian {
		font-size: 3em;
	}

	.sunui-uploader-img {
		display: block;
	}

	.sunui-uploader-input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.sunui-uploader-inputbox {
		position: relative;
		margin-bottom: 16rpx;
		box-sizing: border-box;
		background-color: #ededed;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.sunui-img-removeicon {
		position: absolute;
		color: #fff;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		z-index: 2;
		text-align: center;
		background-color: #E54D42;

		&.right {
			top: 0;
			right: 0;
		}
	}

	.sunui-uploader-file {
		position: relative;
		margin-right: 16rpx;
		margin-bottom: 16rpx;
	}

	.sunui-uploader-file-status:before {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.sunui-loader-filecontent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		z-index: 9;
	}

	.sunui-uploader-bd {
		padding: 26rpx;
		margin: 0;
	}

	.sunui-uploader-files {
		display: flex;
		flex-wrap: wrap;
	}

	.sunui-uploader-file:nth-child(4n+0) {
		margin-right: 0;
	}

	.sunui-uploader-inputbox {
		&>view {
			text-align: center;
		}
	}

	.sunui-uploader-file-status:after {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.sunui-uploader-hover {
		box-shadow: 0 0 0 #e5e5e5;
		background: #e5e5e5;
	}
</style>
