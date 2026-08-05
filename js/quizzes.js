let currentQuizScore = 0;

function selectQuizAnswer(isCorrect) {
    if (isCorrect) currentQuizScore += 10;
    const scoreDisplay = document.getElementById('quizScoreText');
    if (scoreDisplay) scoreDisplay.innerText = `Score: ${currentQuizScore} XP`;
}
