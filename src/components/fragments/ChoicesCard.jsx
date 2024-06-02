import InputFile from "../elements/InputFile"
import TextArea from "./TextArea"

const ChoicesCard = ({choice, onClick, isChosen}) => {
    return (
        <>
         <div className="bg-primary shadow-soft rounded-xl w-full overflow-hidden h-max">
                        <div onClick={onClick} className="border-b-2 py-2 px-4 flex items-center justify-between w-full ">
                            <h1>PILIHAN JAWABAN {choice}</h1>
                            <div className="rounded-full bg-btn w-6 h-6"></div>
                        </div>
                <div className={`${choice == isChosen ? 'flex' : 'hidden'}`}>
                    <div className="px-4 py-4">
                        <TextArea rows={'3'}/>
                    <div className="mt-4">
                        <InputFile label={'Gambar'}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ChoicesCard;