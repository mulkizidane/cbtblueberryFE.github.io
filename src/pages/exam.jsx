import { useEffect, useState } from "react";
import ExamNum from "../components/elements/ExamNum";
import LgButton from "../components/fragments/LgButton";
import Layout from "../components/layouts/Layout";
import ExamData from "../data/ExamData";
import QuestionCard from "../components/fragments/QuestionCard";
import Alert from "../components/fragments/Alert";

const ExamPage = () => {
    const [data, setData] = useState(ExamData)
    const [number, setNumber] = useState(1)
    const [doubtStatus, setDoubtStatus] = useState(Array(ExamData.soal.length).fill(false));    
    const [doneStatus, setDoneStatus] = useState(Array(ExamData.soal.length -1).fill(false));   
    const [showAlert, setShowAlert] = useState(false) 
    const [msg, setMsg] = useState(
        {
            title: "",
            subTitle: "",
            btn: ""
        })

    useEffect(() => {
        const isDone = doneStatus.filter(done => done !== true)
        if(!isDone.length > 0){
            const title = "PEMBERITAHUAN"
            const subTitle = "WAKTU DIPERBOLEHKAN UNTUK MENYELESAIKAN JIKA SUDAH 10 MENIT, SILAKAN PERIKSA LAGI."
            const btn = "KEMBALI"
            setMsg({title, subTitle, btn})
            return setShowAlert(true)
        }
    }, [doneStatus])

    useEffect(() => {
        const timeout = setTimeout(() =>{
            setShowAlert(true)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [])

    function handleExamNum(num){
        setNumber(num)
    }

    function handleNext(e){
        const target = e.target.innerText
        if(target == "SELESAI"){
            const isDone = doneStatus.filter(done => done !== true)
            console.log(isDone)
            if(isDone.length > 0){
                const title = "PEMBERITAHUAN"
                const subTitle = "SILAKAN ISI JAWABAN YANG BELUM DI ISI SEBELUM MENYELESAIKAN UJIAN"
                const btn = "KEMBALI"
                setMsg({title, subTitle, btn})
                return setShowAlert(true)
            }
            console.log("Ujian Selesai")
        }

        if(number < data.soal.length){
            const newDoneStatus = [...doneStatus];
            newDoneStatus[number - 1] = true;
            setDoneStatus(newDoneStatus);
            setNumber(number + 1)
            return 
        }
        setNumber(1)
    }

    function handleDoubt() {
        const newDoubtStatus = [...doubtStatus];
        newDoubtStatus[number - 1] = true;
        setDoubtStatus(newDoubtStatus);
    }

    function handlePrev(){
        if(number > 1){
            setNumber(number - 1)
            return 
        }
        setNumber(data.soal.length)
    }
    
    return (
        <>
        <Layout>
            <div className="flex gap-2 pt-24 px-5">
                <div className="flex flex-col">
                    <QuestionCard
                    duration={data.duration}
                    soal={data.soal[number - 1]}
                    />
                    <div className="flex justify-between items-center mt-4">
                        <LgButton onClick={handlePrev} value={'SOAL SEBELUMNYA'}/>
                        <LgButton onClick={handleDoubt} value={'RAGU RAGU'} bg={'bg-btn-ter'}/>
                        <LgButton onClick={handleNext} value={number ==  data.soal.length ? 'SELESAI' : 'SOAL SELANJUTNYA'}/>
                    </div>
                </div>

                <div className="bg-primary shadow-soft w-72 h-max">
                    <div className="w-full border-b-2 border-neutral-400 py-2 px-4 font-bold text-lg">
                        <h1>NOMOR SOAL</h1>
                    </div>
                    <div className="px-8 pb-10 pt-6 flex gap-3 flex-wrap mx-auto">
                        {
                            data.soal.map((dt, index) => (
                                <ExamNum 
                                key={index} 
                                index={index} 
                                onClick={() => handleExamNum(dt.nomor)}  
                                bgClass={doubtStatus[index] ? 'bg-yellow-500' : doneStatus[index] ? 'bg-btn' : number === dt.nomor ? 'bg-blue-500' : 'bg-gray-400'}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
        <Alert 
        showAlert={showAlert} 
        setShowAlert={setShowAlert}
        msg={msg}
        />
        </>
    )
}

export default ExamPage;