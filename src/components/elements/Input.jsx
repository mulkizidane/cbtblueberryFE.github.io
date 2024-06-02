/* eslint-disable react/prop-types */
const Input = ({htmlFor, label, nameId, type, placeholder, onChange}) => {
    return(
        <div className="flex flex-col gap-1">
            <label htmlFor={htmlFor}>{label}</label>
            <input 
            type={type} 
            name={nameId} 
            id={nameId}
            placeholder={placeholder}
            onChange={onChange}
            className="border-b-2 border-neutral-500 outline-none bg-transparent px-4 py-2"
            />
        </div>
    )
}

export default Input;