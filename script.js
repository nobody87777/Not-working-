// Save this file as: script.js
let currentXP = 870;
let currentStreak = 7;
let currentGems = 870;

// --- Three.js 3D Loader Initialization ---
window.addEventListener('load', () => {
    init3DLoader();
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

    // Create glowing 3D torus knot & floating particle ring
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x4c1d95,
        wireframe: false
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 12;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x7c3aed, 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation Loop
    let animationFrameId;
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.015;
        particlesMesh.rotation.y -= 0.005;
        renderer.render(scene, camera);
    }
    animate();

    // Simulate Loading Progress
    let progress = 0;
    const progressBar = document.getElementById('loaderProgressBar');
    const statusText = document.getElementById('loaderStatusText');
    const statuses = [
        "Initializing 3D Matrix...",
        "Loading Compiler Modules...",
        "Syncing User Profiles...",
        "Preparing Sandbox Workspace...",
        "Ready!"
    ];

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 18) + 12;
        if(progress >= 100) {
            progress = 100;
            clearInterval(interval);
            if (statusText) statusText.innerText = "Ready!";
            if (progressBar) progressBar.style.width = '100%';
            setTimeout(() => {
                cancelAnimationFrame(animationFrameId);
                const loader = document.getElementById('loaderScreen');
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 700);
                }
            }, 400);
        } else {
            if (progressBar) progressBar.style.width = progress + '%';
            const statusIdx = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
            if (statusText) statusText.innerText = statuses[statusIdx];
        }
    }, 180);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => themeIcon.style.transform = 'rotate(0deg)', 300);
    }

    if(body.classList.contains('dark')) {
        body.classList.remove('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        body.classList.add('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

function openMenu() {
    const overlay = document.getElementById('slideMenuOverlay');
    const drawer = document.getElementById('slideMenuDrawer');
    if (overlay && drawer) {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            drawer.classList.remove('-translate-x-full');
            drawer.classList.add('menu-open');
        }, 10);
    }
}

function closeMenu() {
    const overlay = document.getElementById('slideMenuOverlay');
    const drawer = document.getElementById('slideMenuDrawer');
    if (overlay && drawer) {
        drawer.classList.remove('menu-open');
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
}

function handleMenuClick(title, desc) {
    closeMenu();
    openModal(title, desc);
}

function openModal(title, desc) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modal = document.getElementById('appModal');

    if (modalTitle) modalTitle.innerText = title;
    if (modalDesc) modalDesc.innerText = desc;
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal() {
    const modal = document.getElementById('appModal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
}

function installApp() {
    openModal('Install PWA App', 'MultitaskCoder is ready to install as a Progressive Web App. Tap "Add to Home Screen" in your mobile browser options!');
}

function solveChallenge() {
    currentXP += 50;
    currentGems += 25;
    const xpText = document.getElementById('xpText');
    const xpBar = document.getElementById('xpBar');
    const gemCount = document.getElementById('gemCount');
    const profileXp = document.getElementById('profileXp');

    if (xpText) xpText.innerHTML = `${currentXP} <span class="text-xs font-normal opacity-75">/ 1000 XP</span>`;
    if (xpBar) xpBar.style.width = `${(currentXP/1000)*100}%`;
    if (gemCount) gemCount.innerText = currentGems;
    if (profileXp) profileXp.innerText = currentXP;
    openModal('Challenge Solved! 🎉', 'You successfully fixed the loop bug! +50 XP and +25 Gems credited to your account.');
}

function runSandboxCode() {
    const outputEl = document.getElementById('sandboxOutput');
    if (outputEl) {
        outputEl.innerHTML = '<span class="text-amber-400 animate-pulse">Compiling & executing...</span>';
        setTimeout(() => {
            outputEl.innerHTML = 'Fibonacci(6) = 8<br><span class="text-purple-400 font-bold">[Execution finished in 42ms with 0 errors]</span>';
        }, 600);
    }
}

function clearSandbox() {
    const code = document.getElementById('sandboxCode');
    const output = document.getElementById('sandboxOutput');
    if (code) code.value = '';
    if (output) output.innerHTML = 'Sandbox cleared.';
}

function switchTab(tab) {
    ['home', 'learn', 'code', 'quizzes', 'profile'].forEach(t => {
        const view = document.getElementById(`tab-${t}-view`);
        if(view) view.classList.remove('active');

        const navEl = document.getElementById(`nav-${t}`);
        if(navEl && t !== 'code') {
            navEl.classList.remove('text-purple-500');
            navEl.classList.add('opacity-60');
        }
    });

    const activeView = document.getElementById(`tab-${tab}-view`);
    if(activeView) activeView.classList.add('active');

    if(tab !== 'code') {
        const activeNav = document.getElementById(`nav-${tab}`);
        if(activeNav) {
            activeNav.classList.remove('opacity-60');
            activeNav.classList.add('text-purple-500');
        }
    }

    window.scrollTo({top: 0, behavior: 'smooth'});
}
