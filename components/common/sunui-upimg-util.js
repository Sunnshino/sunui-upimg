
async function compressImage(src, platform) {
	const imageInfo = await getImageInfo(src);
	const orientation = imageInfo.orientation;
	let rotate = 0;
	let quality = 80;
	if (platform === 'ios') {
		rotate = 0;
		quality = 25;
	} else {
		switch (orientation) {
			case 'up': //exif:1 不旋转
				rotate = 0;
				break;
			case 'down': //exif:3 旋转180度
				rotate = 180;
				break;
			case 'right': //exif:6 旋转90度
				rotate = 90;
				break;
			case 'left': //exif:8 旋转270度
				rotate = 270;
				break;
			default:
				rotate = 0;
				break;
		}
	}
	return new Promise(function(resolve, reject) {
		plus.zip.compressImage({
				src: src,
				dst: "_doc/uniapp_temp" + '/compressed/' + Math.round(new Date()) + '.jpg',
				format: 'jpg',
				quality: quality,
				width: 'auto',
				height: 'auto',
				rotate: rotate,
			},
			function(event) {
				let tempPath = event.target;
				resolve(tempPath)
			},
			function(error) {
				reject(error);
			});
	})
}

function getImageInfo(path) {
	return new Promise(function(resolve, reject) {
		// #ifdef APP-PLUS
		plus.io.getImageInfo({
			src: path,
			success: function(image) {
				// console.log(image.width);
				// console.log(image.height);
				// console.log('orientation=' + image.orientation);
				// console.log('path=' + image.path);
				resolve(image)
			},
			fail: function(err) {
				console.log("getImageInfoErr: " + JSON.stringify(err));
				reject(err)
			}
		});
		// #endif
		// #ifdef H5 || MP-WEIXIN	
		uni.getImageInfo({
			src: path,
			success: function(image) {
				// console.log(image.width);
				// console.log(image.height);
				// console.log('orientation=' + image.orientation);
				// console.log('path=' + image.path);
				resolve(image)
			},
			fail: function(err) {
				console.log("getImageInfoErr: " + JSON.stringify(err));
				reject(err)
			}
		});
		// #endif
	});
}

export default compressImage