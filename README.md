## upimg for uniApp  

>**请star并且watch本项目,以便得到最新的UI('_')**   
>**推荐测试运行环境小程序开发者工具,避免出现CORS/CORB**  
>**如上传以后,出现错误(非CORS/CORB),就去修改图片返回地址,在各个插件版本有注释**  
>**拿来(这么)容易,您的激励是我前进的动力!,不妨给个star或者点满星星**  

>**请各位认真仔细看完文档或者pages/index/index.vue示例!!! 如有不足之处也请指出**  


---------------------

### 分离源码(后端版11k、七牛云版12k+6k、阿里云版13k+12k、腾讯云12k+68k) -> 非常不建议用腾讯云
>例子：假如我使用七牛云的上传图片(sunui-upimg目录我就只需要保留sunui-upimg-qiniu.vue和“qiniu”文件夹即可;在sunui-upimg目录其它均可删除)
- sunui-upimg-basic.vue(后端版),极易扩展
- sunui-upimg-alioos.vue(阿里云版),需要复制文件夹“ali-oos”
- sunui-upimg-qiniu.vue(七牛云版),需要复制文件夹“qiniu”
- sunui-upimg-tencent.vue(腾讯云版),需要复制文件夹“tencent-cos”(**慎用,无法监控进度**)

---------------------

### 现阶段支持功能如下

- 图片上传前预览
- 图片上传后预览
- 图片预览删除(可调接口删除,详情看阿里云删除返回)
- 图片添加
- 图片上传限制
- 图片无上传限制
- 图片上传进度监控
- 支持阿里云oos上传图片
- 支持单页面多复用(@onUpImg="xxxx")
- 支持图片上传容量控制,单位为M,向上取整(暂时关闭该功能)
- 支持七牛云上传图片
- 支持手动上传图片(多谢**“手动党”**提出的建议)
- 支持腾讯云上传图片(**慎用**)

---------------------


### 通用配置


