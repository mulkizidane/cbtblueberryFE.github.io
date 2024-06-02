/* eslint-disable react/prop-types */
const BlueModal = ({showModal, title, icon, children}) => {
    return (
        <div className={`fixed w-full h-dvh inset-0 z-50 ${showModal ? 'flex' : 'hidden'} justify-center items-center backdrop-blur-[2px] bg-neutral-400 bg-opacity-5`}>
            <div className="bg-primary rounded-lg shadow-multiple w-max">
                <div className="w-full rounded-lg bg-btn px-4 py-3 text-white text-lg font-bold flex items-center gap-2">
                    {icon ? icon : ''}
                    <h1>{title}</h1>
                </div>
                {children}
            </div>
        </div>
    )
}

export default BlueModal;