let scene;
let box; //mesh
let camera;
let renderer;
let width = 500;
let height = 250;


function init() {
  'use strict';
  // sceneステージ
  scene = new THREE.Scene();

  //mesh 物体
  // - geometry 形状
  // - material 材質
  box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0xff0000})
  );
  box.position.set(0, 0, 0);
  scene.add(box);

  //camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xefefef);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

  renderer.render(scene, camera);
};

window.onload = init;
