import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ProfileImg from "../elements/ProfileImg";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
    const {userId} = useParams()
    const [showDetails, setShowDetails] = useState(false)


    return(
        <div className={`absolute top-0 right-0 bg-primary flex flex-col z-10 shadow-soft h-max`}>
                <div className="pl-4 pr-6 flex gap-6 items-center h-20">
                    <ProfileImg img={"/img/profile.png"}/>
                    <div className="mr-4">
                        <h1 className="font-bold">{userId == 'admin' ? 'Nama Admin' : userId == 'guru' ? 'Nama Guru' : 'Nama Siswa'}</h1>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="rounded-full bg-green-600 w-3 h-3"></div>
                            <h1>Online</h1>
                        </div>
                        
                        <div className={`${userId == 'admin' || userId == 'guru' ? 'hidden' : 'block'} px-2 py-1 mt-2 font-semibold bg-blue-300 w-max rounded-lg text-xs`}>
                            <p>S-1</p>
                        </div>
                    </div>
                    <FaChevronDown onClick={() => setShowDetails(!showDetails)}/>
                </div>
                <div className={`${showDetails ? "flex" : "hidden"} flex-col`}>
                    <div className={`bg-btn w-full h-32 rounded-lg flex justify-center py-4 flex-col items-center text-white`}>
                        <ProfileImg img={"/img/profile.png"}/>
                        <h1 className="font-semibold mt-2">{userId == 'admin' ? 'Nama Administrator' : userId == 'guru' ? 'Nama Guru' : 'Nama Siswa'}</h1>
                        <p className="text-sm">{userId == 'admin' || userId == 'guru' ? 'NIP: -' : 'NIS : 2401001'}</p>
                    </div>
                    <div className="w-full flex justify-end px-4 py-4">
                        <Link to={userId == "siswa" ? '/siswa/login' : '/login'}>
                        <button className="bg-btn text-white text-sm font-medium px-8 rounded-lg py-1">
                            Keluar
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Profile;