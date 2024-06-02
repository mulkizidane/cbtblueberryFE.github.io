import { useEffect, useState } from "react";

const Time = () => {
    const [curTime, setCurTime] = useState(new Date());

        useEffect(() => {
            const intervalId = setInterval(() => {
            setCurTime(new Date());
            }, 1000);

            return () => clearInterval(intervalId);
        }, []);

        const getCurTime = () => {
            const hours = curTime.getHours().toString().padStart(2, '0');
            const minutes = curTime.getMinutes().toString().padStart(2, '0');
            const seconds = curTime.getSeconds().toString().padStart(2, '0');

            return `${hours}:${minutes}:${seconds}`;
        };


    return (
        <>
        <div className="rounded-lg shadow-soft bg-primary text-btn px-2 py-1 flex">
                    <h1>{getCurTime()}</h1>
                </div>
        </>
    )
}

export default Time;