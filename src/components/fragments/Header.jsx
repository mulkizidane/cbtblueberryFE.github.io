/* eslint-disable react/prop-types */
import { FiMenu } from "react-icons/fi"
import Profile from "./Profile";

const Header = ({onClick}) => {
    return (
        <header className="w-full fixed top-0 z-50 flex justify-between pl-[5%] bg-btn h-20 items-center">
            <FiMenu onClick={onClick} className="text-white text-3xl cursor-pointer"/>
            <Profile/>
        </header>
    )
}

export default Header;