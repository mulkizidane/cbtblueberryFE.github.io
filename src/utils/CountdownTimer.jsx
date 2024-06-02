/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinutes = 50 }) => {
  const [time, setTime] = useState(initialMinutes * 60); // Waktu dalam detik

    useEffect(() => {
        if (time <= 0) return;

        const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <h1>{formatTime(time)}</h1>
    );
};

export default CountdownTimer;
