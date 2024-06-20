/* eslint-disable react/prop-types */
const InputFile = ({label, border, bg, onChange}) => {
    return (
        <div className="flex flex-col gap-1">
        <h1 className="font-bold">{label}</h1>
        <div className={`relative w-full ${bg ? bg : 'bg-transparent'} rounded-lg px-2 py-1 border-2 ${border ? border : 'border-stone-300'}`}>
            <input onChange={onChange} type="file" className="absolute inset-0 w-full h-full  cursor-pointer" />
            <div className="bg-stone-300 w-max px-2 py-1 flex items-center justify-center font-medium cursor-pointer text-black border-2 border-stone-400 text-sm">
                Choose File
            </div>
        </div>
        </div>
    )
}

export default InputFile;