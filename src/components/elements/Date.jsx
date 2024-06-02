import { FaCalendar } from "react-icons/fa";

const DateComponent = () => {
    const getDate = () => {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0');
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
    
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayName = dayNames[today.getDay()];
    
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const monthName = monthNames[month - 1];
    
        return `${dayName}, ${day} ${monthName} ${year}`;
    };
    
    return (
        <>
        <div className="rounded-lg bg-primary shadow-soft text-btn px-2 py-1 flex items-center gap-2">
            <FaCalendar/>
            <h1>{getDate()}</h1>
        </div>
        </>
    )
}

export default DateComponent;