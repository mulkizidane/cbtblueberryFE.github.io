
export function checkAnswers(answers, data) {
    let correctCount = 0;
    let wrongCount = 0;
    
    const updatedUserAnswers = answers.map(answer => {
        const question = data.find(q => q.id === answer.questionId);
        // console.log("ini data user "+answer)
        console.log(question)

        if (question) {
            const validCorrect = question.correct_answer.trim() === answer.answer.trim();
            if (validCorrect) {
                correctCount++;
                return { ...answer, isCorrect: true };
            }
            wrongCount++;
            return { ...answer, isCorrect: false };
        } 
    });
    localStorage.setItem('user_answer', JSON.stringify(updatedUserAnswers));
    return {correctCount, wrongCount}
}
