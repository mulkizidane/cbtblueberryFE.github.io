import { FaCheck, FaUserFriends } from "react-icons/fa";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import { FaX } from "react-icons/fa6";
import { IoRefreshCircle } from "react-icons/io5";
import DateComponent from "../components/elements/Date";
import Time from "../components/elements/Time";

const ParticipantStatusPage = () => {
    return (
        <>
        <Layout>
            <div className="pt-20 px-7 w-full">
                <div className="w-full flex justify-end gap-2 py-4">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="bg-primary rounded-lg shadow-soft w-full pb-4">
                <Heading title={'Status Peserta'}>
                    <FaUserFriends/>
                </Heading>
                <div className="px-2 py-2">
                    <div className="flex justify-end gap-2">
                        <label htmlFor="search" className="font-bold">Search:</label>
                        <input type="search" name="search" id="search" className="rounded-full bg-transparent border-2 border-neutral-400 py-0.5"/>
                    </div>
                    <table className="rounded-lg overflow-hidden w-full mt-4  text-center">
                        <thead>
                            <tr className="bg-btn text-white">
                                <th>#</th>
                                <th>NIS</th>
                                <th>Nama</th>
                                <th>Kelas</th>
                                <th>Mapel</th>
                                <th>Lama Ujian</th>
                                <th>Jawaban</th>
                                <th>Nilai</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2401001</td>
                                <td>Test siswa 1</td>
                                <td>12</td>
                                <td>Matematika</td>
                                <td>48 Menit</td>
                                <td className="flex items-center justify-center gap-1">
                                    <div className="px-1 py-0.5 text-white bg-green-600 flex items-center text-xs gap-1">
                                        <FaCheck/>
                                        <p>4</p>
                                    </div>
                                    <div className="px-1 py-0.5 text-white bg-red-600 flex items-center text-xs gap-1">
                                        <FaX/>
                                        <p>4</p>
                                    </div>
                                </td>
                                <td>12 Point</td>
                                <td>Online</td>
                                <td>
                                    <IoRefreshCircle className="text-btn text-2xl"/>
                                </td>
                            </tr>
                            {Array.from({ length: 7 }).map((_, index) => (
                                    <tr key={index}>
                                        <td>{index + 2}</td>
                                        <td colSpan={12}></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

export default ParticipantStatusPage;