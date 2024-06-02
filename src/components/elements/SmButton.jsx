/* eslint-disable react/prop-types */
const SmButton = ({type, value, icon}) => {
    return (
        <button className={`${type == 'danger' ? 'bg-red-600' : type == 'ware' ? 'bg-yellow-600' : type == 'done' ? 'bg-green-500' : 'bg-btn'} text-white flex items-center gap-2 rounded-lg px-2 py-0.5 text-xs`}>
            {icon}
            {value}
        </button>
    )
}

export default SmButton;