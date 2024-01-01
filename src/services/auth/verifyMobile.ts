import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"

export const verifyMobile = async (id: any, otp: any) => {

    const formData = new FormData();

    formData.append('user_id', id)
    formData.append('phone_otp', otp)

    const response = await Axios.post(ApiEndPoints.verifyMobile, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    )

    return true
}