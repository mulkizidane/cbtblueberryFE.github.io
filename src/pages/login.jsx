import { useState } from "react";
import Form from "../components/fragments/Form";

const LoginPage = () => {
    const [user, setUser] = useState('');
    
    function handleOnChange(e){
        setUser(e.target.value);
    }

    return(
        <>
        <div className="flex w-full h-dvh">
            <div className="w-full h-full relative overflow-hidden">
                <img src="/img/bg.png" alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="h-dvh bg-primary px-24 flex flex-col justify-center">
                <img src="/img/logo.png" alt="" className="w-[600px]"/>
                <div className="mt-14">
                <Form onChange={handleOnChange} user={user}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage;