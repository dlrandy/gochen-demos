var camera;
var scene;
var renderer;
function init() {
  console.log(`Using Threejs version: ${THREE.REVISION}`);

  var stats = initStats();
  //create a scane, that will hold all our elements such as Objects, cameras and lights
  scene = new THREE.Scene();
  //create a camera, which defines where we're looking at,
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  //create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  //show axes in the screen
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });

  //create the ground plane
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  //rotate abd position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  plane.receiveShadow = true;
  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
    // wireframe: true,
  });

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.position.set(-4, 3, 0);
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
    // wireframe: true,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  sphere.position.set(20, 4, 2);

  scene.add(sphere);

  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.getElementById("webgl-output").appendChild(renderer.domElement);

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();
  //controlls
  var steps = 0;
  var controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
  }();

  var gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "bouncingSpeed", 0, 0.5);

  render();

  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    steps += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(steps);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(steps));
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

//resize
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onResize, false);
