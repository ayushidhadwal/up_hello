import { useEffect, useState } from "react"
import { ApiEndPoints } from "../../services/ApiEndPoints"
import { Axios } from "../../lib/Axios";
import { RecentItemsDetails } from "../types";

export const useRecentItemsDetails = (id: number, userToken: string | null) => {

    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getRecentItemsDetails = async () => {
        setLoading(true)
        try {
            const response = await Axios.get(`${ApiEndPoints.recentItemsDetails}/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            });
            const data = response.data.data;
            setData(data)
            setLoading(false)
        } catch (error: any) {
            setError(error.message);
            setLoading(false)
        }
    }

    useEffect(() => {
        getRecentItemsDetails()
    }, [])

    return { data, loading, error };
}