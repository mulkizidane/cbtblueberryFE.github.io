import { BsMegaphoneFill } from "react-icons/bs";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import TextArea from "../components/fragments/TextArea";
import Time from "../components/elements/Time";
import { FaTrash } from "react-icons/fa";
import DateComponent from "../components/elements/Date";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFetchData } from "../services/fetchData";
import { Loader } from "../components/elements/Loader";
import { handleDeleteData } from "../services/subjectServices";

const AnnouncementPage = () => {
    const { userId } = useParams();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const res = await axios.get(`http://localhost:5000/announcements`)
                setData(res.data.data)
                console.log(res.data.data)
            } catch (error){
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [data])
    const handleUpload = async() => {
        try {
            const response = await axios.post(`http://localhost:5000/${userId}/announcement/upload`, {
                title,
                content
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <Layout>
            <div className="flex flex-col pt-24 px-7 w-full">
                <div className="flex gap-2 pt-2 pb-6 justify-end">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="flex gap-4 w-full">
                    <div className="rounded-lg w-[60%] shadow-soft bg-primary px-4 pb-4 h-max">
                        <Heading title={'Pengumuman'}>
                            <BsMegaphoneFill/>
                        </Heading>
                            <div className="py-4 px-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="judul" className="font-bold">Judul Pengumuman</label>
                                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="rounded-full px-4 py-1 bg-transparent border-2"/>
                                </div>
                                <div className="mt-4">
                                    <TextArea onChange={(e) => setContent(e.target.value)}/>
                                </div>
                                <div className="flex w-full justify-end mt-4">
                                    <button onClick={handleUpload} className="bg-btn px-6 rounded-lg py-1 font-bold text-white">simpan</button>
                                </div>
                            </div>
                    </div>
                    <div className="bg-primary w-[40%] rounded-lg shadow-soft px-2 h-max pt-2 pb-6">
                        <div className="w-full flex justify-end py-2">
                            <div>
                                <label htmlFor="search">Search</label>
                                <input type="search" className="rounded-full px-2 py-0.5 ml-2 bg-transparent border-2"/>
                            </div>
                        </div>
                        <table className="w-full rounded-lg shadow-soft overflow-hidden">
                            <thead>
                                <tr className="bg-btn text-white divide-x-2">
                                    <th>#</th>
                                    <th>Pengumuman</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                loading ? 
                                <tr>
                                    <td>
                                    <Loader/>
                                    </td>
                                </tr>
                                : 
                                data?.map((dt, i) => (
                                <tr key={dt.id}>
                                    <td>{i+1}</td>
                                    <td>{dt.title}</td>
                                    <td><FaTrash onClick={() => handleDeleteData(`http://localhost:5000/${userId}/announcements/${dt.id}`)} className="text-red-500"/></td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

export default AnnouncementPage;