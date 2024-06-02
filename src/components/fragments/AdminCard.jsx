import { AiFillDashboard } from "react-icons/ai"
import { FaArrowAltCircleRight } from "react-icons/fa"

const AdminCard = () => {
    return (
        <>
        <div className="rounded-lg w-[33%] shadow-multiple bg-card text-white relative">
                        <div className="flex py-4 px-4 justify-between">
                            <div className="font-bold space-y-2">
                                <h1 className="text-4xl">1</h1>
                                <h2>Data Peserta</h2>
                            </div>
                            <AiFillDashboard className="text-black text-[120px] absolute right-0 bottom-2 opacity-15"/>
                        </div>
                        <button className="w-full justify-center rounded-lg bg-dark-card py-2 text-white z-20 relative flex items-center gap-2 px-4">
                            More Info 
                            <FaArrowAltCircleRight/>
                        </button>
                    </div>
        </>
    )
}

export default AdminCard;