import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"

export const chatNotifications = async (id: any, itemId: any, message: string, userToken: string | null) => {

    const formData = new FormData()

    formData.append('user_id', id);
    formData.append('product_id', itemId);
    formData.append('massage', message);


    const resposne = await Axios.post(ApiEndPoints.chatNotification, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`,
        }
    });

    return true
}