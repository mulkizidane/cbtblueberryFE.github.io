import { useParams } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import CardLayout from "../components/layouts/CardLayout";
import Heading from "../components/layouts/Heading";
import { FaCheckCircle, FaFile } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import ExamResultData from "../data/ExamResultData";
import StudentContext from "../context/StudentContext";
import axios from "axios";

const ExamResultDetail = () => {
    const {examId} = useParams()
    const {user} = useContext(StudentContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const findData = data?.find(dt => dt.exam_code == examId)
   
    useEffect(() => {
        if(user){
            const fetchData = async() => {
                try {
                        const res = await axios.get(`http://localhost:5000/${user?.data.nis}/exam-results`)
                        console.log(res.data.data)
                        setData(res.data.data)
                        setLoading(false)
                } catch (error) {
                    console.log(error)
                }
            }
    
            fetchData()
        }
    }, [user])

    if(loading){
        return <h1>loading...</h1>
    }
    return(
        <>
        <Layout>
            <CardLayout>
                <Heading title={"HASIL UJIAN"}>
                    <FaFile/>
                </Heading>
                <div className="px-5 py-5">
                    <table style={{ width: '100%', textAlign: 'left'}} className="rounded-lg shadow-soft overflow-hidden">
                        <tbody>
                            <tr>
                                <td>No Induk Siswa</td>
                                <td>:</td>
                                <td>{user?.data.nis}</td>
                                <td className={`${findData.information == 'Lulus' ? 'text-green-600' : 'text-red-600'} font-bold text-center`}>{findData.information}</td>
                            </tr>
                            <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>{user?.data.name}</td>
                                <td rowSpan={4} className="text-4xl font-bold text-center">{findData.total_grade}</td>
                            </tr>
                            <tr>
                                <td>Kelas</td>
                                <td>:</td>
                                <td>{user?.data.class}</td>
                            </tr>
                            <tr>
                                <td>Mata Pelajaran</td>
                                <td>:</td>
                                <td>{findData.subject}</td>
                            </tr>
                            <tr>
                                <td>Nama Ujian</td>
                                <td>:</td>
                                <td>{findData.subject}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 px-5 py-5">
                <table border="1" style={{ width: '100%', textAlign: 'left'}} className="rounded-lg overflow-hidden">
                        <thead className="bg-btn text-white">
                            <tr className="divide-x-2 text-center">
                            <th>#</th>
                            <th>SOAL PG</th>
                            <th>HASIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                findData.QuestionResults?.map((dt, index) =>(
                                <tr key={dt.id}>
                                    <td>{index + 1}</td>
                                    <td>{dt.question}</td>
                                    <td className="text-center">
                                        {
                                        dt.result ? 
                                        <FaCheckCircle className="text-green-500 mx-auto text-xl"/>
                                        : 
                                        <FaCheckCircle className="text-red-500 mx-auto text-xl"/>
                                        }
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                </table>
                </div>
            </CardLayout>
        </Layout>
        </>
    )
}

export default ExamResultDetail;