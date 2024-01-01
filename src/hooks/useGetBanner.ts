import { useEffect, useState } from "react";
import { banner } from "../services/banner"
import { Banner } from "./types";

export const useGetBanner = () => {
    const [data, setData] = useState<Banner[]>([]);
    const [bannerLoading, setBannerLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBanner = async () => {
            setBannerLoading(true)
            try {
                const result = await banner();
                setData(result)
                setBannerLoading(false)
            } catch (error: any) {
                setError(error.message)
                setBannerLoading(false)
            }
        }
        getBanner()
    }, [])

    return { data, bannerLoading, error };
}