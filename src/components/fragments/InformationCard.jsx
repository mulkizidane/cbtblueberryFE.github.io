import { AiFillMail } from "react-icons/ai"
import { FaCalendar } from "react-icons/fa"

const InformationCard = () => {
    return (
        <div className="py-5 flex gap-8 px-10">
                        <div className="h-20 relative ">
                            <div className="h-full bg-neutral-400 w-1 rounded-full"></div>
                            <div className="w-8 h-8 rounded-full absolute top-0 -left-[14px] flex justify-center items-center bg-btn-sec">
                            <AiFillMail className="text-white"/>
                            </div>
                        </div>
                        <div className="w-full shadow-multiple">
                            <div className="w-full bg-btn-sec text-white px-4 py-4 flex justify-between">
                                <div className="flex items-end gap-2 font-semibold">
                                    <h1>INFORMASI UJIAN</h1>
                                    <p className="text-neutral-300 text-sm">administrator</p>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-300">
                                    <FaCalendar/>
                                    <h1>22-05-2024 02:00</h1>
                                </div>
                            </div>
                            <div className="bg-primary w-full px-4 py-4 font-medium">
                                <h1>Ujian akan dilaksanakan pada tanggal 22 Mei 2024 di lab komputer 1</h1>
                            </div>
                        </div>
        </div>
    )
}

export default InformationCard