let targetSnippet = "def calculate_sum(a, b):\n    return a + b";

function checkTypingSpeed(inputVal) {
    const output = document.getElementById('wpmDisplay');
    const wpm = Math.round((inputVal.length / 5) * 2);
    if (output) output.innerText = `${wpm} WPM`;
}
