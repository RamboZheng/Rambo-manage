## 一、项目介绍 ##
> 本项目为自定义管理平台。
> 

## 二、编码规范 ##
> 文件命名规范

1. 文件夹用横杠-分隔；
2. 组件(components)用小写加中划线命名 demo-index；
3. 页面组件(pages)用文件夹命名/index.js的形式；
4. js(除默认的index)一律采用小驼峰命名 homeIndex.js；

> 代码书写规范

1. 代码缩进2个空格(1个TAB);
2. js变量小驼峰；
3. scss变量小驼峰，命名使用bem规范，使用了[sass-bem](https://www.npmjs.com/package/sass-bem)辅助工具；
4. 增加了eslint作为代码规范标准，使用模式为standard，可查看.eslintrc.js文件。若需要忽略eslint可在.eslintignore中填写忽略配置。

> API接口的定义和使用
1. 所有的api接口定义都写在 src/api/apis/ 文件夹内，不同模块用不同模块的命名；

## 三、踩坑攻略 ##

1.sass-loader 做为引入sass的必要依赖，存在默认（8.0.1）版本过高，不适用webpack打包的情况。（目前使用7.3.1）；
2.eChart引用图例及描点显示，需要引用各自的模块；
3.百度地图请求周边的接口，打包以后存在跨域问题，需要使用jsonp或者后端ngix代理服务；
4.config/index中assetsPublicPath在打包是要这是'/'，本地调试的状态下使用'./';
5.下架详情的价格展示曲线，使用echart需要对数据进行拆分处理；

## 四、项目目录 ##
``` bash
.
|____src					        
| |____assets     					样式文件
| | |____image                      本地图片
| | |____styles                     公共样式

| |____axios	                    网络请求
| | |____api                        接口地址
| | |____index.js				    网络配置 

| |____components                   组件目录
| | |____topBar					    顶部组件 
| | |____content					内容组件   

| |____mixins                       混合目录
| | |____getSite		            城市混合
| | |____unshlve			        下架混合

| |____page	                        页面目录
| | |____home                       home文件
| | |____login                      登录功能
| | |____manage                     房源管理
| | |____mate                       房源匹配
| | |____statistic				    数据统计    
| | |____underList                  下架记录

| |____router                       路由配置
| | |____index					    配置文件    

| |____store                        vuex
| | |____modules                    配置模块
| | |____index.js					状态变量     

| |____utils                        工具目录
| | |____calcDecimal
| | |____clipboard
| | |____validate				        
| |____App.vue				      
| |____main.js				        

```

