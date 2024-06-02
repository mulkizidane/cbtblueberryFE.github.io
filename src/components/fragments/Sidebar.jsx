/* eslint-disable react/prop-types */
import { AiFillClockCircle, AiFillDashboard } from "react-icons/ai"
import Nav from "../elements/Nav"
import { FaFile, FaFolderOpen, FaUserFriends } from "react-icons/fa"
import { useParams } from "react-router-dom"
import AdminSidebar from "../layouts/AdminSidebar"
import { FaFileCircleCheck, FaFileLines } from "react-icons/fa6"
import { TbSettingsFilled } from "react-icons/tb"
import { useEffect, useState } from "react"

const Sidebar = ({showSidebar}) => {
    const {userId} = useParams();
    const [closeSidebar, setCloseSidebar] = useState(false)

    useEffect(() => {
        if(showSidebar) {
            setTimeout(() => {
                setCloseSidebar(false)
            }, 300)
        } else {
            setCloseSidebar(false)
        }
    }, [showSidebar])

    if(userId == 'admin'){
        return <AdminSidebar showSidebar={showSidebar} closeSidebar={closeSidebar}/>
    }

    if(userId == 'guru'){
        return (
            <div className={`h-screen ${!showSidebar ? 'w-0' : closeSidebar ? 'w-0' : 'w-64'} overflow-hidden bg-primary pt-24 flex flex-col gap-2 transition-all duration-500`}>
                <div className={`${showSidebar ? 'flex' : 'hidden'} flex-col gap-2`}>
                <Nav 
                link={'/guru/dashboard'} 
                name={'Dashboard'}
                >
                    <AiFillDashboard/>
                </Nav>
                <Nav 
                link={'/guru/bank-soal'} 
                name={'Bank Soal'}
                >
                    <FaFolderOpen/>
                </Nav>
                <Nav 
                link={'/guru/status-siswa'} 
                name={'Status Siswa'}
                >
                    <FaUserFriends/>
                </Nav>
                <Nav 
                link={'/guru/menu-ujian'} 
                name={'Menu Ujian'}
                >
                    <FaFileLines/>
                </Nav>
                <Nav 
                link={'/guru/hasil-nilai'} 
                name={'Hasil Nilai'}
                >
                    <FaFileCircleCheck/>
                </Nav>
                <Nav 
                link={'/guru/pengaturan'} 
                name={'Pengaturan'}
                >
                    <TbSettingsFilled/>
                </Nav>
                </div>
        </div>
        )
    }


    return (
        <div className={`h-screen ${!showSidebar ? 'w-0' : closeSidebar ? 'w-0' : 'w-64'} overflow-hidden bg-primary pt-24 flex flex-col gap-2 transition-all duration-500`}>
                <div className={`${showSidebar ? 'flex' : 'hidden'} flex-col gap-2`}>
                <Nav 
                link={'/siswa/dashboard'} 
                name={'Dashboard'}
                >
                    <AiFillDashboard/>
                </Nav>
                <Nav 
                link={'/siswa/jadwal-ujian'} 
                name={'Jadwal Ujian'}
                >
                    <AiFillClockCircle/>
                </Nav>
                <Nav 
                link={'/siswa/hasil-ujian'} 
                name={'Hasil Ujian'}
                >
                    <FaFile/>
                </Nav>
                </div>
        </div>
    )
}


export default Sidebar;