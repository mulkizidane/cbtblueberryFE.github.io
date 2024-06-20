import { FaDownload, FaEdit, FaTrash } from "react-icons/fa"
import RoundInput from "../components/elements/RoundInput"
import ImportModal from "../components/fragments/ImportModal"
import AsideLayout from "../components/layouts/data-master/AsideLayout"
import { handleAddData, handleDeleteData, handleImportFile, handleUpdateData } from "../services/subjectServices"
import { Loader } from "../components/elements/Loader"
import TableHead from "../components/elements/TableHead"
import Table from "../components/layouts/data-master/Table"
import Heading from "../components/layouts/Heading"
import Time from "../components/elements/Time"
import DateComponent from "../components/elements/Date"
import Layout from "../components/layouts/Layout"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const DataClassroomPage = () => {
    const { userId } = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [dataId, setDataId] = useState(0)
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    
    const [showModal, setShowModal] = useState(false)
    const [file, setFile] = useState()
    const [classCode, setClassCode] = useState("")
    const [classLevel, setClassLevel] = useState("")
    const [className, setClassName] = useState("")
    const newData = {
        class_code: classCode,
        class_level: classLevel,
        class_name: className,
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
                const response = await axios.get('http://localhost:5000/classrooms')
                setData(response.data.data)
                setIsLoading(false)
            } catch (error) {
                setErrMsg(error.response.data.msg)
            }
        }

        fetchData()
    }, [data])

    return (
        <>
        <Layout>
            <div className="flex flex-col w-full pt-20 px-7">
                <div className="flex gap-2 pt-4 pb-6 justify-end">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="flex gap-2">
                    <div className="bg-primary w-[70%] rounded-xl overflow-hidden shadow-multiple">
                        <Heading title={"Data Jenis Ujian"}/>
                        <div className="w-full flex justify-end py-2 pr-2">
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
                                    <th>Kode Kelas</th>
                                    <th>Level Kelas</th>
                                    <th>Nama Kelas</th>
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
                                        data.map((dt, index) => (
                                            <tr className={`${!dataId ? 'opacity-100' : dt.id == dataId ? 'shadow-multiple scale-105' : 'opacity-50 blur-[1px]'} transition-all duration-150`} key={dt.id}>
                                                <td>{index+1}</td>
                                                <td>{dt.class_code}</td>
                                                <td>{dt.class_level}</td>
                                                <td>{dt.class_name}</td>
                                                <td className="flex items-center justify-center text-lg gap-2">
                                                    <FaEdit 
                                                    onClick={() => handleUpdateData(dt.id, setIsEdit, setDataId)} className="text-yellow-500 cursor-pointer"
                                                    />
                                                    <FaTrash 
                                                    onClick={() => handleDeleteData(`http://localhost:5000/${userId}/classrooms/${dt.id}`, setIsDelete, setErrMsg)} className="text-red-500 cursor-pointer"
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
                            `http://localhost:5000/${userId}/classrooms`, 
                            `http://localhost:5000/${userId}/classrooms/${dataId}`, 
                            newData, 
                            setDataId, 
                            isEdit,
                            setErrMsg,
                            setSuccessMsg
                        )}
                    >
                        <RoundInput 
                        onChange={(e) => setClassCode(e.target.value)} 
                        title={"Kode Kelas"}
                        />                          
                        <RoundInput 
                        onChange={(e) => setClassLevel(e.target.value)} 
                        title={"Level Kelas"}
                        />                          
                        <RoundInput 
                        onChange={(e) => setClassName(e.target.value)} 
                        title={"Nama Kelas"}
                        />                          
                    </AsideLayout>
                </div>
            </div>
        <ImportModal
        onChange={(e) => setFile(e.target.files[0])}
        onClick={() => handleImportFile(file, `http://localhost:5000/${userId}/classrooms/import`, setShowModal, setErrMsg)}
        showModal={showModal}
        setShowModal={setShowModal}
        name={'Import Data Mata Pelajaran'}
        />
        </Layout>
        </>
    )
}

export default DataClassroomPage