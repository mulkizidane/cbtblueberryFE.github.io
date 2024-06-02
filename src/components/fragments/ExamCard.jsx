/* eslint-disable react/prop-types */
import { FaTag, FaUserFriends } from "react-icons/fa"
import { useParams } from "react-router-dom";

const ExamCard = ({name, exam, grade, total, minute, kkm, start, finish, onClick}) => {
    const { userId } = useParams()

    return (
        <div className="rounded-lg overflow-hidden shadow-multiple">
                        <div className="flex bg-btn text-white px-4 py-4 gap-4">
                            <img src="/img/test.png" alt="" className="w-8 h-8"/>
                            <div>
                                <h1 className="font-semibold">{name}</h1>
                                <div className="flex gap-2 mt-2">
                                    <div className="flex items-center text-xs font-medium gap-1">
                                        <FaTag/>
                                        <p>{exam}</p>
                                    </div>
                                    <div className="flex items-center text-xs font-medium gap-1">
                                        <FaUserFriends/>
                                        <p>Kelas {grade}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2 font-semibold">
                                    <div className="text-xs text-white bg-btn-sec rounded-full px-2 py-0.5">
                                        <p>{total} soal / {minute} menit</p>
                                    </div>
                                    <div className="text-xs text-white bg-btn-sec rounded-full px-2 py-0.5">
                                        <p>KKM {kkm}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary py-4 px-4">
                            <div className="flex gap-1 justify-center  items-center">
                                <div className="text-xs text-white bg-green-600 rounded-full px-2 py-0.5">
                                    <p>{start}</p>
                                </div>
                                <div className="text-xs text-white bg-red-600 rounded-full px-2 py-0.5">
                                    <p>{finish}</p>
                                </div>
                            </div>
                            {
                                userId == 'admin' ? 
                                ''
                                :
                                <button onClick={onClick} className="bg-btn text-white w-full text-center py-1 text-sm mt-2 rounded-lg">Mulai Ujian</button>
                            }
                        </div>
    </div>
    )
}

export default ExamCard;