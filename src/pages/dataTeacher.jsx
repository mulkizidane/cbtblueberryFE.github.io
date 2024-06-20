import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import Time from "../components/elements/Time";
import ImportModal from "../components/fragments/ImportModal";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import { useEffect, useState } from "react";
import Table from "../components/layouts/data-master/Table";
import AsideLayout from "../components/layouts/data-master/AsideLayout";
import { useParams } from "react-router-dom";
import RoundInput from "../components/elements/RoundInput";
import DateComponent from "../components/elements/Date";
import axios from "axios";
import TableHead from "../components/elements/TableHead";
import { Loader } from "../components/elements/Loader";
import { handleAddData, handleDeleteData, handleImportFile, handleUpdateData } from "../services/subjectServices";

const DataTeacherPage = () => {
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
    const [file, setFile] = useState()
    const [nip, setNip] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const newData = {
        nip,
        teacher_name: teacherName,
        username,
        password
    }
    

    useEffect(() => {
        if(errMsg){
            alert(errMsg)
            setErrMsg("")
        }
        if(successMsg){
            alert(successMsg)
            setSuccessMsg('')
        }
    }, [errMsg, successMsg])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('http://localhost:5000/teachers')
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
                    <div className={`bg-primary ${userId == 'siswa' ? 'w-full' : 'w-[70%]'} rounded-xl overflow-hidden shadow-multiple`}>
                        <Heading title={'Data Guru'}/>
                        <div className="w-full flex justify-between py-2 pr-2">
                            <div className="flex items-center gap-2 pl-2 text-sm font-semibold">
                                <h1>Show</h1>
                                <select onChange={handleOption} name="entries" id="entries" className="rounded-full bg-transparent w-16 pl-4">
                                    {
                                        data?.map((dt,index) => (
                                            <option key={dt.nip} value={index+1}>{index+1}</option>
                                        ))
                                    }
                                </select>
                                <h1>entries</h1>
                            </div>
                            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 text-white font-semibold bg-btn rounded-lg px-3 py-1">
                                <FaDownload/>
                                Import File
                            </button>
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
                                    <th>NIP</th>
                                    <th>Nama Guru</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th></th>
                                </TableHead>
                                <tbody>
                                    {
                                        isDelete ? 
                                        <tr>
                                            <td><Loader/></td>
                                        </tr>
                                        :
                                        data.length == 0 ?
                                        <tr>
                                            <td colSpan={10}>No data available</td>
                                        </tr>
                                        :
                                        data.slice(0, entries).map((dt, index) => (
                                            <tr className={`${!dataId ? 'opacity-100' : dt.nip == dataId ? 'shadow-multiple scale-105' : 'opacity-50 blur-[1px]'} transition-all duration-150`} key={dt.nip}>
                                                <td>{index+1}</td>
                                                <td>{dt.nip}</td>
                                                <td>{dt.teacher_name}</td>
                                                <td>{dt.username}</td>
                                                <td>{dt.password.substr(0,10)}</td>
                                                <td className="flex items-center justify-center text-lg gap-2">
                                                    <FaEdit 
                                                    onClick={() => handleUpdateData(dt.nip, setIsEdit, setDataId)} className="text-yellow-500 cursor-pointer"
                                                    />
                                                    <FaTrash 
                                                    onClick={() => handleDeleteData(`http://localhost:5000/${userId}/teachers/${dt.nip}`, setIsDelete, setErrMsg)} 
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

                    <AsideLayout
                    isEdit={isEdit} 
                    onClick={
                        (e) => handleAddData(
                            e,
                            `http://localhost:5000/${userId}/teachers`, 
                            `http://localhost:5000/${userId}/teachers/${dataId}`, 
                            newData, 
                            setDataId, 
                            isEdit,
                            setErrMsg,
                            setSuccessMsg
                    )}
                    >
                        <RoundInput 
                        title={'NIP'}
                        onChange={(e) => setNip(e.target.value)}
                        />
                        <RoundInput 
                        title={'Nama Guru'}
                        onChange={(e) => setTeacherName(e.target.value)}
                        />
                        <RoundInput 
                        title={'Username'}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <RoundInput 
                        title={'Password'}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </AsideLayout>
                </div>
            </div>
        <ImportModal
        onChange={(e) => setFile(e.target.files[0])}
        onClick={() => handleImportFile(file, `http://localhost:5000/${userId}/teachers/import`, setShowModal, setErrMsg)}
        showModal={showModal}
        setShowModal={setShowModal}
        name={`Import Data Admin`}
        />
        </Layout>
        </>
    )
}

export default DataTeacherPage;