/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CountdownTimer from "../../utils/CountdownTimer";
import MultipleChoices from "../layouts/MultipleChoices"
import TextArea from "./TextArea";
import { Loader } from "../elements/Loader";

const QuestionCard = ({soal, duration, number}) => {
    const [answer, setAnswer] = useState([])
    const userAnswer = JSON.parse(localStorage.getItem('user_answer'))
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(loading)
        setLoading(true)
        const timeOut = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timeOut)
    },[number])

    function handleEssayAnswer(e){
        const questionId = soal[number-1].id
        const question = soal[number-1].question
            const target = e.target.value
            const updatedAnswers = answer.map(ans => 
                ans.questionId === questionId ? { ...ans, answer: target } : ans
            );
            const isUpdated = updatedAnswers.some(ans => ans.questionId === questionId);
            
            if (isUpdated) {
                setTimeout(() => {
                    setAnswer(updatedAnswers);
                    localStorage.setItem('user_answer', JSON.stringify(answer))
                }, 2000)
            } else {
                const newAnswer = [...answer,{ 
                    questionId: questionId, 
                    question: question,
                    answer: target, 
                    isAnswered: true, 
                    isDoubt: false 
                }
                ]
                setTimeout(() => {
                    setAnswer(newAnswer);
                    localStorage.setItem('user_answer', JSON.stringify(newAnswer))
                }, 2000)
            }
    }

    return (
        <div className="bg-primary shadow-multiple">
            <div className="border-b-2 border-neutral-400 px-4 py-2 flex items-center justify-between font-bold">
                <h1 className="text-lg">SOAL NO. {number}</h1>
                <div className="flex items-center gap-2 text-sm">
                    <h1>SISA WAKTU</h1>
                    <div className="px-2 py-1 text-white bg-btn">
                        <CountdownTimer initialMinutes={duration}/>
                    </div>
                </div>
            </div>
            {
                soal[number-1].question == '' ?
                (
                    <div className="text-center w-[600px] py-20 font-bold text-lg text-neutral-500">
                        <h1>Tidak ada data soal</h1>
                    </div>
                )
                :
                soal[number-1].question_type == "ESSAY" ?
                <div className={loading ? 'hidden' : ''}>
                    <div className="px-4 font-semibold py-5">
                        <h1>{soal[number-1].question}</h1>
                    </div>
                    <div>
                        {
                            loading ?
                            <Loader/>
                            :
                            <TextArea 
                            onChange={handleEssayAnswer}
                            dataSoalId={soal[number-1].id}
                            number={number-1}
                            />
                        }
                    </div>
                </div>
                :
                <MultipleChoices
                soal={soal[number-1]}
                option={soal[number-1].Choices}
                answer={answer}
                setAnswer={setAnswer}
                />
            }

        </div>
    )
}

export default QuestionCard;