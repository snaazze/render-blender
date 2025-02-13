import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/loaders/GLTFLoader.js";

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load GLTF Model
const loader = new GLTFLoader();
loader.load(
    "https://snaazze.github.io/render-blender/scene.gltf",  // Adjust path if needed
    function (gltf) {
        scene.add(gltf.scene);
        camera.position.z = 5;
    },
    undefined,
    function (error) {
        console.error("Error loading GLTF model:", error);
    }
);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Resize Handling
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
