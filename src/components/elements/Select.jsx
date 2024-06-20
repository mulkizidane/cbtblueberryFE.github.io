/* eslint-disable react/prop-types */
const Select = ({children, onChange, name, width}) => {
    return (
        <div className={`flex flex-col gap-1 ${width ? width : 'w-full'}`}>
            <label htmlFor={name} className="font-bold">{name}</label>
            <select onChange={onChange} name={name} id={name} className={`rounded-full h-full border-btn border-2 bg-transparent  pl-4`}>
            {children}
            </select>
        </div>
    )
}

export default Select;