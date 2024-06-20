/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Input from "../elements/Input";

const Form = ({setUsername, setPassword, onSubmit}) => {
    

    return (
        <form action="" onSubmit={onSubmit} className="flex flex-col gap-6 mx-auto">
            <Input
            htmlFor={"username"}
            nameId={"username"}
            label={"Username"}
            placeholder={"username"}
            type={"text"}
            onChange={(e) => setUsername(e.target.value)}
            />
            <Input
            htmlFor={"password"}
            nameId={"password"}
            label={"Password"}
            placeholder={"password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            />
            
            <div className="flex flex-col gap-2 font-semibold">
                <button type="submit" className="px-6 py-2 bg-btn text-white mt-6">Masuk</button>
                <Link to={window.location.pathname == '/' ? '/login' : '/'} className="w-full">
                    <button className="px-6 py-2 border-btn w-full border-2 bg-white text-btn">Login sebagai {window.location.pathname == "/" ? "guru" : "siswa"}</button>
                </Link>
            </div>
        </form>
    )
}

export default Form;