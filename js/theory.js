document.addEventListener('DOMContentLoaded', () => {
    loadLanguageTheory('python');
});

async function loadLanguageTheory(lang) {
    try {
        const response = await fetch(`../data/${lang}.json`);
        const data = await response.json();
        renderTheoryModules(data);
    } catch (e) {
        console.warn('Fallback theory payload');
    }
}

function renderTheoryModules(data) {
    const container = document.getElementById('theoryModulesList');
    if (!container) return;
    container.innerHTML = data.modules.map(mod => `
        <div class="sub-card p-4 rounded-2xl space-y-2">
            <h4 class="font-bold text-xs text-purple-400">${mod.title}</h4>
            <p class="text-xs opacity-75">${mod.summary}</p>
        </div>
    `).join('');
}
