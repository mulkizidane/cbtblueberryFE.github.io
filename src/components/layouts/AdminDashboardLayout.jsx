import { FaHistory, FaTrash } from "react-icons/fa";
import AdminCard from "../fragments/AdminCard";
import AdminExamCard from "../fragments/AdminExamCard";
import InformationCard from "../fragments/InformationCard";
import Time from "../elements/Time";
import DateComponent from "../elements/Date";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../elements/Loader";
import { DateFormat } from "../../utils/DateFormat";
import { AiFillMail } from "react-icons/ai";
import { useFetchData } from "../../services/fetchData";

const AdminDashboardLayout = () => {
    const [data, setData] = useState(null);
    const [dataSiswa, setDataSiswa] = useState(null)
    const [dataNilai, setDataNilai] = useState(null)
    const [dataGuru, setDataGuru] = useState(null)
    const [dataExamType, setDataExamType] = useState(null)
    const [dataExam, setDataExam] = useState(null)
    const [loading, setLoading] = useState(true);
    const [examData, setExamData] = useState(null)
    
    useFetchData('http://localhost:5000/all-exams', setExamData, setLoading);
    useFetchData('http://localhost:5000/announcements', setData, setLoading);
    useFetchData('http://localhost:5000/students', setDataSiswa, setLoading);
    useFetchData('http://localhost:5000/exam-type', setDataExamType, setLoading);
    useFetchData('http://localhost:5000/exams', setDataExam, setLoading);
    useFetchData('http://localhost:5000/teachers', setDataGuru, setLoading);


    return (
        <>
        <div className="pt-24 px-5 flex flex-col w-full h-max bg-secondary">
            <div className="flex w-full gap-2 pt-2 pb-6 justify-end">
                <DateComponent/>
                <Time/>
            </div>

            <div className="flex gap-4 w-full justify-between">
                    <div className="flex flex-wrap gap-y-2 w-[75%] justify-between">
                        <AdminCard 
                        title={'Data Peserta'}
                        total={dataSiswa?.data_length}
                        link={'/admin/manage-user/siswa'}
                        />
                        <AdminCard 
                        title={'Data Jenis Ujian'}
                        total={dataExamType?.data_length}
                        link={'/admin/bank-soal/jenis-ujian'}
                        />
                        <AdminCard 
                        title={'Data Ujian'}
                        total={dataExam?.data.length}
                        link={'/admin/menu-ujian'}
                        />
                        <AdminCard 
                        title={'Data Nilai'}
                        total={'1'}
                        link={'/admin/hasil-nilai'}
                        />
                        <AdminCard 
                        title={'Data Guru'}
                        total={dataGuru?.data_length}
                        link={'/admin/data-master/mata-pelajaran'}
                        />
                        <AdminCard 
                        title={'Hapus Data'}
                        total={'1'}
                        link={'/admin/menu-ujian'}
                        />
                    </div>
                    <div className="w-[25%]">
                        <div className="bg-primary rounded-lg shadow-soft">
                            <div className="py-2 px-4 font-bold text-btn-sec">
                                <h1>Jadwal Ujian</h1>
                            </div>
                            <div className="w-full h-max border-t-2 py-4 px-4 overflow-hidden mb-2 shadow-soft">
                                <div className="overflow-y-scroll no-scrollbar flex flex-col h-max gap-3">
                                    {
                                        examData?.data.map(dt => (
                                            <AdminExamCard
                                            // onClick={() => setShowModal(true)}
                                            key={dt.exam_code}
                                            name={dt.subject}
                                            exam={dt.exam_type}
                                            grade={dt.class}
                                            total={dt.total_essay + dt.total_multiple_choices}
                                            minute={dt.exam_duration}
                                            kkm={dt.passing_score}
                                            start={DateFormat(dt.start_exam)}
                                            finish={DateFormat(dt.end_exam)}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="flex gap-2 mt-6">
                <div className="bg-primary rounded-lg shadow-soft w-[70%]">
                <div className="py-5 flex h-full gap-8 px-10">
                    <div className="h-full relative ">
                        <div className="h-full bg-neutral-400 w-1 rounded-full"></div>
                        <div className="w-8 h-8 rounded-full absolute top-0 -left-[14px] flex justify-center items-center bg-btn-sec">
                            <AiFillMail className="text-white"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full relative">
                        {
                        loading ?
                            <div className="flex justify-center py-10 w-full">
                                    <Loader/>
                            </div>
                                :
                            data?.data?.map(dt => (
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
                </div>
                <div className="bg-primary rounded-lg shadow-soft w-[30%] h-max">
                    <div className="px-4 py-2 border-b-2 flex justify-between items-center border-neutral-400">
                        <div className="flex items-center gap-2 font-bold">
                            <FaHistory/>
                            <h1>Log Aktivitas</h1>
                        </div>
                        <FaTrash/>
                    </div>
                    <div className="h-44">

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminDashboardLayout;