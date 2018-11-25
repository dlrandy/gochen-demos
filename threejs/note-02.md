Camera:
决定了在屏幕上渲染什么。在THREEjs渲染scene的时候，会自动加上camera，所以可以不需要手动添加
Lights:
影响materials的展示方式，创建shadow effect。
Objects:
在Camera的透视下渲染的主要对象。
Renderer:
使用camera和scene的信息在屏幕上绘画。
Scene:
作为一切需要渲染的对象的容器。

scene的几个常用方法：
remove, add, children, traverse, getObjectByName(name, recursive);

scene的两个比较有意思的属性：
fog 和 overrideMaterial；
fog给整个的scene加上fog效果，一个对象离camera越远，在视野里隐藏的就越多。
```javascript
scene.fog = new THREE.Fog(hex-color, near-density, far-density);//linear 
scene.fog = new THREE.FogExp2(color, init-density);//THREE.FogExp2随着距离指数增长
```
overrideMaterial会把scene里所有对象都将使用它设置的material。一般用在大量对象共享同一个material的时候


THREEjs里的几何体就是点和面的集合。面经常是由组成三角形的三个点组成。

face3的参数是vertices的索引。vertice的顺序很重要，前脸要使用顺时针的顺序，后脸要使用逆时针的顺序。face3是一个triangle。cube的一个side需要两个traiangle。之前的threejs使用弧来定义face。 四点成弧。

在3D建模领域使用弧还是三角成面一直存有争议。一般在建模的时候使用弧，因为弧比三角更易强化和平滑。对于渲染和游戏引擎来说，三角却更容易，因为三角渲染高效。

Threejs认为mesh的geometry不会改变在他的生命周期里。


Mesh的函数和属性：
，position，rotation，scale,translateX,Y,Z, visible， children.


Geometry的属性和方法：
vertices，faces， computeFaceNormals()，clone();
创建face的点序列的顺序很重要，顺时针是前脸，逆时针是后脸。



THREEjs里有两个不同的Camerta类型：orthographic和perspective。但是它也提供一些特定的camera给3D眼镜盒VR

对于Perspective Camera来说，离Camera越远，物体越小。
对于Orthographic Camera来说，所有的物体大小是一样的， 不受物体和Camera的远近影响。
```javascript
new THREE.PerspectiveCamera(fov, aspect, near, far, zoom);
new THREE.OrthographicCamera(left, right, top, bottom, near, far, zoom);
```
Camera默认指到scene的(0,0,0)可以使用look at进行修改：
```javascript
camera.lookAt(new THREE.Vector3(x, y, z))
```
THREE.PerspectiveCamera是使用真实的角度渲染的scene
THREE.OrthographicCamera提供的是伪3D效果；











