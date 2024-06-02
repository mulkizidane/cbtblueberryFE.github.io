import { FaDownload } from "react-icons/fa";
import Time from "../components/elements/Time";
import ImportModal from "../components/fragments/ImportModal";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import { useEffect, useState } from "react";
import Table from "../components/layouts/data-master/Table";
import AsideLayout from "../components/layouts/data-master/AsideLayout";
import { inputConfig, tableConfig } from "../utils/Condition";
import { useParams } from "react-router-dom";
import RoundInput from "../components/elements/RoundInput";
import DateComponent from "../components/elements/Date";

const ManageUser = () => {
    const {manageId} = useParams()
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('Administrator')
    const tableHeaders = tableConfig[manageId] || tableConfig['default'];
    const inputs = inputConfig[manageId] || inputConfig['default'];

    useEffect(() => {
        if(manageId == 'guru'){
            setTitle('Guru')
        } else if(manageId == 'pengawas'){
            setTitle('Pengawas')
        } else if(manageId == 'siswa'){
            setTitle('Siswa')
        } else {
            setTitle('Administrator')
        }
    }, [manageId])


    return (
        <>
        <Layout>
            <div className="flex flex-col w-full pt-20 px-7">
                <div className="flex gap-2 pt-4 pb-6 justify-end">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="flex gap-2">
                    <div className={`bg-primary ${manageId == 'siswa' ? 'w-full' : 'w-[70%]'} rounded-xl overflow-hidden shadow-multiple`}>
                        <Heading title={`Data ${title}`}/>
                        <div className="w-full flex justify-between py-2 pr-2">
                            <div className="flex items-center gap-2 pl-2 text-sm font-semibold">
                                <h1>Show</h1>
                                <select name="entries" id="entries" className="rounded-full bg-transparent w-16 pl-4">
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                                <h1>entries</h1>
                            </div>
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

                    {
                        manageId == 'siswa' ?
                        ''
                        :
                        <AsideLayout>
                            {inputs.map((input, index) => (
                                <div key={index}>
                                    <RoundInput title={input.title} />
                                </div>
                            ))} 
                            {
                                manageId == 'guru' || manageId == 'pengawas'?
                                <div className="flex w-full gap-1">
                                    <RoundInput width={'w-1/2'} title={'Username'}/>
                                    <RoundInput width={'w-1/2'} title={'Password'} type={'password'}/>
                                </div>   
                                :
                                ''                                 
                            }
                        </AsideLayout>
                    }
                </div>
            </div>
        <ImportModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={`Import Data ${title}`}
        />
        </Layout>
        </>
    )
}

export default ManageUser;