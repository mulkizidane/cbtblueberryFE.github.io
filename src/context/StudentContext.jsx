/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [errorStatus, setErrorStatus] = useState()

    useEffect(() => {
        if(window.location.pathname == "/login" || window.location.pathname == "/"){
            return
        }
        if(errorStatus){
            alert("Token kadaluwarsa harap login kembali...")
            setErrorStatus("")
            window.location.href = '/login'
        }
    }, [errorStatus])

    const fetchUserData = async(token, userType) => {
        let url;
        if (userType === 'admin') {
            url = 'http://localhost:5000/administrator';
        } else if (userType == 'guru' || userType == 'Guru') {
            url = 'http://localhost:5000/teacher';
        } else {
            url = 'http://localhost:5000/student';
        }
        const config = {
            headers: { authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get(url, config);
            setUser(response.data);
        } catch (error) {
            console.log(error)
            setErrorStatus(error.response)
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('user-type'); 
        if (token && userType) {
            fetchUserData(token, userType);
        }
    }, []);

    return (
        <StudentContext.Provider value={{ user, setUser }}>
            {children}
        </StudentContext.Provider>
    );
}

export default StudentContext;