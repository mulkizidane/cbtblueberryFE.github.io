import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../elements/Loader";
import axios from "axios";

/* eslint-disable react/prop-types */
const TextArea = ({rows, onChange, type, dataSoalId, number}) => {
    const { userId, soalNo, soalId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [defVal, setDefVal] = useState("")

    // Dibawah ini untuk bagian admin dan guru
    useEffect(() => {
        if(data?.length == 0){
                setDefVal("")
                setLoading(false)
        } else {
            const sameData = data?.find(dt => dt.no_question == soalNo)
            if (sameData) {
                setDefVal(sameData.question);
            } else {
                setDefVal("");
            }
        }
    }, [soalNo, data] )

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/exam/${soalId}/question/${soalNo}`)
                setData(response.data.data)
                setLoading(false)

            } catch (error) {
                setLoading(false)
                console.log(error)
                alert(error.response.data.msg)
            }
        }
        fetchData()
    }, [soalNo, defVal])
    // Diatas ini untuk  bagian admin dan guru

    const userAnswers = JSON.parse(localStorage.getItem('user_answer'));
    useEffect(() => {
        setLoading(true)
        setDefVal("")
        const currentAnswer = userAnswers?.find(ans => ans.questionId == dataSoalId);

        if (currentAnswer) {
            setLoading(false)
            setDefVal(currentAnswer.answer);
        } else {
            setLoading(false)
            setDefVal("");
        }
    }, [dataSoalId, number, userAnswers, defVal]);

    return (
<div className="max-w-2xl border-2 border-neutral-500">
	<form>
    <div className="w-full bg-gray-50 border border-gray-200 dark:bg-gray-100">
        <div className="py-2 px-4 bg-white dark:bg-gray-300">
            <label htmlFor="editor" className="sr-only">Publish post</label>
            {
                loading ?
                <Loader/>
                :
                userId == 'siswa' ?
                <textarea id="editor" defaultValue={defVal == ""? "" :defVal } onChange={onChange} rows={rows ? rows : '8'} className="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-300 focus:ring-0 dark:text-black dark:placeholder-gray-400" placeholder="Write your answer..." required></textarea>
                :
                <textarea id="editor" defaultValue={type == 'question' ? defVal : ''} onChange={onChange} rows={rows ? rows : '8'} className="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-300 focus:ring-0 dark:text-black dark:placeholder-gray-400" placeholder="Write your answer..." required></textarea>
            }
        </div>
    </div>
    </form>

    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
</div>
    )
}

export default TextArea;