  /**
   * add the tree to the tree
   * @param {scene} scene to add the tree to
   */
  function createTree(scene) {
    var trunk = new THREE.CubeGeometry(1, 8, 1);
    var leaves = new THREE.SphereGeometry(4);
    var trunkMesh = new THREE.Mesh(trunk, new THREE.MeshLambertMaterial({
      color: 0x8b4513
    }));
    var leaveMesh = new THREE.Mesh(leaves, new THREE.MeshLambertMaterial({
      color: 0x00ff00
    }));
    trunkMesh.position.set(-10, 4, 0);
    leaveMesh.position.set(-10, 12, 0);

    trunkMesh.castShadow = true;
    trunkMesh.receiveShadow = true;
    leaveMesh.castShadow = true;
    leaveMesh.receiveShadow = true;

    scene.add(trunkMesh);
    scene.add(leaveMesh);
  }

  /**
   *
   *
   * @param {scene} scene
   */
  function createHouse(scene) {
    var roof = new THREE.ConeGeometry(5, 4);
    var base = new THREE.CylinderGeometry(5, 5, 6);

    var roofMesh = new THREE.Mesh(roof, new THREE.MeshLambertMaterial({
      color: 0x8b7213
    }));

    var baseMesh = new THREE.Mesh(base, new THREE.MeshLambertMaterial({
      color: 0xffe4c4
    }));

    roofMesh.position.set(25, 8, 0);
    baseMesh.position.set(25, 3, 0);

    roofMesh.receiveShadow = true;
    baseMesh.receiveShadow = true;
    roofMesh.castShadow = true;
    baseMesh.castShadow = true;

    scene.add(roofMesh);
    scene.add(baseMesh);
  }
  
  /**
   *
   *
   * @param {*} scene
   */
  function createGroundPlane(scene) {
    var planeGeometry = new THREE.PlaneGeometry(70, 50);
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x9acd32
    });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);
  }

  function createBoundingWall(scene) {
    var wallLeft = new THREE.CubeGeometry(70, 2, 2);
    var wallRight = new THREE.CubeGeometry(70, 2, 2);
    var wallTop = new THREE.CubeGeometry(2, 2, 50);
    var wallBottom = new THREE.CubeGeometry(2, 2, 50);

    var wallMaterial = new THREE.MeshLambertMaterial({
      color: 0xa0522d
    });

    var wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial);
    var wallRightMesh = new THREE.Mesh(wallRight, wallMaterial);
    var wallTopMesh = new THREE.Mesh(wallTop, wallMaterial);
    var wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial);

    wallLeftMesh.position.set(15, 1, -25);
    wallRightMesh.position.set(15, 1, 25);
    wallTopMesh.position.set(-19, 1, 0);
    wallBottomMesh.position.set(49, 1, 0);

    scene.add(wallLeftMesh);
    scene.add(wallRightMesh);
    scene.add(wallTopMesh);
    scene.add(wallBottomMesh);

  }

function init() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));//new THREE.Color(0x000000, 1.0)
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  var axes = new THREE.AxesHelper(30);
  scene.add(axes);

  createTree(scene);
  createHouse(scene);
  createGroundPlane(scene);
  createBoundingWall(scene);

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF0000,
  });

  // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // cube.castShadow = true;

  // cube.position.x = -4;
  // cube.position.y = 2;
  // cube.position.z = 0;

  // var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  // var sphereMaterial = new THREE.MeshLambertMaterial({
  //   color: 0x7777ff
  // });
  // var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // sphere.position.x = 20;
  // sphere.position.y = 4;
  // sphere.position.z = 2;
  // sphere.castShadow = true;


  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xAAAAAA
  })
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  plane.receiveShadow = true;

  // scene.add(cube);
  // scene.add(sphere);
  scene.add(plane);

  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-40, 40, -15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;

  scene.add(spotLight);

  document.getElementById('webgl-output').appendChild(renderer.domElement);

  renderer.render(scene, camera)



}