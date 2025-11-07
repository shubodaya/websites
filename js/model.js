import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Function to set up the 3D environment for a model
function setup3DModel(
  containerId,
  modelPath,
  modelFile,
  position,
  scale,
  lightPosition,
  progressId,
  cameraPosition,
  rendererSize,
  distanceRange,
  autoRotate
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(rendererSize[0], rendererSize[1]);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, rendererSize[0] / rendererSize[1], 1, 1000);
  camera.position.set(...cameraPosition);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = distanceRange[0];
  controls.maxDistance = distanceRange[1];
  controls.minPolarAngle = Math.PI / 2 - 0.1; // 90 degrees — lock to horizontal orbit
  controls.maxPolarAngle = Math.PI / 2 + 0.1;
  controls.autoRotate = autoRotate;
  controls.target = new THREE.Vector3(0, 1, 0);
  controls.enableZoom = false;
  controls.update();

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 3, 100);
  pointLight.position.set(...lightPosition);
  scene.add(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(50, 100, 100);
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(100, 200, 100);
scene.add(spotLight);

  const loader = new GLTFLoader().setPath(modelPath);
  loader.load(
    modelFile,
    (gltf) => {
      const mesh = gltf.scene;
      mesh.scale.set(scale[0], scale[1], scale[2]);
      mesh.position.set(...position);

      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(mesh);

      const modelContainer = document.getElementById(containerId);
      if (modelContainer) {
        modelContainer.appendChild(renderer.domElement);
        modelContainer.style.display = 'block';
      }

      const progressContainer = document.getElementById(progressId);
      if (progressContainer) {
        progressContainer.style.display = 'none';
      }
    },
    undefined,
    (error) => console.error('Error loading model:', error)
  );

  window.addEventListener('resize', () => {
    camera.aspect = rendererSize[0] / rendererSize[1];
    camera.updateProjectionMatrix();
    renderer.setSize(rendererSize[0], rendererSize[1]);
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

// Load the **gaming setup** model (concised size)
setup3DModel(
  'gaming-model-container',
  'threeD/gaming_setup/',
  'scene.gltf',
  [0, -50, 0],          // Position
  [15, 15, 15],          // Scale (reduced from 15 to 8)
  [10, 5, -10],       // Light position
  'progress-container-gaming',
  [200, 200, 0],    // Camera position (closer for better framing)
  [window.innerWidth * 0.9, window.innerHeight * 0.9],         // Renderer size (smaller canvas)
  [100, 200],          // Distance range
  false               // Auto-rotate off
);


// Load the earth model without cropping
setup3DModel(
    'model3-container', // Container ID
    'threeD/earth_orbit/', // Path to model files
    'scene.gltf', // Model file
    [0, 0, 0], // Position (x, y, z)
    [700, 700, 700], // Scale (x, y, z)
    [10, 5, 10], // Light position (x, y, z)
    'progress3-container', // ID of the progress container
    [900, 500, 500], // Camera position (x, y, z)
    [window.innerWidth*0.5, window.innerHeight*0.9], // Renderer size
    [100, 900], // Distance range (minDistance, maxDistance)
    true, // Enable auto-rotate
    false
);
