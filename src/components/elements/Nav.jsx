/* eslint-disable react/prop-types */
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom"

const Nav = ({link, children, name, padding}) => {
    return(
        <Link to={link} className={`flex gap-2 items-center ${padding ? padding : "py-3 px-4"} hover:bg-secondary rounded-lg font-semibold `}>
            {children ? children : <FaChevronRight/>}
            <h1>{name}</h1>
        </Link>
    )
}

export default Nav;