import { FaCalendar } from "react-icons/fa";
import ExamCard from "../fragments/ExamCard";
import ExamModalLayout from "./ExamModalLayout";
import { useState } from "react";
import Heading from "./Heading";
import CardLayout from "./CardLayout"

const JadwalUjianLayout = ({width}) => {
    const [showModal, setShowModal] = useState(false);

    return (
            <CardLayout width={width}>
                <Heading title={"Jadwal Ujian"}>
                    <FaCalendar/>
                </Heading>
                <div className="flex gap-2 px-6 py-6">
                    <ExamCard
                    onClick={() => setShowModal(true)}
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
            <ExamModalLayout showModal={showModal}/>
            </CardLayout>
    )
}

export default JadwalUjianLayout;