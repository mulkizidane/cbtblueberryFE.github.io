import { FaFile } from "react-icons/fa";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ExamResultData from "../data/ExamResultData"
import CardLayout from "../components/layouts/CardLayout";
import axios from "axios";
import StudentContext from "../context/StudentContext";
import { Loader } from "../components/elements/Loader";
import { DateFormat } from "../utils/DateFormat";

const ExamResult = () => {
    const {user} = useContext(StudentContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        const fetchData = async() => {
            try {
                    const res = await axios.get(`http://localhost:5000/student/${user?.data.nis}/exam-results`)
                    setData(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [user])

    return(
        <>
        <Layout>
            <CardLayout>
                        <Heading title={"HASIL UJIAN"}>
                            <FaFile/>
                        </Heading>
                        <div className="py-5 px-10">
                        <table border="1" style={{ width: '100%', textAlign: 'center'}} className="rounded-lg overflow-hidden">
                        <thead className="bg-btn text-white">
                            <tr className="divide-x-2">
                            <th>#</th>
                            <th>KODE TES</th>
                            <th>KODE RUANGAN</th>
                            <th>NAMA PENGAWAS</th>
                            <th>TANGGAL DAN WAKTU TES</th>
                            <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="bg-secondary font-semibold">
                            {
                                loading ?
                                <tr>
                                    <td>
                                        <Loader/>
                                    </td>
                                </tr>
                                :
                                data.data?.ExamResults?.map((dt, i) => (
                                    <tr key={dt.userId} className="divide-x-2">
                                        <td>{i+1}</td>
                                        <td>{dt.exam_code}</td>
                                        <td>{data.data?.room}</td>
                                        <td>Guru</td>
                                        <td>{DateFormat(dt.exam_date)}</td>
                                        <td>
                                        <Link to={`/siswa/hasil-ujian/${dt.exam_code}`}>
                                            <button className="bg-btn mx-auto text-white rounded-full px-3 py-1 flex items-center gap-2 text-sm font-semibold">
                                                <FaMagnifyingGlass/>
                                                LIHAT HASIL
                                            </button>
                                        </Link>
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

export default ExamResult;