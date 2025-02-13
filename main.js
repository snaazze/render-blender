// ✅ Import Three.js & GLTFLoader properly
import * as THREE from "https://unpkg.com/three@0.150.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js";

// ✅ Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✅ Add Lighting (so models are visible!)
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// ✅ Load the GLTF Model
const loader = new GLTFLoader();
loader.load(
    "https://snaazze.github.io/render-blender/scene.gltf", // FULL URL
    function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1); // Adjust size if needed

        // ✅ Automatically Adjust Camera to Model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        camera.position.set(center.x, center.y, cameraZ * 1.5);
        camera.lookAt(center);
    },
    undefined,
    function (error) {
        console.error("⛔ ERROR loading GLTF:", error);
    }
);

// ✅ Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// ✅ Handle Window Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
