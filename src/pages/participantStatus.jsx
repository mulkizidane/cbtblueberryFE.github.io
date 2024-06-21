import { FaCheck, FaUserFriends } from "react-icons/fa";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import { FaX } from "react-icons/fa6";
import { IoRefreshCircle } from "react-icons/io5";
import DateComponent from "../components/elements/Date";
import Time from "../components/elements/Time";
import { useEffect, useState } from "react";
import axios from "axios";

const ParticipantStatusPage = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [corrAns, setCorrAns] = useState(0)
    const [wrongAns, setWrongAns] = useState(0)
    const examResults = data?.map(dt => dt.ExamResults[0]);
    const questRes = examResults?.map(dt => dt.QuestionResults);

    useEffect(() => {
        if(questRes){
            const findCorrect = questRes[0]?.filter(dt => dt.result == true)
            const findWrong = questRes[0]?.filter(dt => dt.result !== true)
            setCorrAns(findCorrect?.length)
            setWrongAns(findWrong?.length)
        }
    }, [questRes])

    useEffect(() => {
        const fetchData = async() => {
            try {
                    const res = await axios.get(`http://localhost:5000/student/exam-results`)
                    const isExamResults = res.data.data.filter(dt => dt.ExamResults.length !== 0)
                    if(isExamResults){
                        setData(isExamResults)
                        console.log(isExamResults)
                    }
                    setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="w-full flex justify-end gap-2 py-4">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="bg-primary rounded-lg shadow-soft w-full pb-4">
                <Heading title={'Status Peserta'}>
                    <FaUserFriends/>
                </Heading>
                <div className="px-2 py-2">
                    <div className="flex justify-end gap-2">
                        <label htmlFor="search" className="font-bold">Search:</label>
                        <input type="search" name="search" id="search" className="rounded-full bg-transparent border-2 border-neutral-400 py-0.5"/>
                    </div>
                    <table className="rounded-lg overflow-hidden w-full mt-4  text-center">
                        <thead>
                            <tr className="bg-btn text-white">
                                <th>#</th>
                                <th>NIS</th>
                                <th>Nama</th>
                                <th>Kelas</th>
                                <th>Mapel</th>
                                <th>Lama Ujian</th>
                                <th>Jawaban</th>
                                <th>Nilai</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((dt, i) => (
                            <tr key={dt.nis}>
                                <td>{i+1}</td>
                                <td>{dt.nis}</td>
                                <td>{dt.name}</td>
                                <td>{dt.class}</td>
                                <td>{dt.ExamResults[0].subject}</td>
                                <td>{dt.ExamResults[0].exam_duration} Menit</td>
                                <td className="flex items-center justify-center gap-1">
                                    <div className="px-1 py-0.5 text-white bg-green-600 flex items-center text-xs gap-1">
                                        <FaCheck/>
                                        <p>{corrAns}</p>
                                    </div>
                                    <div className="px-1 py-0.5 text-white bg-red-600 flex items-center text-xs gap-1">
                                        <FaX/>
                                        <p>{wrongAns}</p>
                                    </div>
                                </td>
                                <td>{dt?.ExamResults[0].total_grade} Point</td>
                                <td>{dt.status}</td>
                                <td>
                                    <IoRefreshCircle onClick={() => window.location.reload()} className="text-btn text-2xl cursor-pointer"/>
                                </td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

export default ParticipantStatusPage;