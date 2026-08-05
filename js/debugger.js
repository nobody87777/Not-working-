function solveBugChallenge(selectedLine) {
    const status = document.getElementById('debugStatus');
    if (selectedLine === 2) {
        if (status) status.innerHTML = '<span class="text-emerald-400">Bug Squashed! +50 XP</span>';
    } else {
        if (status) status.innerHTML = '<span class="text-rose-400">Try again! Check line index.</span>';
    }
}
