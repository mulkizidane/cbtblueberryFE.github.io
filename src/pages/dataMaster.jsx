import { FaDownload } from "react-icons/fa";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import Time from "../components/elements/Time";
import RoundInput from "../components/elements/RoundInput";
import { useEffect, useState } from "react";
import ImportModal from "../components/fragments/ImportModal";
import AsideLayout from "../components/layouts/data-master/AsideLayout";
import Table from "../components/layouts/data-master/Table";
import { useParams } from "react-router-dom";
import { inputConfig, tableConfig } from "../utils/Condition";
import DateComponent from "../components/elements/Date";

const DataMasterPage = () => {
    const {masterId} = useParams()
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('Mata Pelajaran')
    const tableHeaders = tableConfig[masterId] || tableConfig['default'];
    const inputs = inputConfig[masterId] || inputConfig['default'];

    useEffect(() => {
        if(masterId == 'jenis-ujian'){
            setTitle('Jenis Ujian')
        } else if(masterId == 'jurusan'){
            setTitle('Jurusan')
        } else if(masterId == 'kelas'){
            setTitle('Kelas')
        } else if(masterId == 'ruangan'){
            setTitle('Ruangan')
        } else if(masterId == 'level'){
            setTitle('Level')
        } else if(masterId == 'sesi'){
            setTitle('Sesi')
        }
        else {
            setTitle('Mata Pelajaran')
        }
    }, [masterId])

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
                        <Heading title={`Data ${title}`}/>
                        <div className="w-full flex justify-end py-2 pr-2">
                            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 text-white font-semibold bg-btn rounded-lg px-3 py-1">
                                <FaDownload/>
                                Import File
                            </button>
                        </div>
                        <div className="px-2 pt-2 pb-4">
                            <Table header={tableHeaders.length}>
                                {tableHeaders.map((column, index) => (
                                    <th key={index}>{column.header}</th>
                                ))}
                            </Table>
                        </div>
                    </div>

                    <AsideLayout>
                        {inputs.map((input, index) => (
                            <RoundInput key={index} title={input.title} />
                        ))}                                     
                    </AsideLayout>
                </div>
            </div>
        <ImportModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={'Import Data Mata Pelajaran'}
        />
        </Layout>
        </>
    )
}

export default DataMasterPage;