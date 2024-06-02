/* eslint-disable react/prop-types */
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = ({children, header}) => {
    return (
        <>
        <table className="w-full text-center rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-btn text-white divide-x-2">
                                    {children}
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        header == 6 ?
                                <tr>
                                    <td>1</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="flex items-center justify-center text-lg gap-2">
                                        <FaEdit className="text-yellow-500"/>
                                        <FaTrash className="text-red-500"/>
                                    </td>
                                </tr>
                                        :
                                        header == 3 ?
                                <tr>
                                    <td>1</td>
                                    <td></td>
                                    <td></td>
                                    <td className="flex items-center justify-center text-lg gap-2">
                                        <FaEdit className="text-yellow-500"/>
                                        <FaTrash className="text-red-500"/>
                                    </td>
                                </tr>
                                        :
                                        header == 5?
                                <tr>
                                    <td>1</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="flex items-center justify-center text-lg gap-2">
                                        <FaEdit className="text-yellow-500"/>
                                        <FaTrash className="text-red-500"/>
                                    </td>
                                </tr>

                                        :
                                        header == 7?
                                <tr>
                                    <td>1</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="flex items-center justify-center text-lg gap-2">
                                        <FaEdit className="text-yellow-500"/>
                                        <FaTrash className="text-red-500"/>
                                    </td>
                                </tr>

                                        :
                                        header == 12?
                                <tr>
                                    <td>1</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="flex items-center justify-center text-lg gap-2">
                                        <FaEdit className="text-yellow-500"/>
                                        <FaTrash className="text-red-500"/>
                                    </td>
                                </tr>

                                        :
                                <tr>
                                    <td>1</td>
                                    <td></td>
                                    <td></td>
                                    <td className="flex items-center justify-center text-lg gap-2">
                                        <FaEdit className="text-yellow-500"/>
                                        <FaTrash className="text-red-500"/>
                                    </td>
                                </tr>
                                        
                                    }

                                {Array.from({ length: 7 }).map((_, index) => (
                                    <tr key={index}>
                                        <td>{index + 2}</td>
                                        <td colSpan={12}></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
        </>
    )
}

export default Table;