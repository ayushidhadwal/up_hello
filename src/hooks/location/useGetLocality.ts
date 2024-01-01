import { useEffect, useState } from "react"
import {  LocalityType } from "../../services/types";
import { localityf } from "../../services/location/locality";

export const useGetLocality = (id: number) => {
    const [locality, setLocality] = useState<LocalityType[]>([]);
    const [localityLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null);


    useEffect(() => {
        const getLocality = async () => {
            setLoading(true)
            try {
                const Result = await localityf(id);
                setLocality(Result);
                setLoading(false)

            } catch (error: any) {
                setError(error.message)
                setLoading(false)
            }
        }
        if (id) {
            getLocality();
        }
    }, [id])

    return { locality, localityLoading, error }
}

