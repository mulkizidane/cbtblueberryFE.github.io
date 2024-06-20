import { useContext, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ProfileImg from "../elements/ProfileImg";
import { useParams } from "react-router-dom";
import StudentContext from "../../context/StudentContext";

const Profile = () => {
    const {userId} = useParams()
    const [showDetails, setShowDetails] = useState(false)
    const { user } = useContext(StudentContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(user){
            setLoading(false)
        }
    }, [user])

    function handleLogOut(){
        if(user){
            localStorage.removeItem("token")
            localStorage.removeItem("user-type")
            if(userId == "siswa"){
                return window.location.href = '/'
            }
            window.location.href = "/login"
        }
    }

    if(loading){
        return (
            <div className={`absolute top-0 right-0 bg-primary flex flex-col z-10 shadow-soft h-max`}>
                <div className="pl-4 pr-6 flex gap-6 items-center h-20">
                    <div className="rounded-full w-10 h-10 bg-neutral-400 animate-pulse"></div>
                    <div className="mr-2 ">
                        <div className="h-2 bg-neutral-400 animate-pulse w-20"></div>
                        <div className="flex items-center gap-2 text-sm bg-neutral-300 h-2 animate-pulse mt-1 w-10">
                        </div>
                        
                        <div className="bg-neutral-200 animate-pulse w-8 h-2 mt-2">
                        </div>
                    </div>
                    <FaChevronDown onClick={() => setShowDetails(!showDetails)}/>
                </div>
            </div>
        )
    }

    return(
        <div className={`absolute top-0 right-0 bg-primary flex flex-col z-10 shadow-soft h-max`}>
                <div className="pl-4 pr-6 flex gap-6 items-center h-20">
                    <ProfileImg img={"/img/profile.png"}/>
                    <div className="mr-4">
                        <h1 className="font-bold">{
                        userId == 'admin' ? user.data.username 
                        : userId == 'guru' ? user.data.teacher_name 
                        : user?.data.name}</h1>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="rounded-full bg-green-600 w-3 h-3"></div>
                            <h1>{user.data.status ? user.data.status : 'Online'}</h1>
                        </div>
                        
                        {userId == 'admin' || userId == 'guru'?
                        ""
                        :
                        <div className="px-2 py-1 mt-2 font-semibold bg-blue-300 w-max rounded-lg text-xs">
                            <p>{user?.data.class.toUpperCase()}</p>
                        </div>
                        }
                    </div>
                    <FaChevronDown onClick={() => setShowDetails(!showDetails)}/>
                </div>
                <div className={`${showDetails ? "flex" : "hidden"} flex-col`}>
                    <div className={`bg-btn w-full h-32 rounded-lg flex justify-center py-4 flex-col items-center text-white`}>
                        <ProfileImg img={"/img/profile.png"}/>
                        <h1 className="font-semibold mt-2">{
                        userId == 'admin' ? user.data.username 
                        : userId == 'guru' ? user.data.teacher_name 
                        : user.data.name
                        }</h1>
                        <p className="text-sm">{
                        userId == 'admin' ? 'NIP:-' : userId == 'guru' ? 'NIP: '+user.data.nip 
                        : `NIS : ${user.data.nis}`
                        }</p>
                    </div>
                    <div className="w-full flex justify-end px-4 py-4">
                        <button onClick={handleLogOut} className="bg-btn text-white text-sm font-medium px-8 rounded-lg py-1">
                            Keluar
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default Profile;