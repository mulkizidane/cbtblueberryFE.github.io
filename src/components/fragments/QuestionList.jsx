import axios from "axios"
import { useEffect, useState } from "react"
import SmButton from "../elements/SmButton"
import { FaEdit, FaTrash } from "react-icons/fa"

/* eslint-disable react/prop-types */
const QuestionList = ({no, question, answer, id, soalId}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/exam/${soalId}/questions/${id}/choices`)
                setData(response.data.data)
                setLoading(false) 
            } catch (error) {
                setLoading(false)
                alert(error.response.data.msg)
            }
        }

        fetchData()
    }, [data])


    const handleDelete = async() => {
        try {
            const res = await axios.delete(`http://localhost:5000/exam/${soalId}/question/${no}`)
            alert(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div className="list flex gap-4 px-4 py-4 h-max items-start">
        <p>{no}.</p>
        <div className="w-full">
            <h1>{question}</h1>
            {
                loading ? 
                <h1>Loading...</h1>
                :
                data.map(dt => (
                    <div key={dt.id} className="flex gap-2 ">
                        <p>{dt.option} .</p>
                        <p>{dt.text}</p>
                    </div>
                ))
            }
            <div className="flex items-center w-full justify-between">
                <p>Jawaban Benar : {answer}</p>
                    <SmButton 
                    value={'Hapus'} 
                    type={'danger'}
                    icon={<FaTrash/>}
                    onClick={handleDelete}
                    />
            </div>
        </div>
    </div>
    )
}

export default QuestionList;