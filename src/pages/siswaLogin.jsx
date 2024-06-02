import { useState } from "react";
import Form from "../components/fragments/Form";

const SiswaLoginPage = () => {
    const [user, setUser] = useState('');
    
    function handleOnChange(e){
        setUser(e.target.value);
    }

    return(
        <div className="w-full h-dvh overflow-hidden relative bg-neutral-500">
            <img src="/img/bg.png" alt="" className="w-full h-full mix-blend-multiply absolute object-cover"/>
            <div className="relative w-full h-dvh flex justify-center items-center">
                <div className="bg-primary rounded-2xl px-8 py-14">
                    <img src="/img/logo.png" alt="" className="w-[400px]"/>
                    <div className="mt-14 px-4">
                    <Form onChange={handleOnChange} user={user}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SiswaLoginPage;