import { Slider } from "../hooks/types";
import { Axios } from "../lib/Axios"
import { ApiEndPoints } from "./ApiEndPoints"

export const slider = async () => {
    const response = await  Axios.get(ApiEndPoints.slider);
    const data = response.data.data;

    return data.map((item:any):Slider=>{
        return {
            image:item.image
        }
    })

}