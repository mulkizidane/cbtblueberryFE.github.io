import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import Time from "../components/elements/Time";
import ImportModal from "../components/fragments/ImportModal";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import { useEffect, useState } from "react";
import Table from "../components/layouts/data-master/Table";
import { useParams } from "react-router-dom";
import DateComponent from "../components/elements/Date";
import axios from "axios";
import TableHead from "../components/elements/TableHead";
import { Loader } from "../components/elements/Loader";
import { handleAddData, handleDeleteData, handleImportFile, handleUpdateData } from "../services/subjectServices";
import CompleteCard from "../components/layouts/CompleteCard";
import BlueModal from "../components/fragments/BlueModal";
import RoundInput from "../components/elements/RoundInput";
import Select from "../components/elements/Select";
import LgButton from "../components/fragments/LgButton";

const DataStudentPage = () => {
    const { userId } = useParams()
    const [data, setData] = useState(null)
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [dataId, setDataId] = useState(0)
    const [entries, setEntries] = useState(data?.length);
    
    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [file, setFile] = useState()
    const [nis, setNis] = useState(0)
    const [studentNo, setStudentNo] = useState(0)
    const [studentName, setStudentName] = useState('')
    const [classroom, setClassroom] = useState('')
    const [level, setLevel] = useState('')
    const [majority, setMajority] = useState('')
    const [session, setSession] = useState('')
    const [room, setRoom] = useState('')
    const [status, setStatus] = useState('')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const newData = {
        nis,
        student_no: studentNo,
        name: studentName,
        class: classroom,
        level,
        majority,
        session,
        room,
        status,
        username,
        password
    }

    useEffect(() => {
        if(isEdit){
            setShowAddModal(true)
            return    
        }
        setShowAddModal(false)
    }, [isEdit])
    
    useEffect(() => {
        if(errMsg){
            alert(errMsg)
            setErrMsg("")
            return
        }
        if(successMsg){
            alert(successMsg)
            setSuccessMsg('')
            setShowAddModal(false)
        }
    }, [errMsg, successMsg])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('http://localhost:5000/students')
                setData(response.data.data)
                setIsLoading(false)
            } catch (error) {
                setErrMsg(error.response.data.msg)
            }
        }
        fetchData()
    }, [data])

    function handleOption(e){
        setEntries(e.target.value)
    }

    return (
        <>
        <Layout>
            <div className="flex flex-col w-full pt-20 px-7">
                <div className="flex gap-2 pt-4 pb-6 justify-end">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="flex gap-2">
                    <div className={`bg-primary w-full rounded-xl overflow-hidden shadow-multiple`}>
                        <Heading title={'Data Guru'}/>
                        <div className="w-full flex justify-between py-2 pr-2">
                            <div className="flex items-center gap-2 pl-2 text-sm font-semibold">
                                <h1>Show</h1>
                                <select onChange={handleOption} name="entries" id="entries" className="rounded-full bg-transparent w-16 pl-4">
                                    {
                                        data?.map((dt,index) => (
                                            <option key={dt.nis} value={index+1}>{index+1}</option>
                                        ))
                                    }
                                </select>
                                <h1>entries</h1>
                            </div>
                            <div className="flex gap-2">
                            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 text-white font-semibold bg-btn rounded-lg px-3 py-1">
                                Tambah Siswa
                            </button>
                            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 text-white font-semibold bg-btn rounded-lg px-3 py-1">
                                <FaDownload/>
                                Import File
                            </button>
                            </div>
                        </div>
                        <div className="px-2 pt-2 pb-4">
                        {
                        isLoading ? 
                        <div className="flex justify-center py-10">
                            <Loader/>
                        </div>
                        :
                            <Table>
                                <TableHead>
                                    <th>#</th>
                                    <th>NIS</th>
                                    <th>No Peserta</th>
                                    <th>Nama</th>
                                    <th>Level</th>
                                    <th>Kelas</th>
                                    <th>Jurusan</th>
                                    <th>Sesi</th>
                                    <th>Ruang</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Status</th>
                                    <th></th>
                                </TableHead>
                                <tbody>
                                    {
                                        isDelete ? 
                                        <tr>
                                            <td><Loader/></td>
                                        </tr>
                                        :
                                        data?.length == 0 ?
                                        <tr>
                                            <td colSpan={10}>No data available</td>
                                        </tr>
                                        :
                                        data?.slice(0, entries).map((dt, index) => (
                                            <tr className={`${!dataId ? 'opacity-100' : dt.nis == dataId ? 'shadow-multiple scale-105' : 'opacity-50 blur-[1px]'} transition-all duration-150`} key={dt.nis}>
                                                <td>{index+1}</td>
                                                <td>{dt.nis}</td>
                                                <td>{dt.student_no}</td>
                                                <td>{dt.name}</td>
                                                <td>{dt.level}</td>
                                                <td>{dt.class}</td>
                                                <td>{dt.majority}</td>
                                                <td>{dt.session}</td>
                                                <td>{dt.room}</td>
                                                <td>{dt.username}</td>
                                                <td>{dt.password.substr(0,10)}</td>
                                                <td>{dt.status}</td>
                                                <td className="flex items-center justify-center text-lg gap-2">
                                                    <FaEdit 
                                                    onClick={() => handleUpdateData(dt.nis, setIsEdit, setDataId)} className="text-yellow-500 cursor-pointer"
                                                    />
                                                    <FaTrash 
                                                    onClick={() => handleDeleteData(`http://localhost:5000/${userId}/students/${dt.nis}`, setIsDelete, setErrMsg)} 
                                                    className="text-red-500 cursor-pointer"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        }
                        </div>
                    </div>

                </div>
            </div>
        <ImportModal
        onChange={(e) => setFile(e.target.files[0])}
        onClick={() => handleImportFile(file, `http://localhost:5000/${userId}/students/import`, setShowModal, setErrMsg)}
        showModal={showModal}
        setShowModal={setShowModal}
        name={`Import Data Siswa`}
        />
        <BlueModal 
        showModal={showAddModal}
        title={'Tambah Data Siswa'}
        >
            <div className="px-5 py-4 flex flex-col gap-1 w-full">
                <div className="flex gap-2 w-full">
                    <RoundInput 
                    onChange={(e) => setNis(e.target.value)}
                    title={'NIS'}
                    width={'w-1/2'}
                    />
                    <RoundInput 
                    onChange={(e) => setStudentNo(e.target.value)}
                    width={'w-1/2'}
                    title={'Nomor Peserta'}
                    />
                </div>
                    <RoundInput 
                    onChange={(e) => setStudentName(e.target.value)}
                    title={'Nama'}
                    />
                <div className="flex gap-1 mt-2">
                    <Select
                    onChange={(e) => setClassroom(e.target.value)}
                    name={'classroom'}
                    >
                        <option value="S-1">S-1</option>
                        <option value="S-2">S-2</option>
                        <option value="S-3">S-3</option>
                    </Select>
                    <Select
                    onChange={(e) => setLevel(e.target.value)}
                    name={'level'}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Select>
                    <Select
                    onChange={(e) => setMajority(e.target.value)}
                    name={'majority'}
                    >
                        <option value="Matematika">Matematika</option>
                        <option value="Informatika">Informatika</option>
                        <option value="B Inggris">B Inggris</option>
                    </Select>
                </div>
                <div className="flex gap-1 mt-2">
                    <Select
                    onChange={(e) => setSession(e.target.value)}
                    name={'session'}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Select>
                    <Select
                    onChange={(e) => setRoom(e.target.value)}
                    name={'room'}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Select>
                    <Select
                    onChange={(e) => setStatus(e.target.value)}
                    name={'status'}
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </Select>
                </div>
                <div className="flex gap-2 w-full mt-2">
                    <RoundInput 
                    onChange={(e) => setUsername(e.target.value)}
                    title={'Username'}
                    width={'w-1/2'}
                    />
                    <RoundInput 
                    onChange={(e) => setPassword(e.target.value)}
                    title={'Password'}
                    width={'w-1/2'}
                    />
                </div>
                <div className="flex w-full justify-end mt-4">
                    <button 
                    onClick={
                        (e) => handleAddData(
                            e, 
                            `http://localhost:5000/${userId}/students`, 
                            `http://localhost:5000/${userId}/students/${dataId}`, 
                            newData, 
                            setDataId, 
                            isEdit, 
                            setErrMsg, 
                            setSuccessMsg
                        )
                    } 
                    className="px-8 py-1 bg-btn rounded-full text-white">Simpan</button>
                </div>
            </div>
        </BlueModal>
        </Layout>
        </>
    )
}

export default DataStudentPage;