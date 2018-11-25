function init() {
  
  var stats = initStats();

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(120, 60, 180);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x00000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  var planeGeometry = new THREE.PlaneGeometry(180, 180);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0,0,0);

  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(4,4 ,4);
  for (var j = 0; j < (planeGeometry.parameters.height / 5); j++) {
    for(var i = 0; i < planeGeometry.parameters.width / 5; i++) {
      var rnd = Math.random() * 0.75 + 0.25;
      var cubeMaterial = new THREE.MeshLambertMaterial();
      cubeMaterial.color = new THREE.Color(rnd, 0, 0);
      var cube =  new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
      cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
      cube.position.y = 2;

      scene.add(cube);
    }
  }

  var lookAtGeom = new THREE.SphereGeometry(2);
  var lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambertMaterial({color: 0x00ff00}));
  scene.add(lookAtMesh)

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(-20, 40, 60);
  scene.add(directionalLight);

  document.getElementById('webgl-output').appendChild(renderer.domElement);

  var step = 0;
  var trackballControls;
  var controls = new function () {
    this.perspective = 'Perspective';
    this.switchCamera = function () {
      if (camera instanceof THREE.PerspectiveCamera) {
        camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
        camera.position.set(120, 60, 180);
        camera.lookAt(scene.position);

        trackballControls = initTrackballControls(camera, renderer);
        this.perspective = 'Orthographic';
      } else {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;

        

        camera.lookAt(scene.position);
        trackballControls = initTrackballControls(camera, renderer);
        this.perspective = "Perspective";
      }
    }
  }

  var gui = new dat.GUI();
  gui.add(controls, 'switchCamera');
  gui.add(controls, 'perspective').listen();

  camera.lookAt(scene.position);

  trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();
  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.update();

    step += 0.02;
    if (camera instanceof THREE.Camera) {
      var x = 10 + 100 * Math.sin(step);
      camera.lookAt(new THREE.Vector3(x, 10, 0));
      lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0))
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }

}