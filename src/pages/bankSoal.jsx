import { useEffect, useState } from "react";
import Time from "../components/elements/Time";
import ImportModal from "../components/fragments/ImportModal";
import CompleteCard from "../components/layouts/CompleteCard";
import Layout from "../components/layouts/Layout";
import { FaFileCircleCheck } from "react-icons/fa6";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import TableHead from "../components/elements/TableHead";
import TableBody from "../components/elements/TableBody";
import SmButton from "../components/elements/SmButton";
import { BiImport } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import SoalModal from "../components/fragments/SoalModal";
import DateComponent from "../components/elements/Date";
import axios from "axios";
import { handleDeleteData, handleImportFile } from "../services/subjectServices";
import { Loader } from "../components/elements/Loader";

const BankSoalPage = () => {
    const {userId} = useParams()
    const [examData, setExamData] = useState(null)
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    const [showSoal, setShowSoal] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get('http://localhost:5000/exams')
                setExamData(res.data.data)
            } catch (error) {   
                alert(error.response.data.msg)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [examData])

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="py-2 flex w-full justify-end gap-2">
                    <DateComponent/>
                    <Time/>
                </div>
                <CompleteCard
                setShowModal={setShowModal}
                title={'Daftar Soal'}
                isAddSoal={true}
                isImportFile={true}
                isAddEntries={true}
                setShowSoal={setShowSoal}
                >

                <table className="w-full rounded-lg overflow-hidden">
                    <TableHead>
                        <th>#</th>
                        <th>Kode Soal</th>
                        <th>Nama Mapel</th>
                        <th>Soal</th>
                        <th></th>
                    </TableHead>
                    <TableBody>
                        {
                            loading ?
                            <tr>
                                <td colSpan={10} align="center" className="py-10">
                                    <Loader/>
                                </td>
                            </tr>
                            :
                            examData.length === 0 ?
                            <tr>
                                <td colSpan={10} align="center" className="py-10 font-bold opacity-55">Tidak ada data</td>
                            </tr>
                            :
                            examData?.map((ex, i) => (
                                <tr key={ex.exam_code}>
                                    <td>{i+1}.</td>
                                    <td>{ex.exam_code}</td>
                                    <td>{ex.subject}</td>
                                    <td className="flex flex-col gap-2">
                                        <div onClick={() => setShowDetails(ex.exam_code)} className="flex cursor-pointer items-center gap-2">
                                            <FaFileCircleCheck className="text-sky-400 text-xl"/>
                                            <h1>Soal Ujian {ex.subject} untuk kelas {ex.class}</h1>
                                        </div>
                                        <div className={`${showDetails == ex.exam_code ? 'flex':'hidden'}  flex-wrap gap-1 max-w-56 `}>
                                            <SmButton value={`Level: ${ex.level}`}/>
                                            <SmButton value={'Semua Jurusan'}/>
                                            <SmButton value={`PG: ${ex.total_multiple_choices}/40`}/>
                                            <SmButton value={`Essai: ${ex.total_essay}/20`}/>
                                            <SmButton value={`PG: ${ex.mc_weight}%`} type={'danger'}/>
                                            <SmButton value={`Essai: ${ex.essay_weight}%`} type={'danger'}/>
                                            <SmButton value={`KKM: ${ex.passing_score}`} type={'ware'}/>
                                            <SmButton value={`Kelas: ${ex.class} `}/>
                                            <div className="flex gap-1 text-sm">
                                                {/* <Link to={userId == "admin" ? '/admin/bank-soal/daftar-soal/0505' : '/guru/bank-soal/0505'}> */}
                                                <Link to={`/${userId}/bank-soal/daftar-soal/${ex.exam_code}`}>
                                                <SmButton value={'Soal'} icon={<FaPlus/>}/>
                                                </Link>
                                                <SmButton value={'Import'} icon={<BiImport/>}/>
                                                <SmButton value={'Edit'} icon={<FaEdit/>} type={'ware'}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <FaTrash onClick={() => handleDeleteData(`http://localhost:5000/${userId}/exams/${ex.exam_code}`)} className="text-red-600"/>
                                    </td>
                                </tr>
                            ))
                        }
                    </TableBody>
                </table>

                </CompleteCard>
            </div>
        </Layout>
        <ImportModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={`Import Daftar Soal`}
        onChange={(e) => setFile(e.target.files[0])}
        onClick={() => handleImportFile(file, 'http://localhost:5000/exam/import', setShowModal, setErrMsg)}
        />
        <SoalModal
        showSoal={showSoal}
        setShowSoal={setShowSoal}
        />
        </>
    )
}

export default BankSoalPage;