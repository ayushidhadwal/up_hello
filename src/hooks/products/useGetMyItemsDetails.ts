import { useContext, useEffect, useState } from "react"
import { myItemDetails } from "../../services/product/myItemDetails"
import { AuthContext } from "../../context/auth"
import { MyItemDetails } from "../types"

export const useGetMyItemsDetails = (id: number) => {
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null);

    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        const getMyItemsDetails = async () => {
            setLoading(true)
            try {
                const result = await myItemDetails(id, userToken);
                setData(result)
                setLoading(false)
            } catch (error: any) {
                setError(error.message);
                setLoading(false)
            }
        }
        getMyItemsDetails();
    }, [])

    return { data, loading, error };

}