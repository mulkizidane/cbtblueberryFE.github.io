
/* eslint-disable react/prop-types */
const ExamNum = ({index, bg, onClick, bgClass}) => {
    return (
        <div onClick={onClick} className={`text-white cursor-pointer bg-btn w-8 h-8 py-1 text-center ${bgClass ? bgClass : 'bg-neutral-500'}`}>
            <h1>{index + 1}</h1>
        </div>
    )
}

export default ExamNum