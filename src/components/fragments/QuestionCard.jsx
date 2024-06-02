/* eslint-disable react/prop-types */
import CountdownTimer from "../../utils/CountdownTimer";
import MultipleChoices from "../layouts/MultipleChoices"
import TextArea from "./TextArea";

const QuestionCard = ({soal, duration}) => {

    return (
        <div className="bg-primary shadow-multiple">
            <div className="border-b-2 border-neutral-400 px-4 py-2 flex items-center justify-between font-bold">
                <h1 className="text-lg">SOAL NO. {soal.nomor}</h1>
                <div className="flex items-center gap-2 text-sm">
                    <h1>SISA WAKTU</h1>
                    <div className="px-2 py-1 text-white bg-btn">
                        <CountdownTimer initialMinutes={duration}/>
                    </div>
                </div>
            </div>
            {
                soal.pertanyaan == '' ?
                (
                    <div className="text-center w-[600px] py-20 font-bold text-lg text-neutral-500">
                        <h1>Tidak ada data soal</h1>
                    </div>
                )
                :
                soal.type == "essay" ?
                <div>
                    <div className="px-4 font-semibold py-5">
                        <h1>{soal.pertanyaan}</h1>
                    </div>
                    <TextArea/>
                </div>
                :
                <MultipleChoices
                soal={soal}
                option={soal.opsi}
                />
            }

        </div>
    )
}

export default QuestionCard;