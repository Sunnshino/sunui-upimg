<template>
	<view>
		<navigator :url="item.url" v-for="(item,index) in navigatorList" :key='index'>
			<button type="primary">{{item.title}}</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navigatorList: [{
						url: '../index/index',
						title: '后端图片上传'
					},
					{
						url: '../qiniu/qiniu',
						title: '七牛云图片上传'
					},
					{
						url: '../ali/ali',
						title: '阿里云图片上传'
					},
					{
						url: '../tencent/tencent',
						title: '腾讯云图片上传'
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style>
	button,
	button:after {
		border-radius: 0;
		margin-top: 20%;
	}
</style>
