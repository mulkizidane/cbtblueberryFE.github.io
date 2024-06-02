import { FaFile } from "react-icons/fa";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import ExamResultData from "../data/ExamResultData"
import CardLayout from "../components/layouts/CardLayout";

const ExamResult = () => {
    const [data, setData] = useState(ExamResultData)

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
                                data.map(dt => (
                                    <tr key={dt.no} className="divide-x-2">
                                        <td>{dt.no}</td>
                                        <td>{dt.test_code}</td>
                                        <td>{dt.room_code}</td>
                                        <td>{dt.pengawas}</td>
                                        <td>{dt.test_date}</td>
                                        <td>
                                        <Link to={`/siswa/hasil-ujian/${dt.test_code}`}>
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