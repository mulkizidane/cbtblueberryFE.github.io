import { FaDownload } from "react-icons/fa"
import Heading from "./Heading"

// eslint-disable-next-line react/prop-types
const CompleteCard = ({title, icon, isImportFile, isAddSoal, setShowModal, isAddEntries, children, setShowSoal, isSearch, onClick}) => {
    return (
        <>
        <div className={`bg-primary w-full rounded-xl overflow-hidden shadow-multiple`}>
                        {
                            title ?
                            <Heading icon={icon ? icon : ''} title={title} />
                            : 
                            ""
                        }
                        <div className="w-full flex justify-between py-2 px-4">
                            {
                                isAddEntries ?
                                    <div className="flex items-center gap-2 pl-2 text-sm font-semibold">
                                        <h1>Show</h1>
                                        <select name="entries" id="entries" className="rounded-full bg-transparent w-16 pl-4">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <h1>entries</h1>
                                    </div>
                                :
                                <div></div>
                            }
                            <div className="flex gap-2 items-center">
                            {
                                isAddSoal ? 
                                <button onClick={() => setShowSoal(true)} className="flex items-center gap-2 text-white font-semibold bg-btn rounded-lg px-3 py-1">
                                    Tambah Soal
                                </button>
                                :
                                ''
                            }
                            {
                                isImportFile ?
                                <button onClick={setShowModal} className="flex items-center gap-2 text-white font-semibold bg-btn rounded-lg px-3 py-1">
                                    <FaDownload/>
                                    Import File
                                </button>
                                :
                                ''
                            }
                            {
                                isSearch ?
                                <div>
                                    <label htmlFor="search">Search</label>
                                    <input type="search" className="rounded-full px-2 py-0.5 ml-2 bg-transparent border-2"/>
                                </div>
                                : 
                                ''
                            }
                            </div>
                        </div>
                        <div className="px-2 pt-2 pb-4">
                            {children}
                        </div>
        </div>
        </>
    )
}

export default CompleteCard;