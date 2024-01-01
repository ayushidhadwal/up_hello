import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"
import { Notification } from "../types"

export const notifications = async (userToken: string | null):Promise<Notification> => {
    const response = await Axios.get(ApiEndPoints.getNotifications, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })

    const data = response.data.data

    return data.map((item:any):Notification =>{
        return {
            id:item.id,
            createdAt:item.created_at,
            notificationBody:item.notification_body,
            notificationTitle:item.notification_title
        }
    })
}