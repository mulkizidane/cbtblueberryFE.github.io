import { FaHistory, FaTrash } from "react-icons/fa";
import AdminCard from "../fragments/AdminCard";
import AdminExamCard from "../fragments/AdminExamCard";
import InformationCard from "../fragments/InformationCard";
import Time from "../elements/Time";
import DateComponent from "../elements/Date";

const AdminDashboardLayout = () => {
    return (
        <>
        <div className="pt-24 px-5 flex flex-col w-full">
            <div className="flex w-full gap-2 pt-2 pb-6 justify-end">
                <DateComponent/>
                <Time/>
            </div>

            <div className="flex gap-4 w-full justify-between">
                    <div className="flex flex-wrap gap-y-2 w-[75%] justify-between">
                        <AdminCard/>
                        <AdminCard/>
                        <AdminCard/>
                        <AdminCard/>
                        <AdminCard/>
                        <AdminCard/>
                    </div>
                    <div className="w-[25%]">
                        <div className="bg-primary rounded-lg shadow-soft">
                            <div className="py-2 px-4 font-bold text-btn-sec">
                                <h1>Jadwal Ujian</h1>
                            </div>
                            <div className="w-full h-max border-t-2 py-4 px-4 overflow-hidden mb-2 shadow-soft">
                                <div className="overflow-y-scroll no-scrollbar flex flex-col h-max gap-3">
                                    <AdminExamCard
                                    // onClick={() => setShowModal(true)}
                                    name={'Matematika'}
                                    exam={"PTS"}
                                    grade={'12'}
                                    total={'30'}
                                    minute={'50'}
                                    kkm={'70'}
                                    start={'22-05-2024 02:00'}
                                    finish={'22-05-2024 03:00'}
                                    />
                                    <AdminExamCard
                                    // onClick={() => setShowModal(true)}
                                    name={'Matematika'}
                                    exam={"PTS"}
                                    grade={'12'}
                                    total={'30'}
                                    minute={'50'}
                                    kkm={'70'}
                                    start={'22-05-2024 02:00'}
                                    finish={'22-05-2024 03:00'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="flex gap-2 mt-6">
                <div className="bg-primary rounded-lg shadow-soft w-full">
                    <InformationCard/>
                </div>
                <div className="bg-primary rounded-lg shadow-soft w-[400px]">
                    <div className="px-4 py-2 border-b-2 flex justify-between items-center border-neutral-400">
                        <div className="flex items-center gap-2 font-bold">
                            <FaHistory/>
                            <h1>Log Aktivitas</h1>
                        </div>
                        <FaTrash/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminDashboardLayout;