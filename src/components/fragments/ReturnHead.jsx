/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DateComponent from "../elements/Date";
import Time from "../elements/Time";

const ReturnHead = ({value, to}) => {
    return(
        <div className="flex justify-between w-full py-4">
                    <Link to={to}>
                        <button className="px-4 py-2 bg-btn text-white font-semibold rounded-lg">{value}</button>
                    </Link>
                    <div className="flex gap-2">
                        <DateComponent/>
                        <Time/>
                    </div>
        </div>
    )
}

export default ReturnHead;