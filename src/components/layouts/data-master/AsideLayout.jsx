/* eslint-disable react/prop-types */
const AsideLayout = ({children, onClick, isEdit}) => {
    return (
        <div className="rounded-xl w-[30%] shadow-soft bg-primary h-max">
            <div className="w-full border-b-2 py-4">

            </div>
            <form action="" className="px-4 py-4">
                {children}
                <div onClick={onClick} className="w-full mt-8 flex justify-end">
                    <button className="bg-btn text-white w-max px-4 py-1 rounded-lg">{isEdit ? "Edit" : "Tambah"}</button>
                </div>
            </form>
        </div>
    )
}

export default AsideLayout;