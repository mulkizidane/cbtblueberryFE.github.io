
/* eslint-disable react/prop-types */
const ExamChoice = ({choice, onClick, isSelected}) => {

    return (
        <div onClick={onClick} className="flex gap-3 items-center cursor-pointer">
            <div className={`rounded-full border-2 w-4 h-4 border-neutral-700 ${isSelected  ? 'bg-btn' : 'bg-transparent'}`}></div>
            <p>{choice}</p>
        </div>
    )
}

export default ExamChoice;