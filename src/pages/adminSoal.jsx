import { Link, useParams } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Time from "../components/elements/Time";
import CompleteCard from "../components/layouts/CompleteCard";
import SmButton from "../components/elements/SmButton";
import { FaPlus, FaTrash } from "react-icons/fa";
import DateComponent from "../components/elements/Date";

const AdminSoalPage = () => {
    const {soalId, userId} = useParams()

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="flex justify-end gap-2 py-4">
                    <DateComponent/>
                    <Time/>
                </div>
                <CompleteCard title={`Daftar Soal ${soalId}`}>
                    <div className="flex w-full justify-between font-semibold px-4">
                        <h1>A. Pilihan Ganda</h1>
                        <div className="flex gap-2">
                            <Link to={`/${userId}/bank-soal/daftar-soal/0505/upload-pg`}>
                                <SmButton  icon={<FaPlus/>} value={'Soal PG'}/>
                            </Link>
                            <Link to={`/${userId}/bank-soal/daftar-soal/0505/upload-essai`}>
                            <SmButton icon={<FaPlus/>} value={'Soal Essai'}/>
                            </Link>
                            <SmButton icon={<FaTrash/>} value={'Hapus'} type={'danger'}/>
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden w-full font-semibold mt-4">
                        <div className="flex gap-4 px-4 pt-4 h-20 bg-secondary items-start">
                            <p>1</p>
                            <h1>Jika ????2−5????+6=0x2−5x+6=0, maka akar-akarnya adalah...
                            A. 2 dan 3    B. -2 dan -3    C. -1 dan -6    C. 1 dan 6
                            Kunci : A</h1>
                        </div>
                        <div className="flex gap-4 px-4 pt-4 h-20 items-start">
                        </div>
                        <div className="flex gap-4 px-4 pt-4 h-20 bg-secondary items-start">
                        </div>
                    </div>
                </CompleteCard>
            </div>
        </Layout>
        </>
    )
}

export default AdminSoalPage;