/* eslint-disable react/prop-types */
const RoundInput = ({title, type, width, placeholder, isRow}) => {


    return (
        <>
        <div className={`flex ${isRow ? 'flex-row justify-between' : 'flex-col'} gap-2 ${width ? width : ''}`}>
            <label htmlFor={title} className={`${isRow ? 'w-32' : ''} font-bold`}>{title}</label>
            {
                isRow ?
                <div>:</div>
                :
                ''
            }
            {
                title == 'Wali Kelas' ?
                <select name={title} className="bg-transparent rounded-full border-neutral-600 border-2 px-4">
                    <option value=""></option>
                    <option value="">Bu Risa</option>
                    <option value="">Pak Tomo</option>
                </select>
                :
                title == 'Ruang' ?
                <select name={title} className="bg-transparent rounded-full border-neutral-600 border-2 px-4">
                    <option value=""></option>
                    <option value="">3</option>
                    <option value="">6</option>
                </select>
                :
                <input placeholder={placeholder ? placeholder : ''} type={type ? type : 'text'} className={`${isRow ? 'rounded-lg' : 'rounded-full'} px-4 py-0.5 bg-transparent border-2`}/>
            }
        </div>
        </>
    )
}

export default RoundInput;