function init() {
  var stats = initStats();

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(camera, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0,0,0);

  scene.add(plane);

  camera.position.set(-50, 30, 20);
  camera.lookAt(new THREE.Vector3(-10, 0, 0));

  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  var spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, Math.PI / 4, 0, 2);
  spotLight.castShadow = true;
  spotLight.position.set(-40, 30, 30);
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.mapSize.width = 1024;
  scene.add(spotLight);
  addGeometries(scene);

  function addGeometries(scene) {
    var geoms = [];
    geoms.push(new THREE.CylinderGeometry(1, 4, 4));

    geoms.push(new THREE.BoxGeometry(2,2,2));

    geoms.push(new THREE.SphereGeometry(2));

    geoms.push(new THREE.IcosahedronGeometry(4));

    var points = [
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(2, 2, -2),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(-2, 2, 2),
      new THREE.Vector3(2, -2, 2),
      new THREE.Vector3(2, -2, -2),
      new THREE.Vector3(-2, -2, -2),
      new THREE.Vector3(-2, -2, 2)
    ];

    geoms.push(new THREE.ConvexGeometry(points));

    var pts = [],
    detail = .1,
    radius = 3;
    for (var angle = 0; angle < Math.PI; angle += detail) {
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    geoms.push(new THREE.LatheGeometry(pts, 12));

    geoms.push(new THREE.OctahedronGeometry(3));

    geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10))

    geoms.push(new THREE.TetrahedronGeometry(3));

    geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

    geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));
    var j = 0;
    for (let i = 0; i < geoms.length; i++) {
      var cubeMaterial = new THREE.MeshLambertMaterial({
        wireframe: true,
        color: Math.random() * 0xffffff,
      });

      var materials = [
        new THREE.MeshLambertMaterial({
          color: Math.random() * 0xffffff,
        }),
        new THREE.MeshLambertMaterial({
          color: 0x000000,
          wireframe: true,
        })
      ];

      var mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials);
      mesh.traverse(function (e) {
        e.castShadow = true;
      });

      mesh.position.set(
        -24 + (i % 4) * 12,
        4,
        -8 + j * 12
      );

      if ((i + 1) % 4 === 0) {
        j++;
      }
      scene.add(mesh);
      
    }
  }

  document.getElementById("webgl-output").appendChild(renderer.domElement);

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.update();

    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }

}




