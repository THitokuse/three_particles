// 変数の定義
let scene;
let camera;
let renderer;
let width = 500;
let height = 250;
let controls;

let particles;
let loader;

function init() {
  // sceneステージ
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(100, 100, 100);
  camera.lookAt(scene.position);

  // controls
  controls = new THREE.OrbitControls(camera);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

  // particles
  // mesh: Points
  // - geometry: 図形の頂点
  // - material: PointsMaterial
  loader = new THREE.TextureLoader();
  loader.load('img/star.png', function(texture) {
    createParticles(texture);
    render();
  });

  function createParticles(texture) {
    let pGeometry;
    let pMaterial;
    let count = 200;

    // pGeometry
    pGeometry = new THREE.Geometry();
    for (i = 0; i < count; i++) {
      pGeometry.vertices.push(
        new THREE.Vector3(
          Math.random() * 200 - 100,
          Math.random() * 200 - 100,
          Math.random() * 200 - 100
        )
      );
    }
    // pMaterial
    pMaterial = new THREE.PointsMaterial({
      map: texture,
      size: 32,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false
    });

    particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);
  }

  function render() {
    requestAnimationFrame(render);

    particles.rotation.y += 0.001;
    controls.update();
    renderer.render(scene, camera);
  }
};

window.onload = init;
