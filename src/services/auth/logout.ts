import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"



export const logoutFunc = async (userToken: string | null) => {

    const formData = new FormData();

    const response = await Axios.get(ApiEndPoints.auth.logout,  {
        headers: {
            'Authorization': `Bearer ${userToken}`,
        }
    })

    return true;
}