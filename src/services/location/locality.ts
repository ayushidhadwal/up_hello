import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"
import {  LocalityType } from "../types";

export const localityf = async (id:number) => {
    const response = await Axios.get(`${ApiEndPoints.location.getLocality}/${id}`)

    const data = response.data.data;


    return data.map((item: any):LocalityType  => {
        return {
            id: item.id,
            localityName: item.name,
            cityId: item.district_id,
            stateId: item.state_id,
        }
    })
}