import { Link, useParams } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import CompleteCard from "../components/layouts/CompleteCard";
import SmButton from "../components/elements/SmButton";
import { FaPlus, FaTrash } from "react-icons/fa";
import QuestionList from "../components/fragments/QuestionList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/elements/Loader";
import ReturnHead from "../components/fragments/ReturnHead";

const AdminSoalPage = () => {
    const {soalId, userId} = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/exam/${soalId}/questions`)
                setData(response.data.data)
                setLoading(false) 
            } catch (error) {
                setLoading(false)
                alert(error.response.data.msg)
            }
        }

        fetchData()
    }, [data, soalId])

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <ReturnHead
                value={'Kembali ke bank soal'}
                to={`/${userId}/bank-soal`}
                />
                <CompleteCard title={`Daftar Soal ${soalId}`}>
                    <div className="flex w-full justify-between font-semibold px-4">
                        <h1>A. Pilihan Ganda</h1>
                        <div className="flex gap-2">
                            <Link to={`/${userId}/bank-soal/daftar-soal/${soalId}/upload-pg/1`}>
                                <SmButton  icon={<FaPlus/>} value={'Soal PG'}/>
                            </Link>
                            <Link to={`/${userId}/bank-soal/daftar-soal/${soalId}/upload-essai/1`}>
                            <SmButton icon={<FaPlus/>} value={'Soal Essai'}/>
                            </Link>
                            <SmButton icon={<FaTrash/>} value={'Hapus'} type={'danger'}/>
                        </div>
                    </div>
                    <div className="question-wrap rounded-lg overflow-hidden w-full font-semibold mt-4">
                        {
                            loading ?
                            <div className="py-10 flex justify-center text-xl font-bold">
                                <Loader/>
                            </div>
                            :
                            data.length == 0 ?
                            <div className="py-10 text-center text-xl font-bold">
                                <h1 className="opacity-50">No data exsist</h1>
                            </div>
                            :
                            data?.map((dt, i) => (
                                <QuestionList
                                key={dt.no_question}
                                no={i+1}
                                question={dt.question}
                                answer={dt.correct_answer}
                                id={dt.id}
                                soalId={soalId}
                                />
                        ))
                        }
                    </div>
                </CompleteCard>
            </div>
        </Layout>
        </>
    )
}

export default AdminSoalPage;