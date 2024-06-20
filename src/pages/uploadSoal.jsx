import { useParams } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import UploadCard from "../components/layouts/UploadCard";
import ChoicesCard from "../components/fragments/ChoicesCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/elements/Loader";
import ReturnHead from "../components/fragments/ReturnHead";

const UploadSoal = () => {
    const {userId, soalId, uploadId, soalNo} = useParams()
    const [data, setData] = useState(null)

    const [image, setImage] = useState('')
    const [isChosen, setIsChosen] = useState('')
    const [loading, setLoading] = useState(true)
    const [correctAnswer, setCorrectAnswer] = useState("")
    const totalQuestions = data?.total_multiple_choices + data?.total_essay
    const [newChoice, setNewChoice] = useState([
        {option: '', text: '', questionId: soalId},
        {option: '', text: '', questionId: soalId},
        {option: '', text: '', questionId: soalId},
        {option: '', text: '', questionId: soalId}
    ])
    const [newQuestion, setNewQuestion] = useState({
        no_question: '',
        question_type: uploadId == "upload-pg" ? "multiple-choice" : "ESSAY",
        question: "",
        correct_answer: "",
        examId: soalId,
        image: ""
    })
    
    const choices = [
        {"name": "A"},
        {"name": "B"},
        {"name": "C"},
        {"name": "D"},
    ]

    useEffect(() => {
        setNewQuestion({...newQuestion, no_question: soalNo, correct_answer: correctAnswer, image: image})
    }, [soalNo, correctAnswer, image])


    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/exams/${soalId}`)
                setData(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                alert(error.response.data.msg)
            }
        }
        fetchData()
    }, [soalId])

    const handleNewChoice = (index, chName, event) => {
        const updatedChoices = newChoice.map((choice, i) => {
            if (i === index) {
                return {
                    ...choice,
                    option: chName,
                    text: event.target.value
                };
            }
            return choice;
        });
        setNewChoice(updatedChoices);
    }

    const handleUploadQuestion = async() => {
        try {
            const formData = new FormData();
            formData.append('questions', JSON.stringify(newQuestion));
            formData.append('choices', JSON.stringify(newChoice));
            if (image) {
                formData.append('image', image);
            }

            await axios.post(`http://localhost:5000/exam/${soalId}/question/${soalNo}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("success")
            window.location.reload();
            if(soalNo >= totalQuestions){
                alert('Anda sudah membuat semua soal')
                window.location.href = `/${userId}/bank-soal/daftar-soal/${soalId}/`
                return
            }
            window.location.href = `/${userId}/bank-soal/daftar-soal/${soalId}/${uploadId}/${Number(soalNo)+1}`
        } catch (error) {
            console.log(error)
            alert(error.response.data.msg)
        }
    }

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <ReturnHead
                value={'Kembali ke daftar soal'}
                to={`/${userId}/bank-soal/daftar-soal/${soalId}/`}
                />
                {
                    loading ?
                    <div className="flex justify-center">
                        <Loader/>
                    </div>
                    :
                    <div className="flex gap-2">
                        <UploadCard 
                        length={totalQuestions}
                        curNo={soalNo}
                        soalId={soalId}
                        userId={userId}
                        uploadId={uploadId}
                        onClick={handleUploadQuestion}
                        onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                        setCorrectAnswer={setCorrectAnswer}
                        uploadImg={(e) => setImage(e.target.files[0])}
                        />
                        <div className={`${uploadId == 'upload-pg' ? 'flex' : 'hidden'} flex-col w-[40%] gap-2`}>
                            {
                                choices.map((ch, i) => (
                                    <ChoicesCard 
                                    key={i}
                                    choice={ch.name}
                                    onClick={() => setIsChosen(ch.name)}
                                    isChosen={isChosen}
                                    correctAnswer={correctAnswer}
                                    setCorrectAnswer={setCorrectAnswer}
                                    onChange={(e) => handleNewChoice(i, ch.name, e)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </Layout>
        </>
    )
}

export default UploadSoal;