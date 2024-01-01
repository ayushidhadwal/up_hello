import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"

export const myItem = async (userToken: string | null) => {
    const response = await Axios.get(ApiEndPoints.myItems, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })


    const data = response.data.data;

    return data
}