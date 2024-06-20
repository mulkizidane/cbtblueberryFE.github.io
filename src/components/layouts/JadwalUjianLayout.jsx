/* eslint-disable react/prop-types */
import { FaCalendar, FaCopy, FaExclamationCircle } from "react-icons/fa";
import ExamCard from "../fragments/ExamCard";
import ExamModalLayout from "./ExamModalLayout";
import { useContext, useEffect, useState } from "react";
import Heading from "./Heading";
import CardLayout from "./CardLayout"
import axios from "axios";
import StudentContext from "../../context/StudentContext";
import { Loader } from "../elements/Loader";
import { DateFormat } from "../../utils/DateFormat";
import { useParams } from "react-router-dom";

const JadwalUjianLayout = ({width}) => {
    const { user } = useContext(StudentContext)
    const {userId} = useParams()
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isCopied, setIsCopied] = useState(false); 
    const [examData, setExamData] = useState(null)
    
    useEffect(() => {
        if(user){
            const fetchData = async() => {
                try {
                    const res = await axios.get(userId == 'guru' ? 'http://localhost:5000/all-exams' : `http://localhost:5000/exams/class/${user?.data.class}`)
                    setData(res.data.data)
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false)
                }
            }
    
            fetchData()
        }
    }, [user])

    useEffect(() => {
        if(user){
            const fetchData = async() => {
                try {
                    const res = await axios.get(`http://localhost:5000/student/${user?.data.nis}/exam-results`)
                    setExamData(res.data.data.ExamResults)
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false)
                }
            }
    
            fetchData()
        }
    }, [user, data])


    useEffect(() => {
        if(isCopied){
            alert('Token berhasil di salin')
        }
    }, [isCopied])

    function handleCopy(token){
        navigator.clipboard.writeText(token) 
        setIsCopied(true)
    }

    return (
        <>
            <CardLayout width={width}>
                <Heading title={"Jadwal Ujian"}>
                    <FaCalendar/>
                </Heading>
                <div className={`${userId == 'guru' ? 'flex-col' : ''} flex gap-2 px-6 py-6`}>
                    {
                        loading ? 
                        <div className="flex justify-center py-10 w-full">
                            <Loader/>
                        </div>
                        : 
                        data == null ?
                        <div className="w-full py-4 text-center font-bold">
                            <h1 className="opacity-55">No Exam For This Class</h1>
                        </div>
                        :
                        data.map(dt => (
                            <ExamCard
                            key={dt.exam_code}
                            isDone={examData ? dt.exam_code == examData[0]?.exam_code : dt.exam_code}
                            onClick={() => setShowModal(dt.exam_code)}
                            name={dt.subject}
                            exam={dt.exam_type}
                            grade={dt.class}
                            total={dt.total_multiple_choices + dt.total_essay}
                            minute={dt.exam_duration}
                            kkm={dt.passing_score}
                            start={DateFormat(dt.start_exam)}
                            finish={DateFormat(dt.end_exam)}
                            />
                        ))
                    }
                    
                </div>
            <ExamModalLayout 
            showModal={showModal}
            user={user}
            examData={data}
            />
            </CardLayout>
            <div className={`${userId == 'guru' ? 'hidden' : '' } w-96 h-44 pt-24 pr-7`}>
                    <div className="bg-primary rounded-lg shadow-multiple overflow-hidden">
                        <div className="bg-btn text-white font-bold px-4 py-2">
                            <h1>TOKEN UJIAN</h1>
                        </div>
                        <div className="px-4 py-4">
                            <div className="text-red-500 flex text-sm font-medium  gap-2">
                                <FaExclamationCircle className="text-xl mt-1"/>
                                <p>Jangan berikan token ini kepada siapapun</p>
                            </div>
                            <div className="flex flex-col mt-4 px-4 gap-2">
                                <ul>
                                    {
                                        loading ?
                                        <Loader/>
                                        :
                                        data?.map(dt => (
                                        <li key={dt.exam_code} className={`${dt.exam_code == examData[0]?.exam_code ? 'hidden' : ''} list-disc`}>
                                            <h1 className="font-bold">{dt.subject}</h1>
                                            <div onClick={() => handleCopy(dt.exam_token)} className="flex gap-2 mt-1 text-btn items-center cursor-pointer">
                                                <FaCopy/>
                                                <p>{dt.exam_token}</p>
                                            </div>
                                        </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default JadwalUjianLayout;