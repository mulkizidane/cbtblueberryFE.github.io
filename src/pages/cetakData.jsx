import { FaFileCircleCheck } from "react-icons/fa6";
import DateComponent from "../components/elements/Date";
import Time from "../components/elements/Time";
import CompleteCard from "../components/layouts/CompleteCard";
import Layout from "../components/layouts/Layout"
import TableHead from "../components/elements/TableHead";
import { useEffect, useState } from "react";
import axios from "axios";
import DateFormatName from "../utils/DateFormatName";

const CetakDataPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const head = [
        {"name": "#"},
        {"name": "NIM"},
        {"name": "Nama"},
        {"name": "Kelas"},
        {"name": "Mapel"},
        {"name": "Tanggal Ujian"},
        {"name": "Total Nilai"},
        {"name": "Nilai KKM"},
        {"name": "Keterangan"},
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/student/exam-results`);
                const isExamResults = res.data.data.filter(dt => dt.ExamResults.length !== 0);
                if (isExamResults) {
                    setData(isExamResults);
                    console.log(isExamResults);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleExport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/exam-results/export', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ExamResults.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.log('Error exporting file:', error);
        }
    }

    return (
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="w-full flex justify-end gap-2 py-4">
                    <DateComponent />
                    <Time />
                </div>
                <div className="flex justify-end">
                <button className="bg-btn text-white px-4 py-1 rounded-lg mb-2" onClick={handleExport}>Export File</button>
                </div>
                <CompleteCard title={'Hasil Nilai'} icon={<FaFileCircleCheck />}>
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
                            {
                                data?.map((dt, i) => (
                                    <tr key={dt.nis} className="text-sm">
                                        <td>{i + 1}</td>
                                        <td>{dt.nis}</td>
                                        <td>{dt.name}</td>
                                        <td>{dt.class}</td>
                                        <td>{dt.ExamResults[0].subject}</td>
                                        <td>{DateFormatName(dt.ExamResults[0].exam_date)}</td>
                                        <td>{dt.ExamResults[0].total_grade}</td>
                                        <td>{dt.ExamResults[0].passing_score}</td>
                                        <td>{dt.ExamResults[0].information}</td>
                                    </tr>
                                ))
                            }
                            {
                                Array.from({ length: 7 }).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={12}>{i + 2}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </CompleteCard>
            </div>
        </Layout>
    );
}

export default CetakDataPage;
