let currentXP = 870;
let currentStreak = 7;
let currentGems = 870;

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function openMenu() {
    const overlay = document.getElementById('slideMenuOverlay');
    const drawer = document.getElementById('slideMenuDrawer');
    if (overlay && drawer) {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            drawer.classList.remove('-translate-x-full');
        }, 10);
    }
}

function closeMenu() {
    const overlay = document.getElementById('slideMenuOverlay');
    const drawer = document.getElementById('slideMenuDrawer');
    if (overlay && drawer) {
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
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
    openModal('Install PWA', 'MultitaskCoder is ready to install! Tap "Add to Home Screen" in your browser menu.');
}

function switchTab(tab) {
    ['home', 'learn', 'code', 'quizzes', 'profile'].forEach(t => {
        const view = document.getElementById(`tab-${t}-view`);
        if (view) view.classList.remove('active');
    });

    const activeView = document.getElementById(`tab-${tab}-view`);
    if (activeView) activeView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function runSandboxCode() {
    const outputEl = document.getElementById('sandboxOutput');
    if (outputEl) {
        outputEl.innerHTML = '<span class="text-amber-400">Executing snippet...</span>';
        setTimeout(() => {
            outputEl.innerHTML = 'Fibonacci(6) = 8<br><span class="text-purple-400 font-bold">[Execution complete - 0 errors]</span>';
        }, 500);
    }
}

function clearSandbox() {
    const code = document.getElementById('sandboxCode');
    const output = document.getElementById('sandboxOutput');
    if (code) code.value = '';
    if (output) output.innerHTML = 'Sandbox cleared.';
}
