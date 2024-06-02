import { FaFileCircleCheck } from "react-icons/fa6";
import DateComponent from "../components/elements/Date";
import Time from "../components/elements/Time";
import CompleteCard from "../components/layouts/CompleteCard";
import Layout from "../components/layouts/Layout"
import TableHead from "../components/elements/TableHead";
import { FaEdit, FaTrash } from "react-icons/fa";

const CetakDataPage = () => {
    const head = [
        {"name": "#"},
        {"name": "NIM"},
        {"name": "Nama"},
        {"name": "Kelas"},
        {"name": "Mapel"},
        {"name": "Tanggal Ujian"},
        {"name": "Nilai PG"},
        {"name": "Nilai Essai"},
        {"name": "Total Nilai"},
        {"name": "Nilai KKM"},
        {"name": "Keterangan"},
        {"name": ""},
    ]

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="w-full flex justify-end gap-2 py-4">
                    <DateComponent/>
                    <Time/>
                </div>
                <CompleteCard title={'Hasil Nilai'} icon={<FaFileCircleCheck/>}>
                    <table className="w-full rounded-lg overflow-hidden">
                        <TableHead>
                            {
                                head.map((h, i) => (
                                    <th key={i}>
                                        {h.name}
                                    </th>
                                ))
                            }
                        </TableHead>
                        <tbody>
                            <tr className="text-sm">
                                <td>1</td>
                                <td>2401001</td>
                                <td>Test Siswa 1</td>
                                <td>12</td>
                                <td>Matematika</td>
                                <td>2024-05-22</td>
                                <td>12 Point</td>
                                <td></td>
                                <td>Online</td>
                                <td>70</td>
                                <td>Tidak lulus</td>
                                <td className="flex items-center justify-center text-lg gap-2">
                                        <FaEdit className="text-yellow-500"/>
                                        <FaTrash className="text-red-500"/>
                                </td>
                            </tr>
                            {
                                Array.from({length: 7}).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={12}>{i+2}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </CompleteCard>
            </div>
        </Layout>
        </>
    )
}

export default CetakDataPage;