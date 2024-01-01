import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"

export const deleteReel = async (id: number,userToken:string|null) => {

    const formData = new FormData();

    formData.append('id',id);

    const response = await Axios.post(ApiEndPoints.deleteReel, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`,
        }
    })

    return true;

}