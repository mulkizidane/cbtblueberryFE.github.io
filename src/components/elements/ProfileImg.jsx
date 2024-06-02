/* eslint-disable react/prop-types */
const ProfileImg = ({img}) => {
    return (
        <div className="rounded-full w-12 h-12 overflow-hidden bg-white">
                <img src={img} alt="" />
        </div>
    )
}

export default ProfileImg;