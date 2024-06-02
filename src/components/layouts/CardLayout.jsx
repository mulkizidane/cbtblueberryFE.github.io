/* eslint-disable react/prop-types */
const CardLayout = ({children, width}) => {
    return (
        <div className={`${width ? width : 'w-full'} pt-20 px-7`}>
            <div className="bg-primary rounded-xl mt-5 overflow-hidden shadow-multiple">
                {children}
            </div>
        </div>
    )
}

export default CardLayout;