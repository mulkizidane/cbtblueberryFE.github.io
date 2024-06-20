import { useContext, useState } from "react";
import Form from "../components/fragments/Form";
import axios from "axios";
import StudentContext from "../context/StudentContext";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(StudentContext)

    async function handleOnSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const config = {
                headers: {authorization: `Bearer ${token}`}
            }

            const isAdmin = username == 'admin';
            if(!isAdmin){
                const userResponse = await axios.get('http://localhost:5000/teacher', config)
                localStorage.setItem('user-type', 'guru')
                setUser(userResponse.data);
                alert('Login berhasil');
                window.location.href = `/guru/dashboard`;
                return
            }
            const userResponse = await axios.get('http://localhost:5000/administrator', config)
            localStorage.setItem('user-type', 'admin')
            setUser(userResponse.data);
            alert('Login berhasil');
            window.location.href = `/admin/dashboard`;
        } catch (error) {
            alert(error.response.data.msg);
        }
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
                <Form 
                setPassword={setPassword} 
                setUsername={setUsername}
                onSubmit={handleOnSubmit}
                />
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage;