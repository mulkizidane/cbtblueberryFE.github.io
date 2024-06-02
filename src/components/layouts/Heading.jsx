/* eslint-disable react/prop-types */
const Heading = ({title, icon}) => {
    return (
        <div className="w-full border-b-2 py-2 px-5 flex items-center gap-3 text-btn-sec text-lg font-semibold">
            {icon}
            <h1>{title}</h1>
        </div>
    )
}

export default Heading;