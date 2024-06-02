/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ExamModalLayout = ({showModal}) => {
    const data = [
        { label: 'Nama Peserta Ujian', value: 'Test siswa 1' },
        { label: 'Pengawas Ruangan', value: 'Guru' },
        { label: 'Mata Pelajaran', value: 'Matematika' },
        { label: 'Jumlah Soal', value: '30 Soal (25 PG, 5 ESAY)' },
        { label: 'Waktu Ujian', value: '55 menit' },
        { label: 'Tanggal Pelaksanaan', value: '22 May 2024' },
    ];

    return (
        <>
        <div className={`fixed z-50 backdrop-blur-[2px] ${showModal ? "flex" : "hidden"} justify-center items-center bg-neutral-100 bg-opacity-15 inset-0 w-full h-dvh`}>
            <div className="rounded-lg shadow-multiple px-6 py-6 bg-primary w-max border-btn">
                <div className="w-[700px] border-b-2 pb-6 border-btn">
                    <h1 className="text-lg font-bold">Simulasi Ujian Berbasis CBT</h1>
                    <div className="w-full bg-btn-sec text-white px-4 py-4 mt-2">
                        <h1 className="font-semibold">Peraturan Ujian !</h1>
                        <p className="text-sm text-neutral-200">Lorem, ipsum dolor sit amet consectetur adipisicing elit. In beatae tempore quaerat molestiae? Odit facilis perspiciatis, at fugit incidunt, libero quo, alias impedit culpa reiciendis dolorem. Impedit a magnam qui.</p>
                    </div>
                </div>
                <div className="pt-4">
                    <h1 className="text-lg font-bold">Konfirmasi Data</h1>
                    <div className="flex flex-col gap-1 mt-2">
                        <table>
                            <tbody>
                            {data.map((item, index) => (
                            <tr key={index}>
                                <td className="pr-4 font-medium">{item.label}</td>
                                <td className="font-light">:</td>
                                <td className="pl-4">{item.value}</td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="justify-end flex gap-2 font-medium mt-16">
                        <input type="text" className="border-2 px-6 py-1 border-neutral-400 bg-transparent" placeholder="MASUKKAN TOKEN"/>
                        <button className="border-2 px-6 py-1 bg-btn-sec text-white">
                            <Link to={'/siswa/dashboard/ujian'}>
                            MULAI
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ExamModalLayout;