/* eslint-disable react/prop-types */
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const NavDropdown = ({name, icon, children, activeDropdown, setActiveDropdown}) => {
    const isActive = activeDropdown == name;

    function handleShowMore(){
        setActiveDropdown(isActive ? null : name)
    }

    return (
        <div>
        <div className={`py-2 pl-4 pr-2 hover:bg-secondary ${isActive ? 'bg-secondary' : 'bg-transparent'} cursor-pointer rounded-lg font-semibold h-max`}>
                <div onClick={handleShowMore} className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                        {icon}
                        <h1>{name}</h1>
                    </div>
                    {
                        isActive ?
                        <FaChevronUp/>
                        :
                        <FaChevronDown/>
                    }
                </div>
            </div>
            <div className={`pl-2 pt-2 text-sm w-full ${isActive ? 'flex flex-col' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}

export default NavDropdown