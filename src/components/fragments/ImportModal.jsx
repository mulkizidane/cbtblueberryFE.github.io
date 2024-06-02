/* eslint-disable react/prop-types */
import { FaX } from "react-icons/fa6";

const ImportModal = ({showModal, setShowModal, name}) => {
    return (
        <>
        <div className={`fixed w-full h-dvh inset-0 z-50 ${showModal ? 'flex' : 'hidden'} justify-center items-center backdrop-blur-[2px] bg-neutral-400 bg-opacity-5`}>
            <div className="bg-primary rounded-lg shadow-multiple ">
                <div className="w-full bg-btn text-white flex items-center justify-between px-4 py-2 rounded-lg text-lg font-semibold">
                    <h1>{name}</h1>
                    <FaX onClick={() => setShowModal(false)}/>
                </div>
                <div className="py-2 px-4 w-[600px]">
                    <div>
                        <div className="relative w-full rounded-full px-4 py-1 border-2 border-stone-300">
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="bg-stone-300 w-max px-2 py-1 flex items-center justify-center font-medium cursor-pointer text-black border-2 border-stone-400 text-sm">
                                Choose File
                            </div>
                        </div>
                        <div className="px-4 mt-2 text-sm font-semibold">
                            <p>Sebelum meng-import pastikan file yang akan anda import sudah dalam bentuk Ms. Excel 97-2003 Workbook (.xls) dan format penulisan harus sesuai dengan yang telah ditentukan.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-20">
                        <button className="text-white bg-btn px-4 py-1 rounded-lg">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImportModal;