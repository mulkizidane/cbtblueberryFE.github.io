/* eslint-disable react/prop-types */
const LgButton = ({value, bg, onClick}) => {
    return (
        <button onClick={onClick} className={`px-4 py-1 rounded-lg shadow-soft ${bg ? bg : 'bg-btn'} text-white font-semibold hover:scale-[0.98] hover:brightness-90 hover:shadow-multiple`}>
            {value}
        </button>
    )
}

export default LgButton;