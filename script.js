window.addEventListener('load', () => {
    init3DLoader();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => console.error('SW Error:', err));
    }
});

function init3DLoader() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x4c1d95
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    let frameId;
    function animate() {
        frameId = requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.015;
        renderer.render(scene, camera);
    }
    animate();

    let progress = 0;
    const progressBar = document.getElementById('loaderProgressBar');
    const statusText = document.getElementById('loaderStatusText');

    const interval = setInterval(() => {
        progress += 20;
        if (progressBar) progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            if (statusText) statusText.innerText = 'Ready!';
            setTimeout(() => {
                cancelAnimationFrame(frameId);
                const loader = document.getElementById('loaderScreen');
                if (loader) loader.style.opacity = '0';
                setTimeout(() => loader && loader.remove(), 500);
            }, 300);
        }
    }, 150);
}
