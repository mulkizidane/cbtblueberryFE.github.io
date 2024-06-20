import { TbSettingsFilled } from "react-icons/tb"
import DateComponent from "../components/elements/Date"
import Time from "../components/elements/Time"
import Layout from "../components/layouts/Layout"
import { FaChevronDown } from "react-icons/fa"
import { useContext, useState } from "react"
import InputFile from "../components/elements/InputFile"
import { useParams } from "react-router-dom"
import RoundInput from "../components/elements/RoundInput"
import axios from "axios"
import StudentContext from "../context/StudentContext"

const PengaturanPage = () => {
    const {userId} = useParams()
    const {user} = useContext(StudentContext)
    const [showTab, setShowTab] = useState(false)
    const [newData, setNewData] = useState({
        nip: 0,
        teacher_name: '',
        username: '',
        password: ''
    })

    async function handleUploadData(){
        try {
            const res = await axios.patch(`http://localhost:5000/teachers/${user?.data.nip}`, newData)
            console.log(res)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 pb-10 w-full">
                <div className="w-full flex justify-end gap-2 py-4">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="bg-primary rounded-xl shadow-multiple">
                    <div className="border-b-2 px-4 py-4 flex gap-4 items-center text-lg font-bold text-btn-sec">
                        <TbSettingsFilled/>
                        <h1>Pengaturan</h1>
                    </div>
                        {
                            userId == 'guru' ?
                            <div className="w-full py-4 px-4">
                                <div className="flex gap-4">
                                    <div className="bg-extra flex justify-center w-96 h-52 rounded-lg  items-center">
                                        <img src="/img/profile.png" className="w-20"/>
                                    </div>
                                    <div className="flex flex-col gap-4 w-[50%]">
                                        <RoundInput onChange={(e) => setNewData({...newData, teacher_name: e.target.value})} title={'Nama Lengkap'} isRow={true} width={'w-full'}/>
                                        <RoundInput onChange={(e) => setNewData({...newData, nip: e.target.value})} title={'NIP'} isRow={true} width={'w-full'}/>
                                        <RoundInput onChange={(e) => setNewData({...newData, username: e.target.value})} title={'Username'} isRow={true} width={'w-full'}/>
                                        <RoundInput onChange={(e) => setNewData({...newData, password: e.target.value})} title={'Password'} type={'password'} isRow={true} width={'w-full'}/>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleUploadData} className="font-bold text-white bg-btn px-6 text-sm py-1 rounded-lg">SIMPAN</button>
                                </div>
                            </div>
                            :
                        <div className="w-full h-max">
                            <div className="border-b-2 flex">
                                <button onClick={() => setShowTab(false)} className={`bg-secondary py-1 text-black font-bold px-4 shadow-multiple transition-all duration-150 ${showTab ? 'shadow-inner brightness-95' : 'scale-105'}`}>Hapus Data</button>
                                <button onClick={() => setShowTab(true)} className={`bg-secondary py-1 text-black font-bold px-4 transition-all duration-150 ${!showTab ? 'shadow-inner brightness-95' : 'scale-105'}`}>Back up & Restore</button>
                            </div>
                            <div className="mt-4 pb-4 px-4">
                                {
                                    showTab ? 
                                    <div className="flex flex-col gap-2">
                                    <div className="w-full bg-secondary rounded-xl px-4 py-4">
                                        <h1 className="font-bold text-lg">Import File</h1>
                                        <p className="text-sm font-semibold mb-6">Sebelum meng-import pastikan file yang akan anda import sudah dalam bentuk Ms. Excel 97-2003 Workbook (.xls) dan format penulisan harus sesuai dengan yang telah ditentukan.</p>
                                        <InputFile bg={'bg-primary'}/>
                                        <div className="w-full  flex justify-end">
                                            <button className="px-4 py-1 bg-btn rounded-lg text-white mt-4">Simpan</button>
                                        </div>
                                    </div>

                                    <div className="w-full bg-secondary rounded-xl px-4 py-4">
                                        <h1 className="font-bold text-lg">Export File</h1>
                                        <p className="text-sm font-semibold mb-6">Sebelum meng-import pastikan file yang akan anda import sudah dalam bentuk Ms. Excel 97-2003 Workbook (.xls) dan format penulisan harus sesuai dengan yang telah ditentukan.</p>
                                        <InputFile bg={'bg-primary'}/>
                                        <div className="w-full  flex justify-end">
                                            <button className="px-4 py-1 bg-btn rounded-lg text-white mt-4">Simpan</button>
                                        </div>
                                    </div>

                                    </div>
                                    :
                                    <div className="rounded-lg overflow-hidden shadow-multiple bg-secondary w-96 h-48 ">
                                        <div className="text-neutral-300 flex font-bold">
                                            <button className="w-1/3 bg-btn py-2 text-white">
                                                Data Master
                                            </button>
                                            <button className="w-1/3 bg-btn py-2 ">
                                                Data Hasil Nilai
                                            </button>
                                            <button className="w-1/3 bg-btn py-2 ">
                                                Data Ujian
                                            </button>
                                        </div>
                                        <div className="py-4 px-4 h-[80%] w-full flex flex-col justify-between">
                                            <div className="px-2 py-1 flex gap-2 bg-primary w-56 items-center justify-between">
                                                <input type="text" placeholder="Data Mata Pelajaran" className="py-0.5 w-[80%] bg-transparent border-none outline-none placeholder:text-secondary placeholder:font-bold"/>
                                                <FaChevronDown/>
                                            </div>
                                            <div className="w-full flex justify-end">
                                                <button className="bg-red-600 text-white px-4 py-1">Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        }
                </div>
            </div>
        </Layout>
        </>
    )
}

export default PengaturanPage;