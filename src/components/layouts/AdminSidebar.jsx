/* eslint-disable react/prop-types */
import { AiFillDashboard } from "react-icons/ai";
import Nav from "../elements/Nav";
import { BsMegaphoneFill } from "react-icons/bs";
import NavDropdown from "../fragments/NavDropdown";
import { FaFileInvoice, FaFolder, FaFolderOpen, FaPrint, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import { FaFileCircleCheck, FaUserGear } from "react-icons/fa6";
import { TbSettingsFilled } from "react-icons/tb";

const AdminSidebar = ({showSidebar, closeSidebar}) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <div className={`h-dvh fixed z-40 top-0 left-0 ${!showSidebar ? 'w-0' : closeSidebar ? 'w-0' : 'w-52'} no-scrollbar overflow-hidden bg-primary pt-24 flex flex-col gap-2 transition-all duration-500`}>
                <div className={`${showSidebar ? 'flex' : 'hidden'} flex-col gap-2`}>
                <Nav 
                link={'/admin/dashboard'} 
                name={'Dashboard'}
                >
                    <AiFillDashboard/>
                </Nav>
                <Nav 
                link={'/admin/pengumuman'} 
                name={'Pengumuman'}
                >
                    <BsMegaphoneFill/>
                </Nav>
                <NavDropdown name={'Data Master'} icon={<FaFolder/>} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown}>
                    <Nav 
                    name={'Data Mata Pelajaran'} 
                    padding={'py-1 px-2'}
                    link={'/admin/data-master/mata-pelajaran'} 
                    />
                    <Nav 
                    name={'Data Jenis Ujian'} 
                    padding={'py-1 px-2'}
                    link={'/admin/data-master/jenis-ujian'} 
                    />
                    <Nav 
                    name={'Data Kelas'} 
                    padding={'py-1 px-2'}
                    link={'/admin/data-master/kelas'} 
                    />
                </NavDropdown>
                <NavDropdown name={'Manager User'} icon={<FaUserGear/>} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown}>
                    <Nav 
                    name={'Data Administrator'} 
                    padding={'py-1 px-2'}
                    link={'/admin/manage-user/administrator'} 
                    />
                    <Nav 
                    name={'Data Guru'} 
                    padding={'py-1 px-2'}
                    link={'/admin/manage-user/guru'} 
                    />
                    <Nav 
                    name={'Data Siswa'} 
                    padding={'py-1 px-2'}
                    link={'/admin/manage-user/siswa'} 
                    />
                </NavDropdown>
                <Nav 
                link={'/admin/status-siswa'}
                name={'Status Siswa'}
                >
                    <FaUserFriends/>
                </Nav>
                <NavDropdown name={'Bank Soal'} icon={<FaFolderOpen/>} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown}>
                    <Nav 
                    name={'Daftar Soal'} 
                    padding={'py-1 px-2'}
                    link={'/admin/bank-soal/daftar-soal'} 
                    />
                    <Nav 
                    name={'File Pendukung'} 
                    padding={'py-1 px-2'}
                    link={'/admin/bank-soal/file-pendukung'} 
                    />
                </NavDropdown>
                <Nav 
                link={'/admin/menu-ujian'}
                name={'Menu Ujian'}
                >
                    <FaFileCircleCheck/>
                </Nav>
                <Nav 
                link={'/admin/hasil-nilai'}
                name={'Hasil Nilai'}
                >
                    <FaFileInvoice/>
                </Nav>
                <NavDropdown name={'Cetak Data'} icon={<FaPrint/>} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown}>
                    <Nav 
                    name={'Data Hasil Nilai'} 
                    padding={'py-1 px-2'}
                    link={'/admin/cetak-data/hasil-nilai'} 
                    />
                </NavDropdown>
                <Nav 
                link={'/admin/pengaturan'}
                name={'Pengaturan'}
                >
                    <TbSettingsFilled/>
                </Nav>
                </div>
        </div>
    )
}

export default AdminSidebar;