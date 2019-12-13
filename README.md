# upimg for uniApp(使用简便版上传图片组件)

## 请做有礼貌的伸手党！！！ - 2019/12/13
## 请使用简便版的上传图片组件(采用腾讯weui上传图片样式)

>**请star并且watch本项目,以便得到最新的UI('_')**   
>**推荐测试运行环境小程序开发者工具,避免出现CORS/CORB**  
>**如上传以后,出现错误(非CORS/CORB),就去修改图片返回地址,在各个插件版本有注释**  

>**测试,请尽量选择小容量图片！！申请的阿里云、七牛云、腾讯云(不再续费)、测试服务器均为免费版，资源有限**  


---------------------

### 分离源码(简便版10k不依赖任何css以及js，后端版12k不依赖任何css以及js、七牛云版13k+6k、阿里云版13k+12k、腾讯云12k+68k)
>例子：假如我使用七牛云的上传图片(sunui-upimg目录我就只需要保留sunui-upimg-qiniu.vue和“qiniu”文件夹以及文件夹“icon”即可;在sunui-upimg目录其它均可删除)
- sunui-upimg.vue(简便版),不需要任何依赖 -> 支持
- sunui-upimg-basic.vue(后端版),需要复制文件“iconfont.css”,以下所有插件均由此扩展 ->废弃
- sunui-upimg-alioos.vue(阿里云版),需要复制文件夹“ali-oos”和“iconfont.css”文件 ->废弃
- sunui-upimg-qiniu.vue(七牛云版),需要复制文件夹“qiniu”和“iconfont.css”文件 ->废弃
- sunui-upimg-tencent.vue(腾讯云版),需要复制文件夹“tencent-cos”和“iconfont.css”文件 ->废弃

---------------------

### 申请方式(因申请方式差不多,就不做多个示例了,详情还请参考阿里云申请示例.)  

#### 阿里云申请  
参见博客：https://www.cnblogs.com/cisum/p/10910365.html



### 现阶段支持功能如下(关于图片上传各版本可以让后端和阿里云、腾讯云、七牛云等进行校验以及提供上传接口) -> 我们只需要调用后端提供过来接口即可

- [√]图片上传前预览
- [√]图片上传后预览
- [√]图片预览删除(可调接口删除,详情看阿里云删除返回)
- [√]图片添加
- [√]图片上传限制
- [√]图片无上传限制
- [√]图片上传进度监控
- [√]支持阿里云oos图片上传(该功能需要从**简便版**修改集成)
- [√]支持单页面多复用(@onUpImg="xxxx")
- [x]支持图片上传容量控制,单位为M,向上取整(该功能缺陷)
- [√]支持七牛云图片上传(该功能需要从**简便版**修改集成)
- [√]支持手动上传(多谢**“手动党”**提出的建议)
- [√]支持腾讯云上传(该功能需要从**简便版**修改集成)
- [√]支持从服务器传过来的图片预览(格式需固定,详情见七牛上传示例) - 2019/07/25

---------------------


### 通用配置(**简便版不再支持**)

|版本号	|更新时间	|关键字			|默认值					|功能作用																			|类型			|
|--		|--			|--				|--						|--																					|--				|
|v1.x	|			|notli			|false					|是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)			|Boolean		|
|v1.x	|			|count			|无(必填)				|上传图片数量,notli参数为true就失效													|String,Number	|
|v1.x	|			|sourceType		|all					|相机来源(相机->camera,相册->album,两者都有->all,默认all)							|String			|
|v1.x	|			|sizeType		|true					|是否压缩上传照片(仅小程序生效)														|Boolean		|
|v1.x	|			|upBgColor		|rgb(0, 137, 252)		|上传添加背景颜色																	|RGB,HEX		|
|v1.x	|			|upIconColor	|无(#000)				|上传icon图标颜色修改(仅限于字体图标/iconfont和描述文字)							|HEX			|
|v1.x	|			|upTextDesc		|上传图片				|上传文字描述(仅限四个字,默认上传图片)												|String			|
|v1.x	|			|delIconColor	|无						|删除按钮的背景颜色																	|RGB,HEX		|
|v1.x	|			|delIconText	|无						|删除按钮的文字颜色																	|HEX			|
|v1.x	|			|iconReplace	|无						|使用图片来替换上传图片(需要是http/https链接地址)									|String			|
|v2.1	|2019/05/08	|isDelIcon		|false					|是否隐藏上传图片的删除图标															|Boolean		|
|v2.1	|2019/05/08	|isAddImage		|false					|是否隐藏上传图片的添加按钮															|Boolean		|
|v2.24	|			|delBtnLocation	|right					|上传图片的删除图标位置:左上角(left)、右上角(right)、左下角(bleft)、右下角(bright)	|String			|
|v2.33	|2019/07/25	|upIconName		|icon-shangchuantupian	|上传字体图标名称,可看源码处的iconfont进行扩展.										|String			|






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
|v2.5		|2019/05/17		|修复腾讯云上传图片删除bug以及完善示例																																		|
|v2.51		|2019/05/18		|修改上传图片按钮圆角,以及分离功能函数; 为后面的图片压缩做准备(预计2.6版本),2.7版本可能增加一个可拖拽基础版本sunui-upimg-draw.vue											|
|v2.53		|2019/05/20		|修复腾讯云上传预览与删除错误,icon目录移至组件文件夹内; 组件做太多配置项，会显得很繁琐，所以说一些非必要的请根据项目需求自己修改.											|
|v2.54		|2019/05/21		|删除**阿里云示例**接口配置项,只要按照参数传递正确就可以正常使用.																											|
|v2.55		|2019/05/23		|添加阿里云示例接口配置项,并添加申请方式以及链接																															|
|v2.56		|2019/05/25		|优化样式 ;因服务器到期导致svg大家可以把图标放到自己服务器上面, 最后把链接复制到组件内部进行扩展; 修改图片宽高请到样式类：**.sunsin_width**进行修改即可.					|
|v2.57		|2019/07/25		|支持了从服务器拉取图片展示预览，更改添加图标为字体图标(iconfont)																											|
|v2.58		|2019/07/26		|修复了父组件值被子组件钩子赋值引起的警告错误,详情引用请看七牛(**pages/qiniu/qiniu.vue**)																					|
|v2.60		|2019/12/13		|新增sunui-upimg.vue简便版，支持Android/Ios/微信小程序																														|



-----------------------------------


 
>非全局引用组件引入请参考(**pages/qiniu/qiniu.vue**)
>全局引用请参考：http://ask.dcloud.net.cn/article/35409

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

### 使用Step2(分离更清晰,详情使用见pages/qiniu/qiniu.vue)
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
