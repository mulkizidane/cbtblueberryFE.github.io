import { useContext, useState } from "react";
import Form from "../components/fragments/Form";
import axios from "axios";
import StudentContext from "../context/StudentContext";

const SiswaLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(StudentContext)

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login-siswa', {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const config = {
                headers: {authorization: `Bearer ${token}`}
            }
            const userResponse = await axios.get('http://localhost:5000/student', config)
            localStorage.setItem('user-type', 'siswa')
            setUser(userResponse.data);
            alert('Login berhasil');
            window.location.href = `/siswa/dashboard`;
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return(
        <div className="w-full h-dvh overflow-hidden relative bg-neutral-500">
            <img src="/img/bg.png" alt="" className="w-full h-full mix-blend-multiply absolute object-cover"/>
            <div className="relative w-full h-dvh flex justify-center items-center">
                <div className="bg-primary rounded-2xl px-8 py-14">
                    <img src="/img/logo.png" alt="" className="w-[400px]"/>
                    <div className="mt-14 px-4">
                    <Form 
                    onSubmit={handleSubmit}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SiswaLoginPage;