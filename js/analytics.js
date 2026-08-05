document.addEventListener('DOMContentLoaded', () => {
    renderUserAnalytics();
});

function renderUserAnalytics() {
    const xpBar = document.getElementById('analyticsXpBar');
    if (xpBar) xpBar.style.width = '87%';
}
