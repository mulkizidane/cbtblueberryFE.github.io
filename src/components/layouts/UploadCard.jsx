/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import InputFile from "../elements/InputFile"
import LgButton from "../fragments/LgButton"
import TextArea from "../fragments/TextArea"
import { useEffect, useState } from "react"
import axios from "axios"
import { Loader } from "../elements/Loader"

const UploadCard = ({length, curNo, userId, soalId, uploadId, onClick, onChange, setCorrectAnswer, uploadImg}) => {
    const [data, setData] = useState([])
    const [allQuestions, setAllQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(null);
    const sameNo = data?.find(dt => dt.no_question == curNo)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/exam/${soalId}/questions`)
                setAllQuestions(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [soalId])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/exam/${soalId}/question/${curNo}`)
                setData(response.data.data)
                const sameNo = response.data.data.find(dt => dt.no_question == curNo)
                if(sameNo){
                    if (sameNo.image) {
                        const blob = new Blob([new Uint8Array(sameNo.image.data)], { type: 'image/jpeg' });
                        const url = URL.createObjectURL(blob);
                        setImageUrl(url);
                        return;
                    }
                    setImageUrl(null);
                }
            } catch (error) {
                alert(error.response.data.msg)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [data, soalId])

    return (
        <div className={`py-4 px-4 bg-primary w-[70%] shadow-soft rounded-xl`}>
                    <div className="flex flex-wrap gap-1 w-full">
                        {
                            Array.from({length: length}).map((_, index) => 
                                {
                                    const isNumExsist = allQuestions?.some(dt => dt.no_question == index+1)
                                    return (
                                    <Link 
                                    key={index} 
                                    to={`/${userId}/bank-soal/daftar-soal/${soalId}/${uploadId}/${index+1}`}
                                    onClick={() => setLoading(true)}
                                    >
                                        <button className={`${curNo == index + 1 ? "bg-btn" : isNumExsist ? "bg-btn" : "bg-neutral-400"} text-xs text-white px-2 py-0.5`}>
                                            {index + 1}
                                        </button>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    {
                        loading ? 
                        <div className="flex justify-center py-10">
                            <Loader/>
                        </div>
                        :
                        <div>

                        <div className={`mt-4 flex gap-2`}>
                            <div className={`flex flex-col gap-2`}>
                                <label className="font-bold">Pertanyaan :</label>
                                <TextArea 
                                rows={'6'} 
                                type={'question'}
                                onChange={onChange}
                                />
                            </div>
                            <div className={`${uploadId =='upload-pg' ? "hidden" : "flex"} flex-col gap-2`}>
                                <label htmlFor="corAns" className="font-bold">Jawaban Benar</label>
                                <TextArea
                                rows={'6'}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`w-80 h-40 mt-4 ${sameNo?.image == null ? 'hidden' : 'block'} overflow-hidden rounded-lg shadow-multiple`}>
                            <img src={imageUrl} alt="" />
                        </div>
                        <div className="my-4">
                            <InputFile onChange={uploadImg} label={'Gambar'}/>
                        </div>
                        <div className="flex justify-end">
                            <LgButton onClick={onClick} value={'Simpan'}/>
                        </div>
                        </div>
                    }
                </div>
    )
}

export default UploadCard;