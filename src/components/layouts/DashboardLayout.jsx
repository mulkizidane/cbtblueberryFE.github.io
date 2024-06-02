/* eslint-disable react/prop-types */
import { BsFillMegaphoneFill } from "react-icons/bs"
import InformationCard from "../fragments/InformationCard"
import Heading from "./Heading";
import CardLayout from "./CardLayout";
import JadwalUjianLayout from "./JadwalUjianLayout";

const DashboardLayout = ({user}) => {
    return (
        <>
        {
            user == 'guru' ?
            <div className="flex w-full">
                <CardLayout width={'w-[70%]'}>
                    <Heading title={"PENGUMUMAN"}>
                    <BsFillMegaphoneFill/>
                    </Heading>
                    <InformationCard/>
                </CardLayout>
                <JadwalUjianLayout width={'w-[40%]'}/>
            </div>
            :
            <CardLayout>
                <Heading title={"PENGUMUMAN"}>
                <BsFillMegaphoneFill/>
                </Heading>
                <InformationCard/>
            </CardLayout>
        }
        </>
    )
}

export default DashboardLayout;