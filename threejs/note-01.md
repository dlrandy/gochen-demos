WEBGL可以使用显卡创建高性能的2D和3D计算机图形。直接WEBGL编程来创建和动画3D场景是非常复杂的冗余且易于出错。

使用threejs可以简单的实现：
1、创建简单或者复杂的3D形状
2、创建AR和VE的场景
3、在3D场景里动画和移动对象
4、给对象应用texture和material
5、使用不同的光源照亮scene
6、从3D-modeling软件里加载对象
7、给3Dscene添加高级的后期处理效果
8、使用自定义的shader
9、创建point clouds

牛笔的demo站
http://www.vill.ee/eye/

在IE10以下使用webgl，可以使用WEBGL插件：IEWebGL：https://github.com/iewebgl/iewebgl

除了本地的文本编辑器之外，官方提供了图形操作的编辑器：http://threejs.org/editor/

python -m SimpleHttpServer

npm install -g http-server

npm install -g simple-http-server(不显示目录列表)

mongoose

运行文件系统
windows
chrome.exe --disable-web-security
mac
open -a 'Google Chrome' --args --disable-web-security
linux
google-chrome --disable-web-security

TrackballControls允许使用鼠标rotate和pan around(平移)scene；

scene对象是容器，承载和追踪所有的渲染obejct和使用的light；

camera对象定义着在渲染scene的时候用户看到的画面；

renderer对象是基于camera看到的画面计算scene。WebGLRenderer使用显卡渲染scene。

renderer分四种：WebGl-based， canvas-based， css-based， SVG-based。除了webgl其他的都很耗费CPU，缺乏material和shadow的支持，不建议使用。


不同的material对light的反映不一样。
basic material对light没有反映

MeshLambertMaterial,MeshPhysicalMaterial和MeshStandardMaterial在渲染的时候，会考虑光源。

渲染shadow需要很大的计算能力，所以threejs默认的没有启用这个功能，要想启用的话：
renderer.shadowMap.enabled = true;

animate scene要做的第一件事就是在特性的间隔重新渲染scene。


不是所有的light都可以castshadow

setInternal会在浏览另一个tab的时候， 这个函数仍然会是执行的。此外setInterval不会和screen的重绘同步。这就导致了更高的CPU的使用, 闪烁和poor 性能。

stats库给出了运行的动画的帧率信息等。要注意初始化之外，在渲染周期内调用更新。

dat.GUI允许实时设置不同的变量对scene进行试验，来找到最佳的效果
http://code.google.com/p/dat-gui/

resize scene：
```javascript
function onResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

```




