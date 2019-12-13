<template>
	<view>
		<!-- 更多功能，请参照sunui-upimg.vue data -->
		<view class="sunui-title">图片上传</view>
		<sunui-upimg @change="getImageInfo" :upload_auto="auto" ref="upimg"></sunui-upimg>
		<button @click="upfile">上传</button>
	</view>
</template>

<script>
	var _self;
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
	export default {
		data() {
			return {
				auto: false
			}
		},
		mounted() {
			// 这里放置服务器预览图片链接地址
			this.$refs.upimg.upload_before_list = [{
				path: 'http://a3q.dns06.net.cn/15742420068480.png'
			}];
		},
		components: {
			'sunui-upimg': sunUiUpimg
		},
		methods: {
			upfile() {
				// upload_auto为true才可上传(手动上传)
				this.$refs.upimg.upload(this.auto = true);
			},
			getImageInfo(e) {
				// 上传图片或者删除图片返回信息
				console.log('返回图片信息：',e);
			}
		}
	}
</script>

<style lang="scss">

</style>
