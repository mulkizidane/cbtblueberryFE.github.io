/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ExamChoice from "../elements/ExamChoice";

const MultipleChoices = ({ option, soal, setAnswer, answer }) => {
    const userAnswer = JSON.parse(localStorage.getItem('user_answer')) || [];
    const [corrAns, setCorrAns] = useState('')
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const findData = userAnswer.find(us => us.questionId == soal.id)
        setCorrAns(findData?.answer)
                if(soal){
                    if (soal.image) {
                        const blob = new Blob([new Uint8Array(soal.image.data)], { type: 'image/jpeg' });
                        const url = URL.createObjectURL(blob);
                        setImageUrl(url);
                        return;
                    }
                    setImageUrl(null);
                }
    }, [userAnswer])

    function handleSetAnswer(dt) {
        const updatedAnswers = answer.map(ans => 
            ans.questionId === dt.questionId ? { ...ans, answer: dt.option } : ans
        );
        const isUpdated = updatedAnswers.some(ans => ans.questionId === dt.questionId);

        if (isUpdated) {
            setAnswer(updatedAnswers);
            localStorage.setItem('user_answer', JSON.stringify(updatedAnswers));
        } else {
            const newAnswer = [
                ...answer, 
                { questionId: dt.questionId, question: soal.question, answer: dt.option, isAnswered: true, isDoubt: false }
            ];
            setAnswer(newAnswer);
            localStorage.setItem('user_answer', JSON.stringify(newAnswer));
        }
    }



    return (
        <div className="px-10 pt-6 pb-10">
            <h1>{soal.question}</h1>
            <img className="w-44 rounded-lg my-2 shadow-multiple" src={imageUrl ? imageUrl : ''} alt="" />
            <div className="flex flex-col gap-2 mt-4">
                {
                    option?.map((dt, index) => (
                        <ExamChoice
                            key={index}
                            choice={`${dt.option}. ${dt.text}`}
                            isSelected={corrAns === dt.option}
                            onClick={() => handleSetAnswer(dt, index)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default MultipleChoices;
