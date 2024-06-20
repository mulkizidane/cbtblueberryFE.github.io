/* eslint-disable react/prop-types */
const RoundInput = ({title, defaultVal, type, width, placeholder, isRow, onChange}) => {


    return (
        <>
        <div className={`flex ${isRow ? 'flex-row justify-between' : 'flex-col'} gap-2 ${width ? width : ''}`}>
            <label htmlFor={title} className={`${isRow ? 'w-32' : ''} font-bold`}>{title}</label>
            <input defaultValue={defaultVal} onChange={onChange} placeholder={placeholder ? placeholder : ''} type={type ? type : 'text'} className={`${isRow ? 'rounded-lg' : 'rounded-full'} px-4 py-0.5 bg-transparent border-btn border-2`}/>
        </div>
        </>
    )
}

export default RoundInput;