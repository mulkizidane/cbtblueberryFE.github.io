import { FaFileContract, FaPlus } from "react-icons/fa";
import DateComponent from "../components/elements/Date";
import Time from "../components/elements/Time";
import Layout from "../components/layouts/Layout";
import RoundInput from "../components/elements/RoundInput";
import CompleteCard from "../components/layouts/CompleteCard";
import TableHead from "../components/elements/TableHead";
import SmButton from "../components/elements/SmButton";
import { IoRefreshCircle } from "react-icons/io5";
import { useState } from "react";
import BlueModal from "../components/fragments/BlueModal";
import CheckBox from "../components/elements/CheckBox";

const MenuUjian = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="w-full justify-end gap-2 flex py-4">
                    <DateComponent/>
                    <Time/>
                </div>

                <div className="bg-primary w-full shadow-soft rounded-xl mb-4 overflow-hidden">
                    <div className="py-4 px-4 text-btn-sec text-lg font-semibold flex gap-2 items-center border-b-2">
                        <FaFileContract/>
                        <h1>Menu Ujian</h1>
                    </div>

                    <div className="px-4 py-4">
                        <div className="flex justify-end">
                            <button onClick={() => setShowModal(true)} className="px-4 py-1 bg-btn text-white flex items-center gap-2 text-sm rounded-lg">
                                <FaPlus/>
                                Tambah Jadwal
                            </button>
                        </div>
                            <div className="flex gap-2 mt-4 justify-between">
                                <form action="" className="w-1/2">
                                    <RoundInput title={'Pilih Jadwal Ujian'} />
                                    <div className="flex gap-2 mt-2">
                                        <RoundInput title={'Pilih Kelompok Test / Sesi'} />
                                        <RoundInput title={'Mapel'} />
                                    </div>
                                </form>
                                <div className="w-1/2 pl-10">
                                    <div className="bg-btn-young rounded-2xl shadow-soft flex justify-between px-4 items-center h-32 w-96">
                                        <div className="h-full flex flex-col justify-between text-white py-4 ">
                                            <h1 className="font-bold text-4xl">BEIZHI</h1>
                                            <p>Token Tes</p>
                                        </div>
                                        <div className="w-20">
                                            <img src="/img/token.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="font-bold mt-2">
                                        <h1>Token akan refresh setiap 15 menit</h1>
                                        <h1 className="text-btn">Refresh Sekarang</h1>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                <CompleteCard isAddEntries={true} isSearch={true}>
                    <table className="w-full rounded-lg  overflow-hidden">
                        <TableHead>
                            <th>#</th>
                            <th>NIS</th>
                            <th>Name</th>
                            <th>Kelas</th>
                            <th>Mapel</th>
                            <th>Lama Ujian</th>
                            <th>Jawaban</th>
                            <th>Nilai</th>
                            <th>Status</th>
                            <th></th>
                        </TableHead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>2401001</td>
                            <td>Test Siswa 1</td>
                            <td>12</td>
                            <td>Matematika</td>
                            <td>48 Menit</td>
                            <td className="flex justify-center gap-2">
                                <SmButton value={'4'} type={'done'}/>
                                <SmButton value={'3'} type={'danger'}/>
                            </td>
                            <td>12 Point</td>
                            <td>Online</td>
                            <td><IoRefreshCircle className="text-btn-young text-2xl"/></td>
                            </tr>
                        </tbody>
                    </table>
                </CompleteCard>
            </div>
        </Layout>
        <BlueModal
        showModal={showModal}
        icon={<FaFileContract/>}
        title={'Menu Ujian'}
        >
            <form action="" className="px-6 py-4 flex flex-col gap-2 w-[600px]">
                <RoundInput title={'Kode Bank Soal'}/>
                <RoundInput title={'Jenis Ujian'}/>
                <div className="flex gap-2">
                    <RoundInput title={'Tanggal Mulai Ujian'} width={'w-1/2'}/>
                    <RoundInput title={'Tanggal Akhir Ujian'} width={'w-1/2'}/>
                </div>
                <div className="flex gap-2 pr-6">
                    <RoundInput title={'Sesi'} width={'w-1/4'}/>
                    <RoundInput title={'Lama Ujian'} placeholder={'Menit'} width={'w-1/4'}/>
                    <RoundInput title={'Selesai'} placeholder={'Menit'} width={'w-1/4'}/>
                    <RoundInput title={'Pelanggaran'} placeholder={'Detik'} width={'w-1/4'}/>
                </div>
                <div className="flex justify-between mt-4 font-bold">
                    <CheckBox htmlFor={'soal'} name={'soal'} label={'Acak Soal'}/>
                    <CheckBox htmlFor={'opsi'} name={'opsi'} label={'Acak Opsi'}/>
                    <CheckBox htmlFor={'hasil'} name={'hasil'} label={'Tampilkan Hasil'}/>
                    <CheckBox htmlFor={'reset'} name={'reset'} label={'Reset Login'}/>
                </div>

                <div className="flex justify-end mt-6">
                    <button onClick={() => setShowModal(false)} className="px-2 py-1 text-white font-semibold bg-btn rounded-lg">
                        Tambah Jadwal
                    </button>
                </div>
            </form>
        </BlueModal>
        </>
    )
}

export default MenuUjian;