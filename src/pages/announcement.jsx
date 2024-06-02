import { BsMegaphoneFill } from "react-icons/bs";
import Heading from "../components/layouts/Heading";
import Layout from "../components/layouts/Layout";
import TextArea from "../components/fragments/TextArea";
import Time from "../components/elements/Time";
import { FaTrash } from "react-icons/fa";
import DateComponent from "../components/elements/Date";

const AnnouncementPage = () => {
    return (
        <>
        <Layout>
            <div className="flex flex-col pt-24 px-7 w-full">
                <div className="flex gap-2 pt-2 pb-6 justify-end">
                    <DateComponent/>
                    <Time/>
                </div>
                <div className="flex gap-4 w-full">
                    <div className="rounded-lg w-[60%] shadow-soft bg-primary px-4 pb-4 h-max">
                        <Heading title={'Pengumuman'}>
                            <BsMegaphoneFill/>
                        </Heading>
                            <div className="py-4 px-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="judul" className="font-bold">Judul Pengumuman</label>
                                    <input type="text" className="rounded-full px-4 py-1 bg-transparent border-2"/>
                                </div>
                                <div className="mt-4">
                                    <TextArea />
                                </div>
                            </div>
                    </div>
                    <div className="bg-primary w-[40%] rounded-lg shadow-soft px-2 h-max pt-2 pb-6">
                        <div className="w-full flex justify-end py-2">
                            <div>
                                <label htmlFor="search">Search</label>
                                <input type="search" className="rounded-full px-2 py-0.5 ml-2 bg-transparent border-2"/>
                            </div>
                        </div>
                        <table className="w-full rounded-lg shadow-soft overflow-hidden">
                            <thead>
                                <tr className="bg-btn text-white divide-x-2">
                                    <th>#</th>
                                    <th>Nama</th>
                                    <th>Mapel</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Test Siswa</td>
                                    <td>Matematika</td>
                                    <td><FaTrash className="text-red-500"/></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

export default AnnouncementPage;