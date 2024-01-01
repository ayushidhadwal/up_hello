import { useEffect, useState } from "react"
import { states } from "../../services/location/states";
import { StatesType } from "../../services/types";

export const useGetState = () => {
    const [state, setState] = useState<StatesType[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getStates = async () => {
            setLoading(true);
            try {
                const result = await states();
                setState(result)
                setLoading(false);
            } catch (error: any) {
                setError(error.message)
                setLoading(false);
            }
        }

        getStates();
    }, [])

    return {
        state, loading, error
    }
}