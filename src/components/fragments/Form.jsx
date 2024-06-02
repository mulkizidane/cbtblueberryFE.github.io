/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Input from "../elements/Input";

const Form = ({onChange, user}) => {
    return (
        <form action="" className="flex flex-col gap-6 mx-auto">
            <Input
            htmlFor={"username"}
            nameId={"username"}
            label={"Username"}
            placeholder={"username"}
            type={"text"}
            onChange={onChange}
            />
            <Input
            htmlFor={"password"}
            nameId={"password"}
            label={"Password"}
            placeholder={"password"}
            type={"password"}
            />

            <Link to={`/${user}/dashboard`} className="w-full flex flex-col">
            <button type="submit" className="px-6 py-2 bg-btn text-white mt-6">Masuk</button>
            </Link>
        </form>
    )
}

export default Form;