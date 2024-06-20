/* eslint-disable react/prop-types */

const Table = ({children, header}) => {
    return (
        <>
        <table className="w-full text-center rounded-lg overflow-hidden">
            {children}
        </table>
        </>
    )
}

export default Table;