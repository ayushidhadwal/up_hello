import { useContext, useEffect, useState } from "react"
import { notifications } from "../../services/notifications/notifications";
import { AuthContext } from "../../context/auth";
import { Notification } from "../../services/types";

export const useGetNotifications = () => {
    const [data, setData] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const { userToken } = useContext(AuthContext)


    const getNotifications = async () => {
        setLoading(true)
        try {
            const result = await notifications(userToken);
            setData(result);
            setLoading(false)
        } catch (error: any) {
            setError(error.message);
            setLoading(false)
        }
    }
    useEffect(() => {
        getNotifications();
    }, [])

    return { data, loading, error }
}