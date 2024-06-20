/* eslint-disable react/prop-types */
import { BsFillMegaphoneFill } from "react-icons/bs"
import InformationCard from "../fragments/InformationCard"
import Heading from "./Heading";
import CardLayout from "./CardLayout";
import JadwalUjianLayout from "./JadwalUjianLayout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DateFormat } from "../../utils/DateFormat";
import { Loader } from "../elements/Loader";
import { AiFillMail } from "react-icons/ai";
import StudentContext from "../../context/StudentContext";
import { FaExclamationCircle } from "react-icons/fa";

const DashboardLayout = ({userId}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(StudentContext)
    

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('http://localhost:5000/announcements')
                setData(response.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [])


    return (
        <>
            <div className="flex w-full h-max">
                <CardLayout width={userId == "guru" ? 'w-[70%]' : 'w-full'}>
                    <Heading title={"PENGUMUMAN"}>
                    <BsFillMegaphoneFill/>
                    </Heading>

                <div className="py-5 flex h-full gap-8 px-10">
                    <div className="h-full relative">
                        <div className="h-64 bg-neutral-400 w-2 rounded-full"></div>
                        <div className="w-8 h-8 rounded-full absolute top-0 -left-[12px] flex justify-center items-center bg-btn-sec">
                            <AiFillMail className="text-white"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full h-max relative">
                        {
                        loading ?
                        <div className="flex justify-center py-10 w-full">
                                    <Loader/>
                            </div>
                                :
                                data.map(dt => (
                                    <InformationCard 
                                    key={dt.id}
                                    title={dt.title}
                                    content={dt.content}
                                    uploadAt={DateFormat(dt.createdAt)}
                                    />
                                    ))
                                    }
                    </div>
                </div>
                </CardLayout>
            {
                userId == 'guru' ?
                <JadwalUjianLayout width={'w-[40%]'}/>
                :
                ""
            }
            </div>
        </>
    )
}

export default DashboardLayout;