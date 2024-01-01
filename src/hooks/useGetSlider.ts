import { useEffect, useState } from "react"
import { slider } from "../services/slider"
import { Slider } from "./types"

export const useGetSlider = () => {
    const [data, setData] = useState<Slider[]>([]);
    const [sliderLoading, setSliderLoading] = useState<boolean>(false);
    const [error, setError] = useState()

    useEffect(() => {
        const getSlider = async () => {
            setSliderLoading(true)
            try {
                const result = await slider();
                setData(result);
                setSliderLoading(false)
            } catch (error: any) {
                setError(error.message);
                setSliderLoading(false)
            }
        }
        getSlider()
    }, [])


    return { data, sliderLoading, error }
}