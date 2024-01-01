import { Banner } from "../hooks/types";
import { Axios } from "../lib/Axios"
import { ApiEndPoints } from "./ApiEndPoints"

export const banner = async () => {

    const response = await Axios.get(ApiEndPoints.banner);
    const data = response.data.data;



    return data.map((item: any): Banner => {
        return {
            image: item.image
        }
    })
}