import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"
import { StatesType } from "../types";

export const states = async () => {
    const response = await Axios.get(ApiEndPoints.location.getStates);

    const data = response.data.data;

    return data.map((item:any):StatesType=>{
        return {
            id:item.id,
            stateName:item.state_title
        }
    })
}