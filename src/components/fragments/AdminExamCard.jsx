/* eslint-disable react/prop-types */
import { FaTag, FaUserFriends } from "react-icons/fa"
import { useParams } from "react-router-dom";

const AdminExamCard = ({name, exam, grade, total, minute, kkm, start, finish, onClick}) => {
    const { userId } = useParams()

    return (
        <div className="rounded-lg overflow-hidden shadow-multiple">
                        <div className="flex bg-btn text-white px-2 py-2 gap-4">
                            <img src="/img/test.png" alt="" className="w-8 h-8"/>
                            <div className="pb-2">
                                <h1 className="font-semibold text-xs">{name}</h1>
                                <div className="flex gap-2">
                                    <div className="flex items-center text-[10px] font-medium gap-1">
                                        <FaTag/>
                                        <p>{exam}</p>
                                    </div>
                                    <div className="flex items-center text-[10px] font-medium gap-1">
                                        <FaUserFriends/>
                                        <p>Kelas {grade}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2  font-semibold">
                                    <div className="text-[10px] text-white bg-btn-sec rounded-full px-2 py-0.5">
                                        <p>{total} soal / {minute} menit</p>
                                    </div>
                                    <div className="text-[10px] text-white bg-btn-sec rounded-full px-2 py-0.5">
                                        <p>KKM {kkm}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary py-1 px-4">
                            <div className="flex gap-1 justify-center  items-center">
                                <div className="text-[10px] text-white bg-green-600 rounded-full px-1 py-0.5">
                                    <p>{start}</p>
                                </div>
                                <div className="text-[10px] text-white bg-red-600 rounded-full px-1 py-0.5">
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

export default AdminExamCard;