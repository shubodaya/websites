import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Function to set up the 3D environment for each model
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
    distanceRange, // [minDistance, maxDistance]
    autoRotate,
    shouldCrop = false, // Default is false (no cropping)
    clippingPlaneNormal = new THREE.Vector3(0, 0, 1), // Default cropping direction (Z-axis)
    clippingPlaneConstant = 5 // Default cropping position (along Z-axis)
) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(rendererSize[0], rendererSize[1]); // Set size based on the parameters
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, rendererSize[0] / rendererSize[1], 1, 1000);
    camera.position.set(...cameraPosition); // Set camera position based on the parameters

    // Conditionally apply the clipping plane
    if (shouldCrop) {
        const clippingPlane = new THREE.Plane(clippingPlaneNormal, clippingPlaneConstant);  
        renderer.clippingPlanes = [clippingPlane]; // Apply cropping
    } else {
        renderer.clippingPlanes = []; // No cropping
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = distanceRange[0]; // Set minimum distance
    controls.maxDistance = distanceRange[1]; // Set maximum distance
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = 1.5;
    controls.autoRotate = autoRotate; // Set auto-rotate
    controls.target = new THREE.Vector3(0, 1, 0);
    controls.enableZoom = false; // Prevents scroll zooming
    controls.update();

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 3, 100);
    pointLight.position.set(...lightPosition);
    scene.add(pointLight);

    // Add additional directional light for more ambient lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(50, 100, 100);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add a spotlight for a focused light effect
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(100, 200, 100);
    spotLight.castShadow = true;
    scene.add(spotLight);


    // Load the model
    const loader = new GLTFLoader().setPath(modelPath);
    loader.load(modelFile, (gltf) => {
        console.log('Loading model:', modelFile);
        const mesh = gltf.scene;

        mesh.scale.set(scale[0], scale[1], scale[2]);
        mesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        mesh.position.set(...position);
        scene.add(mesh);
        console.log('Model loaded and added to the scene');

        // Append the renderer output to the model container
        const modelContainer = document.getElementById(containerId);
        if (modelContainer) {
            modelContainer.appendChild(renderer.domElement);
            modelContainer.style.display = 'block'; // Make sure the container is visible
        } else {
            console.error('Model container not found!');
        }

        // Hide the progress container
        const progressContainer = document.getElementById(progressId);
        if (progressContainer) {
            progressContainer.style.display = 'none';
        } else {
            console.error('Progress container not found!');
        }
    }, (xhr) => {
        console.log(`Loading ${xhr.loaded / xhr.total * 100}%`);
    }, (error) => {
        console.error('Error loading model:', error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(rendererSize[0], rendererSize[1]); // Set size on resize
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

// Load the satellite model with cropping
setup3DModel(
    'model-container',
    'threeD/satellite/',
    'scene.gltf',
    [0, 0, 0], // Position
    [25, 25, 25], // Scale
    [10, 50, 10], // Light position
    'progress-container', // ID of the progress container
    [200, 100, 0], // Camera position
    [window.innerWidth * 0.60, window.innerHeight * 0.75], // Renderer size
    [300, 500], // Distance range (minDistance, maxDistance)
    true, // Auto-rotate
    true, // Enable cropping
    new THREE.Vector3(0, 0, 0), // Crop along Z-axis
    5 // Crop at 5 units along Z-axis
);



// Load the gaming setup model without cropping
setup3DModel(
    'gaming-model-container',
    'threeD/gaming_setup/',
    'scene.gltf',
    [0, 0, 0], // Position
    [15, 15, 15], // Scale
    [10, 5, -10], // Light position
    'progress-container-gaming', // ID of the progress container
    [200, 200, 0], // Camera position
    [window.innerWidth, window.innerHeight], // Renderer size
    [150, 200], // Distance range (minDistance, maxDistance)
    false, // No auto-rotate
    false // Disable cropping
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
