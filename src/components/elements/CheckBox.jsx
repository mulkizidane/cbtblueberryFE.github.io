/* eslint-disable react/prop-types */
const CheckBox = ({htmlFor, label, name, onClick}) => {
    return (
        <>
        <div className="flex items-center gap-2">
            <input onClick={onClick} type="checkbox" name={name} className="appearance-none bg-transparent rounded-sm"/>
            <label htmlFor={htmlFor}>{label}</label>
        </div>
        </>
    )
}

export default CheckBox;