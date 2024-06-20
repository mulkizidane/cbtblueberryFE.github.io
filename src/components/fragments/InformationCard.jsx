/* eslint-disable react/prop-types */
import { FaCalendar } from "react-icons/fa"

const InformationCard = ({title, content, uploadAt}) => {
    return (
        
                        
                        <div className="w-full shadow-multiple">
                            <div className="w-full bg-btn-sec text-white px-4 py-4 flex justify-between">
                                <div className="flex items-end gap-2 font-semibold">
                                    <h1 className="font-bold">{title}</h1>
                                    <p className="text-neutral-300 text-sm">administrator</p>
                                </div>
                                <div className="flex items-center font-bold gap-2 text-neutral-300">
                                    <FaCalendar/>
                                    <h1>{uploadAt}</h1>
                                </div>
                            </div>
                            <div className="bg-primary w-full px-4 py-4 font-medium">
                                <h1>{content}</h1>
                            </div>
                        </div>
    )
}

export default InformationCard