import { FaCopy, FaFileContract, FaPlus } from "react-icons/fa";
import DateComponent from "../components/elements/Date";
import Time from "../components/elements/Time";
import Layout from "../components/layouts/Layout";
import RoundInput from "../components/elements/RoundInput";
import CompleteCard from "../components/layouts/CompleteCard";
import TableHead from "../components/elements/TableHead";
import SmButton from "../components/elements/SmButton";
import { IoRefreshCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import BlueModal from "../components/fragments/BlueModal";
import CheckBox from "../components/elements/CheckBox";
import axios from "axios";

const MenuUjian = () => {
    const [data, setData] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [displayToken, setDisplayToken] = useState('')
    const [isCopied, setIsCopied] = useState(false); 
    const [isRandomQuest, setIsRandomQuest] = useState(false)
    const [isRandomOpt, setIsRandomOpt] = useState(false)
    const [isShowRes, setIsShowRes] = useState(false)
    const [isResetLogin, setIsResetLogin] = useState(false)
    const [newData, setNewData] = useState({
        exam_code: 0,
        exam_token: "",
        exam_type: "",
        exam_session: "",
        exam_duration: "",
        is_random_question: false,
        is_random_option: false,
        is_show_result: false,
        is_reset_login: false,
    })

    // useEffect(() => {
    //     console.log(newData)
    // }, [newData])

    useEffect(() => {
        if(isCopied){
            if(displayToken)
            alert('Token berhasil di salin')
        }
    }, [isCopied])

    useEffect(() => {
        setNewData(
            {...newData, 
                is_random_question: isRandomQuest,
                is_random_option: isRandomOpt,
                is_show_result: isShowRes,
                is_reset_login: isResetLogin
            })
    }, [isRandomQuest, isRandomOpt, isShowRes, isResetLogin])
    

    useEffect(() => {
        const fetchData = async() => {
            try {
                if(newData.exam_code){
                    const res = await axios.get(`http://localhost:5000/exams/${newData.exam_code}`)
                    console.log(res)
                    if(res.data.exam_code == newData.exam_code){
                        setDisplayToken(res.data.exam_token)
                    }
                    return
                }
                setDisplayToken(0)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [newData])

    const handleUpload = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:5000/exam/${newData.exam_code}/config`, newData)
            console.log(res)
            alert(res.data.msg)
        } catch (error) {
            console.log(error.response)
            alert(error.response.data.msg)
        }
    }

    const generateToken = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.patch(`http://localhost:5000/exam/${newData.exam_code}/generate-token`)
            console.log(res)
            setDisplayToken(res.data.token)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    function handleCopy(){
        if(displayToken == 0){
            return alert('Token tidak tersedia')
        }
        navigator.clipboard.writeText(displayToken) 
        setIsCopied(true)
    }

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="w-full justify-end gap-2 flex py-4">
                    <DateComponent/>
                    <Time/>
                </div>

                <div className="bg-primary w-full shadow-soft rounded-xl mb-4 overflow-hidden">
                    <div className="py-4 px-4 text-btn-sec text-lg font-semibold flex gap-2 items-center border-b-2">
                        <FaFileContract/>
                        <h1>Menu Ujian</h1>
                    </div>

                    <div className="px-4 py-4">
                        
                        <div className="flex px-20 justify-between mt-4 ">
                            <form action="" className="px-6 flex flex-col gap-2 max-w-[600px] ">
                                <RoundInput title={'Kode Bank Soal'} onChange={(e) => setNewData({...newData, exam_code: e.target.value})}/>
                                <RoundInput title={'Jenis Ujian'} onChange={(e) => setNewData({...newData, exam_type: e.target.value})}/>
                                <div className="flex gap-2 pr-6">
                                    <RoundInput title={'Sesi'} width={'w-1/3'} onChange={(e) => setNewData({...newData, exam_session: e.target.value})}/>
                                    <RoundInput title={'Lama Ujian'} placeholder={'Menit'} width={'w-1/3'} onChange={(e) => setNewData({...newData, exam_duration: e.target.value})}/>
                                    <RoundInput title={'Pelanggaran'} placeholder={'Detik'} width={'w-1/3'}/>
                                </div>
                                <div className="flex justify-between mt-4 font-bold">
                                    <CheckBox onClick={() => setIsRandomQuest(!isRandomQuest)} htmlFor={'soal'} name={'soal'} label={'Acak Soal'}/>
                                    <CheckBox onClick={() => setIsRandomOpt(!isRandomOpt)} htmlFor={'opsi'} name={'opsi'} label={'Acak Opsi'}/>
                                    <CheckBox onClick={() => setIsShowRes(!isShowRes)} htmlFor={'hasil'} name={'hasil'} label={'Tampilkan Hasil'}/>
                                    <CheckBox onClick={() => setIsResetLogin(!isResetLogin)} htmlFor={'reset'} name={'reset'} label={'Reset Login'}/>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button onClick={handleUpload} className="px-8 py-2 bg-btn text-white flex items-center gap-2 text-sm rounded-lg">
                                        <FaPlus/>
                                        Tambah Jadwal
                                    </button>
                                </div>
                            </form>
                                <div className="w-96">
                                    <div className="bg-btn-young rounded-2xl shadow-soft flex justify-between px-4 items-center h-32 w-96">
                                        <div className="h-full flex flex-col justify-between text-white py-4 ">
                                            <h1 className="font-bold text-4xl">{displayToken ? displayToken.substring(0,7)+'...' : 'No Token'}</h1>
                                            <button 
                                            onClick={handleCopy}
                                            className="text-white flex items-center gap-2"
                                            >
                                                <FaCopy/>
                                                Salin Token
                                            </button>
                                        </div>
                                        <div className="w-20">
                                            <img src="/img/token.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="font-bold mt-2">
                                        <h1>Token akan refresh setiap 15 menit</h1>
                                        <button onClick={generateToken} className="text-btn cursor-pointer">{displayToken == 0 ? 'Generate Token' : 'Refresh sekarang'}</button>
                                        
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                <CompleteCard isAddEntries={true} isSearch={true}>
                    <table className="w-full rounded-lg  overflow-hidden">
                        <TableHead>
                            <th>#</th>
                            <th>NIS</th>
                            <th>Name</th>
                            <th>Kelas</th>
                            <th>Mapel</th>
                            <th>Lama Ujian</th>
                            <th>Jawaban</th>
                            <th>Nilai</th>
                            <th>Status</th>
                            <th></th>
                        </TableHead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>2401001</td>
                            <td>Test Siswa 1</td>
                            <td>12</td>
                            <td>Matematika</td>
                            <td>48 Menit</td>
                            <td className="flex justify-center gap-2">
                                <SmButton value={'4'} type={'done'}/>
                                <SmButton value={'3'} type={'danger'}/>
                            </td>
                            <td>12 Point</td>
                            <td>Online</td>
                            <td><IoRefreshCircle className="text-btn-young text-2xl"/></td>
                            </tr>
                        </tbody>
                    </table>
                </CompleteCard>
            </div>
        </Layout>
        <BlueModal
        showModal={showModal}
        icon={<FaFileContract/>}
        title={'Menu Ujian'}
        >
        </BlueModal>
        </>
    )
}

export default MenuUjian;