import { useParams } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import CardLayout from "../components/layouts/CardLayout";
import Heading from "../components/layouts/Heading";
import { FaCheckCircle, FaFile } from "react-icons/fa";
import { useEffect, useState } from "react";
import ExamResultData from "../data/ExamResultData";

const ExamResultDetail = () => {
    const {examId} = useParams()
    const chosenSiswa = ExamResultData.find(dt => dt.test_code == examId);
    const [data, setData] = useState(chosenSiswa.siswa)

    useEffect(() => {
        console.log(data)
    }, [data])

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
                                <td>{examId}</td>
                                <td className="text-red-600 font-bold text-center">{data.is_lulus}</td>
                            </tr>
                            <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>{data.name}</td>
                                <td rowSpan={4} className="text-4xl font-bold text-center">{data.grade}</td>
                            </tr>
                            <tr>
                                <td>Kelas</td>
                                <td>:</td>
                                <td>{data.kelas}</td>
                            </tr>
                            <tr>
                                <td>Mata Pelajaran</td>
                                <td>:</td>
                                <td>{data.matpel}</td>
                            </tr>
                            <tr>
                                <td>Nama Ujian</td>
                                <td>:</td>
                                <td>{data.exam_name}</td>
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
                                data.soal_pg.map((dt, index) =>(
                                <tr key={dt.no}>
                                    <td>{index + 1}</td>
                                    <td>{dt.text}</td>
                                    <td className="text-center">
                                        {
                                        dt.is_success ? 
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