|版本号	|更新时间	|关键字			|默认值				|功能作用																			|类型			|
|--		|--			|--				|--					|--																					|--				|
|v1.x	|			|tips			|false				|显示将要上传图片的数量提示信息														|Boolean		|
|v1.x	|			|notli			|false				|是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)			|Boolean		|
|v1.x	|			|count			|无(必填)			|上传图片数量,notli参数为true就失效													|String,Number	|
|v1.x	|			|sourceType		|false				|照片来源([相机,相册],[相机])														|Boolean		|
|v1.x	|			|sizeType		|true				|是否压缩上传照片(仅小程序生效)														|Boolean		|
|v1.x	|			|upBgColor		|rgb(0, 137, 252)	|上传添加背景颜色																	|RGB,HEX		|
|v1.x	|			|upIconColor	|无(#000)			|上传icon图标颜色修改(仅限于字体图标/iconfont和描述文字)							|HEX			|
|v1.x	|			|upTextDesc		|上传图片			|上传文字描述(仅限四个字,默认上传图片)												|String			|
|v1.x	|			|delIconColor	|无					|删除按钮的背景颜色																	|RGB,HEX		|
|v1.x	|			|delIconText	|无					|删除按钮的文字颜色																	|HEX			|
|v1.x	|			|iconReplace	|无					|使用图片来替换上传图片(需要是http/https链接地址)									|String			|
|v2.1	|2019/05/08	|isDelIcon		|false				|是否隐藏上传图片的删除图标															|Boolean		|
|v2.1	|2019/05/08	|isAddImage		|false				|是否隐藏上传图片的添加按钮															|Boolean		|
|v2.24	|			|delBtnLocation	|right				|上传图片的删除图标位置:左上角(left)、右上角(right)、左下角(bleft)、右下角(bright)	|String			|
|v2.33	|2019/05/11	|upSvgIconName	|icon-addicon		|上传图标svg名称,可看源码进行扩展.													|String			|







### BUG以及更改

|版本号		|修复(更改)时间	|更新(提示)内容																																								|
|--			|--				|--																																											|
|v1.x		|				|上传图片组件progress进度条bug修改																																			|
|v1.x		|				|上传图片组件内进行注释修改																																					|
|v1.x		|				|上传图片组件已支持阿里云oos																																				|
|v1.x		|				|修改选择图片bug以及选择数量限制(仅小程序、App端、h5不限制选择数量但已做处理)																								|
|v1.9		|2019/05/05		|iconfont图标对比svg性能以及实用性来说,下个版本会使用svg																													|
|v1.9		|2019/05/05		|2.0版本已使用svg图标,如使用iconfont,可参考sunui-upimg.vue																													|
|v2.0		|2019/05/06		|版本2.1增强稳定性以及错误提示																																				|
|v2.1		|2019/05/07		|修复未上传图片预览,增加预览前图片提示(sunui-upimg.vue)																														|
|v2.2(beta)	|2019/05/08		|修复App上传后旋转90°(等待测试),引入(**http://ext.dcloud.net.cn/plugin?id=341**)  h5待修复;sunui-upimg.vue暂时停止更新,而后增注释版											|
|v2.2(beta)	|2019/05/08		|尽量使用微信开发者工具测试,(阿里云、七牛云、后端)测试提供的接口尽量选择小容量图片,只要参数引入正确就OK																		|
|v2.2(beta)	|2019/05/08		|优化一些样式,增加些注释**;譬如上传身份证模板改造一下样式即可使用**																											|
|v2.2(beta)	|2019/05/08		|通过配置参数(isDelIcon:true/false)可动态显示/隐藏删除按钮																													|
|v2.2(beta)	|2019/05/08		|通过配置参数(isAddImage:true/false)可动态显示/隐藏添加图片图标																												|
|v2.2(beta)	|2019/05/08		|腾讯云云存储未使用过,所以暂时不可用																																		|
|v2.2(beta)	|2019/05/09		|更改App条件编译,优化七牛云和阿里云以及上传失败后置空,并打印一些错误信息																									|
|v2.2(beta)	|2019/05/09		|**拍照逆转90°的原因是:ios/android竖屏拍照导致倾斜90°**,用兼容写法的话,代价太大(增加了很多代码容量,后续看情况兼容或者提供最简版本)											|
|v2.21		|2019/05/09		|置空上传失败后的图片路径,因上传失败有很多种原因,所以就没有一一测试																											|
|v2.22		|2019/05/10		|删除sunui-upimg.vue,更新使用文档																																			|
|v2.25		|2019/05/10		|可引入iconfont自定义删除图标,具体引入请查看sunui-upimg-basic.vue																											|
|v2.26		|2019/05/11		|可**手动(调用)上传图片**,具体查看阿里云上传示例,**注意配合count参数**使用; 注意看方法:**uImageTap**																		|
|v2.3(beta)	|2019/05/11		|修改配置文件名称,使其更加标准化、语义化																																	|
|v2.3		|2019/05/11		|修复bug,移除http://ext.dcloud.net.cn/plugin?id=341																															|
|v2.31		|2019/05/11		|App已测试Android端通过. 已添加svg图标为链接形式																															|
|v2.32		|2019/05/11		|h5采用本地svg,其它端为链接方式.																																			|
|v2.34		|2019/05/12		|添加static目录使其示例能够运行;为**“通用配置”**添加一些默认值(减少一些配置项),具体看示例																					|
|v2.35		|2019/05/12		|有的**“小伙伴说”**,为什么我本地删了远程图片链接还可以获取到？其实这个问题嘛,扩展很简单;在**删除图片(通用)传个下标**过来,详情见阿里云示例(index.vue)删除方法:delImgInfo	|
|v2.4(beta)	|2019/05/15		|支持了腾讯云，但无法监控进度，上传成功了就显示进度100%->建议调用后端接口,然后就可以监控上传进度了！改造请参考sunui-upimg-basic.vue											|
|v2.4(beta)	|2019/05/15		|以上版本功能即支持“**通用配置**”,因篇幅太大,所以就无一一列出																												|



---------------------

### 后期计划

- 解决h5预览图片旋转90°问题
- 使用canvas压缩上传前的图片


### 使用Step1(导入main.js,)=>导入组件这一步可以参考： http://ask.dcloud.net.cn/article/35409
```
import sunUiBasic from './components/sunui-upimg/sunui-upimg-basic.vue'
import sunUiOos from './components/sunui-upimg/sunui-upimg-alioos.vue'
import sunUiqiNiu from './components/sunui-upimg/sunui-upimg-qiniu.vue'
import sunUiCos from './components/sunui-upimg/sunui-upimg-tencent.vue'
Vue.component('sunui-upbasic',sunUiBasic)
Vue.component('sunui-upoos',sunUiOos)
Vue.component('sunui-upqiniu',sunUiqiNiu)
Vue.component('sunui-upcos',sunUiCos)
```

### 使用Step2(分离更清晰)
```
pages/index/index.vue => 后端图片上传示例
pages/ali/ali.vue => 阿里云图片上传示例
pages/tencent/tencent.vue => 腾讯云图片上传示例
pages/qiniu/qiniu.vue => 七牛云图片上传示例
```

### License
#### MIT  
Copyright (c) 2018-present, 1940694428@qq.com

##### *其它待开发...*
