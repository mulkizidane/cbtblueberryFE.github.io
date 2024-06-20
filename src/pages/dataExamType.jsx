import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Table from "../components/layouts/data-master/Table"
import { Loader } from "../components/elements/Loader"
import TableHead from "../components/elements/TableHead"
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa"
import Heading from "../components/layouts/Heading"
import Time from "../components/elements/Time"
import DateComponent from "../components/elements/Date"
import Layout from "../components/layouts/Layout"
import AsideLayout from "../components/layouts/data-master/AsideLayout"
import RoundInput from "../components/elements/RoundInput"
import ImportModal from "../components/fragments/ImportModal"
import { handleAddData, handleDeleteData, handleImportFile, handleUpdateData } from "../services/subjectServices"
import axios from "axios"

const DataExamTypePage = () => {
    const { userId } = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [dataId, setDataId] = useState(0)
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('');

    const [showModal, setShowModal] = useState(false)
    const [file, setFile] = useState()
    const [examCode, setExamCode] = useState("")
    const [examType, setExamType] = useState("")
    const [examName, setExamName] = useState("")
    const newData = {
        exam_code: examCode,
        exam_type: examType,
        exam_name: examName,
    }

    useEffect(() => {
        if(errMsg){
            alert(errMsg)
            setErrMsg("")
        }
        if(successMsg){
            alert(successMsg)
            setSuccessMsg("")
        }
    }, [errMsg, successMsg])
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('http://localhost:5000/exam-type')
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
                                    <th>Kode Ujian</th>
                                    <th>Jenis Ujian</th>
                                    <th>Nama Ujian</th>
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
                                                <td>{dt.exam_code}</td>
                                                <td>{dt.exam_type}</td>
                                                <td>{dt.exam_name}</td>
                                                <td className="flex items-center justify-center text-lg gap-2">
                                                    <FaEdit 
                                                    onClick={() => handleUpdateData(dt.id, setIsEdit, setDataId)} className="text-yellow-500 cursor-pointer"
                                                    />
                                                    <FaTrash 
                                                    onClick={() => handleDeleteData(`http://localhost:5000/${userId}/exam-type/${dt.id}/delete`, setIsDelete, setErrMsg)} className="text-red-500 cursor-pointer"
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
                            `http://localhost:5000/${userId}/exam-type`, 
                            `http://localhost:5000/${userId}/exam-type/${dataId}`, 
                            newData, 
                            setDataId, 
                            isEdit,
                            setErrMsg,
                            setSuccessMsg
                        )}
                    >
                        <RoundInput 
                        onChange={(e) => setExamCode(e.target.value)} 
                        title={"Kode Ujian"}
                        />                          
                        <RoundInput 
                        onChange={(e) => setExamType(e.target.value)} 
                        title={"Jenis Ujian"}
                        />                          
                        <RoundInput 
                        onChange={(e) => setExamName(e.target.value)} 
                        title={"Nama Ujian"}
                        />                          
                    </AsideLayout>
                </div>
            </div>
        <ImportModal
        onChange={(e) => setFile(e.target.files[0])}
        onClick={() => handleImportFile(file, `http://localhost:5000/${userId}/exam-type/import`, setShowModal, setErrMsg)}
        showModal={showModal}
        setShowModal={setShowModal}
        name={'Import Data Mata Pelajaran'}
        />
        </Layout>
        </>
    )
}

export default DataExamTypePage;