<!-- 
 
/**
 * <sunsin-upimg url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwindx" :count="1" :autoup="false"></sunsin-upimg>
 * 
 * url：上传图片地址
 * count:上传总数量(默认上传1张图片)
 * autoup:是否自动上传(无需传参数,参考以上)
 * 
 * 2018-01-07 MIT
 *
 * 版本号:v1.1
 * 致谢
 * 919809734@qq.com
 */ 
 
 -->


<template name='sunsin-upimg'>
	<view>
		<view class="picture_list">
			<view v-for="(item,index) in upload_picture_list" :key="index" class="picture_item">
				<image v-show="item.upload_percent < 100" :src="item.path" mode="aspectFill"></image>
				<image v-show="item.upload_percent == 100" :src="item.path_server" mode="aspectFill"></image>
				<view class="upload_progress" v-show="item.upload_percent < 100" :data-index="index" @click="previewImg">{{item.upload_percent}}%</view>
				<text class='del' @click='deleteImg' :data-index="index">×</text>
			</view>

			<view class='picture_item' v-show="upload_picture_list.length<count">
				<view class="add-image" @click='chooseImage'>
					<text>+</text>
				</view>
			</view>
		</view>
		<view class='y-up' v-show="autoup==false">
			<button @click='uploadimage(url)' class='yes-upload' v-show="upload_picture_list.length==count">上传图片</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: [],
				upload_picture_list: []
			};
		},
		name: 'sunsin-upimg',
		props: {
			url: {
				type: String,
				value: 'https://www.playsort.cn/xxx'
			},
			count: {
				type: Number,
				value: 1
			},
			autoup: {
				type: Boolean,
				value: false
			}
		},
		methods: {
			chooseImage() {
				cImage(this, parseInt(this.count), this.url);
			},
			uploadimage(e) {
				uImage(this, e);
			},
			deleteImg(e) {
				dImage(e, this);
			},
			previewImg(e) {
				pImage(e, this);
			}
		}

	}

	// 上传文件
	const upload_file_server = (url, that, upload_picture_list, j) => {
		const upload_task = uni.uploadFile({
			url,
			filePath: upload_picture_list[j]['path'],
			name: 'file',
			formData: {
				'num': j
			},
			success(res) {
				let data = JSON.parse(res.data)
				let filename = data.info
				upload_picture_list[j]['path_server'] = filename
				that.upload_picture_list = upload_picture_list
				console.log(data)
			}
		})
		upload_task.onProgressUpdate((res) => {
			upload_picture_list[j]['upload_percent'] = res.progress
			that.upload_picture_list = upload_picture_list
		})
	}


	// 上传图片(this,api.imageup)
	const uImage = (_that, url) => {
		for (let j in _that.upload_picture_list) {
			if (_that.upload_picture_list[j]['upload_percent'] == 0) {
				upload_file_server(url, _that, _that.upload_picture_list, j)
			}
		}
	}


	// 删除图片
	const dImage = (e, _that) => {
		_that.upload_picture_list.splice(e.currentTarget.dataset.index, 1);
		_that.imgs.splice(e.currentTarget.dataset.index, 1);
		_that.upload_picture_list = _that.upload_picture_list;
	}


	// 选择图片
	const cImage = (_that, count, url) => {
		uni.chooseImage({
			count,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				for (let i in res.tempFiles) {
					res.tempFiles[i]['upload_percent'] = 0
					res.tempFiles[i]['path_server'] = ''
					_that.upload_picture_list.push(res.tempFiles[i])
				}
				if (_that.autoup) {
					count == _that.upload_picture_list.length ? uImage(_that, url) : console.log('图片不够!')
				}
				_that.imgs = _that.imgs.concat(res.tempFilePaths)
				_that.upload_picture_list = _that.upload_picture_list;
				_that.count = count;
			}
		})
	}

	// 预览图片
	const pImage = (e, _that) => {
		uni.previewImage({
			current: _that.imgs[e.currentTarget.dataset.index],
			urls: _that.imgs
		})
	}
</script>

<style>
	.picture_list image {
		width: 40rpx;
		height: 40rpx;
		margin: 0 4%;
	}

	.add-image,
	.up-pic image {
		margin-top: 2%;
		margin-left: 2%;
		width: 150rpx;
		height: 150rpx;
		color: #ddd;
		font-size: 144rpx;
		line-height: 95%;
		text-align: center;
		background-color: #eee;
		cursor: pointer;
		border-radius: 10rpx;
	}

	.picture_list {
		padding: 20rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
	}

	.picture_item {
		margin: 10px;
		margin-left: 0;
		position: relative;
		width: 160rpx;
		height: 160rpx;
	}

	.picture_item .del {
		position: absolute;
		top: -11rpx;
		right: -11rpx;
		color: #fff;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		z-index: 2;
		line-height: 35rpx;
		text-align: center;
		background-color: #f00;
	}

	.upload_progress {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.7;
		border-radius: 8rpx;
		background-color: #000;
		color: #fff;
		width: 167rpx;
		height: 160rpx;
		text-align: center;
		line-height: 160rpx;
		font-size: 12px;
	}

	.picture_item image {
		width: 160rpx;
		height: 160rpx;
	}

	.yes-upload {
		color: #fff;
		border-radius: 0;
		background-color: #00a0e9;
	}
</style>
