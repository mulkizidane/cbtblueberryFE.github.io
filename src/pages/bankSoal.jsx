import { useState } from "react";
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

const BankSoalPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showSoal, setShowSoal] = useState(false);
    const {userId} = useParams()

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
                        <tr>
                            <td>1</td>
                            <td>0505</td>
                            <td>Matematika</td>
                            <td className="flex flex-col gap-2">
                                <div onClick={() => setShowDetails(!showDetails)} className="flex cursor-pointer items-center gap-2">
                                    <FaFileCircleCheck className="text-sky-400 text-xl"/>
                                    <h1>Soal Ujian Matematika untuk kelas 12</h1>
                                </div>
                                <div className={`${showDetails ? 'flex':'hidden'}  flex-wrap gap-1 max-w-56 `}>
                                    <SmButton value={'Level: 4'}/>
                                    <SmButton value={'Semua Jurusan'}/>
                                    <SmButton value={'PG: 25/40'}/>
                                    <SmButton value={'Essai: 5/20'}/>
                                    <SmButton value={'PG: 30%'} type={'danger'}/>
                                    <SmButton value={'Essai: 70%'} type={'danger'}/>
                                    <SmButton value={'KKM: 70'} type={'ware'}/>
                                    <SmButton value={'Kelas: 12 '}/>
                                    <div className="flex gap-1 text-sm">
                                        {/* <Link to={userId == "admin" ? '/admin/bank-soal/daftar-soal/0505' : '/guru/bank-soal/0505'}> */}
                                        <Link to={`/${userId}/bank-soal/daftar-soal/0505`}>
                                        <SmButton value={'Soal'} icon={<FaPlus/>}/>
                                        </Link>
                                        <SmButton value={'Import'} icon={<BiImport/>}/>
                                        <SmButton value={'Edit'} icon={<FaEdit/>} type={'ware'}/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <FaTrash className="text-red-600"/>
                            </td>
                        </tr>
                    </TableBody>
                </table>

                </CompleteCard>
            </div>
        </Layout>
        <ImportModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={`Import Daftar Soal`}
        />
        <SoalModal
        showSoal={showSoal}
        setShowSoal={setShowSoal}
        />
        </>
    )
}

export default BankSoalPage;