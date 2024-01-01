import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"

export const unlinkGoogle = async (userToken: string | null) => {
    const response = await Axios.get(ApiEndPoints.deleteGoogleLink, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    });
    return true;
}