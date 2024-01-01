import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"

export const itemStatus = async (id: number, userToken: string|null) => {
    const formData = new FormData();

    formData.append('item_id', id);

    const response = await Axios.post(ApiEndPoints.itemStatus, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`,
        }
    })

    return true;
}