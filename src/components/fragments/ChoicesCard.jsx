/* eslint-disable react/prop-types */
import TextArea from "./TextArea"

const ChoicesCard = ({choice, onClick, isChosen, correctAnswer, setCorrectAnswer, onChange}) => {

    return (
        <>
        <div className="bg-primary shadow-soft rounded-xl w-full overflow-hidden h-max">
                <div onClick={onClick} className="border-b-2 py-2 px-4 flex items-center justify-between w-full ">
                    <h1>PILIHAN JAWABAN {choice}</h1>
                    <div className={`rounded-full ${isChosen == choice ? 'bg-btn' : correctAnswer == choice ? 'bg-green-600' : 'bg-neutral-400'} w-6 h-6`}></div>
                </div>
            <div className={`${choice == isChosen ? 'flex' : 'hidden'}`}>
                <div className="px-4 py-4">
                    <TextArea rows={'3'} onChange={onChange}/>
                    <button 
                    onClick={() => setCorrectAnswer(choice)} 
                    className={`flex items-center rounded-lg ${correctAnswer == choice ? 'bg-green-600 text-white' : 'bg-neutral-400'} gap-2 mt-2 font-semibold px-8 py-1 w-max`}
                    >
                        <p>Ini jawaban benar</p>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ChoicesCard;