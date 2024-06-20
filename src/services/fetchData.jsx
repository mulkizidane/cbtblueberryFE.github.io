import axios from "axios";
import { useEffect } from "react";

export const useFetchData = (url, setData, setLoading) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                alert(error.response.data.msg);
            }
        };
        fetchData();
    }, [url, setData, setLoading]);
};