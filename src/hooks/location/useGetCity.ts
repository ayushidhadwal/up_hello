import { useEffect, useState } from "react"
import { CityType } from "../../services/types";
import { cities } from "../../services/location/cities";

export const useGetCity = (id: number) => {
    const [city, setCity] = useState<CityType[]>([]);
    const [cityLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null);


    useEffect(() => {
        const getCity = async () => {
            setLoading(true)
            try {
                const Result = await cities(id);
                setCity(Result);
                setLoading(false)

            } catch (error: any) {
                setError(error.message)
                setLoading(false)
            }
        }
        if (id) {
            getCity();
        }
    }, [id])

    return { city, cityLoading, error }
}

