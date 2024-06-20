/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DateFormatName from "../../utils/DateFormatName";
import axios from "axios";

const ExamModalLayout = ({showModal, user, examData}) => {
    const [selectedDt, setSelectedDt] = useState(null)
    const [tokenVal, setTokenVal] = useState('')
    const totalQustions = selectedDt?.total_multiple_choices + selectedDt?.total_essay
    const data = [
        { label: 'Nama Peserta Ujian', value: user?.data.name },
        { label: 'Pengawas Ruangan', value: 'Guru' },
        { label: 'Mata Pelajaran', value: selectedDt?.subject },
        { label: 'Jumlah Soal', value: `${totalQustions} Soal (${selectedDt?.total_multiple_choices} PG, ${selectedDt?.total_essay} ESAY)` },
        { label: 'Waktu Ujian', value: selectedDt?.exam_duration },
        { label: 'Tanggal Pelaksanaan', value: DateFormatName(selectedDt?.start_exam) },
    ];

    useEffect(() => {
        if(showModal){
            const selectedData = examData?.find(dt => dt.exam_code == showModal)
            setSelectedDt(selectedData)
        }
    }, [showModal])
    
    const handleSubmitToken = async() => {
        try {
            const verifyToken = await axios.get(`http://localhost:5000/exams/class/${user?.data.class}/${tokenVal}`)
            alert(verifyToken.data.msg)
            localStorage.setItem('examToken', JSON.stringify(tokenVal))
            window.location.href = `/siswa/ujian/${selectedDt?.exam_code}`
        } catch (error) {
            console.log(error)
            alert(error.response.data.msg)
        }
    }

    return (
        <>
        <div className={`fixed z-50 backdrop-blur-[2px] ${showModal ? "flex" : "hidden"} justify-center items-center bg-neutral-100 bg-opacity-15 inset-0 w-full h-dvh`}>
            <div className="rounded-lg shadow-multiple px-6 py-6 bg-primary w-max border-btn">
                <div className="w-[700px] border-b-2 pb-6 border-btn">
                    <h1 className="text-lg font-bold">Simulasi Ujian Berbasis CBT</h1>
                    <div className="w-full bg-btn-sec text-white px-4 py-4 mt-2">
                        <h1 className="font-semibold">Peraturan Ujian !</h1>
                        <p className="text-sm text-neutral-200">Kerjakan ujian sesuai waktu yang di tentukan, dilarang keluar atau berpindah dari tab ujian, jika siswa keluar ataupun berpindah dari tab ujian akan dianggap melakukan pelanggaran, maka ujian akan di hentikan dan di anggap selesai</p>
                    </div>
                </div>
                <div className="pt-4">
                    <h1 className="text-lg font-bold">Konfirmasi Data</h1>
                    <div className="flex flex-col gap-1 mt-2">
                        <table>
                            <tbody>
                            {data.map((item, index) => (
                            <tr key={index}>
                                <td className="pr-4 font-medium">{item.label}</td>
                                <td className="font-light">:</td>
                                <td className="pl-4">{item.value}</td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="justify-end flex gap-2 font-medium mt-16">
                        <input onChange={(e) => setTokenVal(e.target.value)} type="text" className="border-2 px-6 py-1 border-neutral-400 bg-transparent" placeholder="MASUKKAN TOKEN"/>
                        <button onClick={handleSubmitToken} className="border-2 px-6 py-1 bg-btn-sec text-white">
                            MULAI
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ExamModalLayout;