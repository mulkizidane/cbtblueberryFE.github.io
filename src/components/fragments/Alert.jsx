/* eslint-disable react/prop-types */
import { FaExclamationCircle } from "react-icons/fa";

const Alert = ({showAlert, setShowAlert, msg}) => {
    return (
        <>
        <div className={`fixed w-full h-dvh inset-0 z-50 ${showAlert ? 'flex' : 'hidden'} justify-center items-center backdrop-blur-[2px] bg-neutral-400 bg-opacity-5`}>
            <div className="bg-primary rounded-lg px-6 py-10 shadow-multiple flex justify-center text-center w-max">
                <div className="flex flex-col items-center gap-2 w-64">
                    <FaExclamationCircle className="text-red-600 text-6xl"/>
                    <h1 className="text-red-600 font-bold">{msg.title ? msg.title : "PERINGATAN UJIAN !!"}</h1>
                    <p className="text-sm font-semibold">{msg.subTitle ? msg.subTitle : "JIKA KELUAR DARI UJIAN, UJIAN AKAN SELESAI SECARA LANGSUNG"}</p>
                    <button onClick={() => setShowAlert(false)} className="px-8 mt-6 w-max py-1 bg-btn text-white rounded-lg">{msg.btn ? msg.btn : "MULAI"}</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Alert;