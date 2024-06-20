import { useContext, useEffect, useState } from "react";
import ExamNum from "../components/elements/ExamNum";
import LgButton from "../components/fragments/LgButton";
import Layout from "../components/layouts/Layout";
import QuestionCard from "../components/fragments/QuestionCard";
import Alert from "../components/fragments/Alert";
import StudentContext from "../context/StudentContext";
import axios from "axios";

const ExamPage = () => {
    const [data, setData] = useState(null)
    const [questionData, setQuestionData] = useState(null)
    const [loading, setLoading] = useState(true)
    const { user } = useContext(StudentContext)

    const [success, setSuccess] = useState(true)
    const [totalScore, setTotalScore] = useState(0)
    const [number, setNumber] = useState(1)
    const [doubtStatus, setDoubtStatus] = useState();    
    const [doneStatus, setDoneStatus] = useState();   
    const [showAlert, setShowAlert] = useState(false) 
    const examToken = JSON.parse(localStorage.getItem('examToken'))
    const userAnswer = JSON.parse(localStorage.getItem('user_answer'))
    const [msg, setMsg] = useState(
        {
            title: "",
            subTitle: "",
            btn: ""
        })

    const [isTabActive, setIsTabActive] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsTabActive(false);
            } else {
                setIsTabActive(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if(!isTabActive){
            const postExamResults = async () => {
                try {
                    await axios.post(`http://localhost:5000/${user?.data.nis}/exam-results`, {
                        subject: data?.subject,
                        exam_code: data?.exam_code,
                        exam_date: data?.start_exam,
                        exam_duration: data?.exam_duration,
                        total_grade: totalScore,
                        passing_score: data.passing_score,
                        information: totalScore < data.passing_score ? 'Tidak Lulus' : 'Lulus',
                        userId: user?.data.nis
                    });
    
                    await axios.post(`http://localhost:5000/${user?.data.nis}/exam-results/questions`, userAnswer);
                    alert('Selamat anda sudah selesai mengerjakan ujian ini, silahkan cek hasil ujian anda di hasil nilai');
                    window.location.href = '/siswa/dashboard';
                    setTimeout(() => {
                        localStorage.removeItem('user_exam')
                        localStorage.removeItem('exam')
                        localStorage.removeItem('examToken')
                    }, 200)
                } catch (error) {
                    console.log(error);
                }
            };
    
            postExamResults();
            alert('Anda telah keluar dari tab maka ujian dianggap selesai.')
            localStorage.removeItem('user_answer')
            localStorage.removeItem('examToken')
            window.location.href = '/siswa/dashboard'
            return
        }
    }, [isTabActive])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/exams/class/${user?.data.class}/${examToken}`)
                setData(res.data.data[0])
                setQuestionData(shuffleArray(res.data.data[0].Questions))
                setDoubtStatus(Array(res.data.data[0].Questions?.length).fill(false))
                setDoneStatus(Array(res.data.data[0].Questions?.length -1).fill(false))
                const localExam = {
                    subject: res.data.data[0].subject,
                    exam_code: res.data.data[0].exam_code,
                    exam_date: res.data.data[0].start_exam
                }
                localStorage.setItem('exam', JSON.stringify(localExam))
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const isDone = doneStatus?.filter(done => done !== true)
        if(!isDone?.length > 0){
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

    useEffect(() => {
        if (!success) {
            return
        }
        const postExamResults = async () => {
            try {
                await axios.post(`http://localhost:5000/${user?.data.nis}/exam-results`, {
                    subject: data?.subject,
                    exam_code: data?.exam_code,
                    exam_date: data?.start_exam,
                    exam_duration: data?.exam_duration,
                    total_grade: totalScore,
                    passing_score: data.passing_score,
                    information: totalScore < data.passing_score ? 'Tidak Lulus' : 'Lulus',
                    userId: user?.data.nis
                });

                await axios.post(`http://localhost:5000/${user?.data.nis}/exam-results/questions`, userAnswer);
                alert('Selamat anda sudah selesai mengerjakan ujian ini, silahkan cek hasil ujian anda di hasil nilai');
                window.location.href = '/siswa/dashboard';
                setTimeout(() => {
                    localStorage.removeItem('user_exam')
                    localStorage.removeItem('exam')
                    localStorage.removeItem('examToken')
                }, 200)
            } catch (error) {
                console.log(error);
            }
        };

        postExamResults();
    }, [success, totalScore]);


    function calculateScore(correctAnswers, maxScore = 100) {
        const scorePerQuestion = maxScore / data.Questions?.length;
        const totalScores = correctAnswers * scorePerQuestion;
        
        setTotalScore(totalScores);
        setSuccess(true)
    }

    function checkAnswers(answers, data) {
        let correctCount = 0;
        let wrongCount = 0;
        
        const updatedUserAnswers = answers.map(answer => {
            const question = data.find(q => q.id == answer.questionId);
    
            if (question) {
                const validCorrect = question.correct_answer.trim() == answer.answer.trim();
                if (validCorrect) {
                    correctCount++;
                    return { ...answer, result: true };
                }
                wrongCount++;
                return { ...answer, result: false };
            } 
        });
        console.log(updatedUserAnswers)
        localStorage.setItem('user_answer', JSON.stringify(updatedUserAnswers));
        calculateScore(correctCount)
    }

   
    function handleNext(e){
        const target = e.target.innerText
        if(target == "SELESAI"){
            const isDone = doneStatus.filter(done => done !== true)
            if(isDone.length == data.Questions.length){
                const title = "PEMBERITAHUAN"
                const subTitle = "SILAKAN ISI JAWABAN YANG BELUM DI ISI SEBELUM MENYELESAIKAN UJIAN"
                const btn = "KEMBALI"
                setMsg({title, subTitle, btn})
                return setShowAlert(true)
            }
            checkAnswers(userAnswer, data?.Questions)
        }

        if(number < data.Questions.length){
            const newDoneStatus = [...doneStatus];
            newDoneStatus[number - 1] = true;
            setDoneStatus(newDoneStatus);
            setNumber(number + 1)
            return 
        }
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

    function shuffleArray(array) {
        const shuffled = [...array]; // Buat salinan array agar tidak mengubah array asli
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <>
        <Layout>
            <div className="flex gap-2 pt-24 px-5">
                <div className="flex flex-col">
                    <QuestionCard
                    duration={data.exam_duration}
                    soal={data.is_random_question ? questionData : data.Questions}
                    number={number}
                    />
                    <div className="flex justify-between items-center mt-4">
                        <LgButton onClick={handlePrev} value={'SOAL SEBELUMNYA'}/>
                        <LgButton onClick={handleDoubt} value={'RAGU RAGU'} bg={'bg-btn-ter'}/>
                        <LgButton onClick={handleNext} value={number ==  data?.Questions.length ? 'SELESAI' : 'SOAL SELANJUTNYA'}/>
                    </div>
                </div>

                <div className="bg-primary shadow-soft w-72 h-max">
                    <div className="w-full border-b-2 border-neutral-400 py-2 px-4 font-bold text-lg">
                        <h1>NOMOR SOAL</h1>
                    </div>
                    <div className="px-8 pb-10 pt-6 flex gap-3 flex-wrap mx-auto">
                        {
                            
                        data.Questions.map((dt, index) => {
                            return(
                                <ExamNum 
                                key={index} 
                                index={index} 
                                onClick={() => handleExamNum(index+1)}  
                                bgClass={doubtStatus[index] ? 'bg-yellow-500' : doneStatus[index] ? 'bg-btn' : number === index+1 ? 'bg-blue-300' : 'bg-gray-400'}
                                />
                            )
                            })
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