import { useState } from "react";
import CompleteCard from "../components/layouts/CompleteCard";
import Layout from "../components/layouts/Layout";
import ImportModal from "../components/fragments/ImportModal";
import DateComponent from "../components/elements/Date"
import Time from "../components/elements/Time"
import TableHead from "../components/elements/TableHead"
import { FaImage, FaTrash } from "react-icons/fa";

const ExtraFilePage = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <Layout>
            <div className="px-7 pt-20 w-full">
                <div className="w-full justify-end flex gap-2 py-4">
                    <DateComponent/>
                    <Time/>
                </div>
                <CompleteCard 
                isAddEntries={true}
                isImportFile={true}
                setShowModal={setShowModal}
                title={'Daftar File'}
                >
                    <div className="py-4 px-4">
                        <table className="w-full rounded-lg overflow-hidden">
                            <TableHead>
                                <th>#</th>
                                <th>Kode Soal</th>
                                <th>Nama File</th>
                                <th></th>
                            </TableHead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>0505</td>
                                    <td>
                                        <div className="flex items-center justify-between w-[60%]">
                                            <FaImage/>
                                            <h1>Foto Soal</h1>
                                        </div>
                                    </td>
                                    <td>
                                        <FaTrash className="text-red-600 mx-auto"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CompleteCard>
            </div>
        </Layout>
        <ImportModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={`Import File Foto Pendukung`}
        />
        </>
    )
}

export default ExtraFilePage;