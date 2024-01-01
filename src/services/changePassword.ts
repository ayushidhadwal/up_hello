import { Axios } from "../lib/Axios"
import { ApiEndPoints } from "./ApiEndPoints"
import { ChangePassword } from "./types";

export const changePassword = async ({ oldPass, newPass, confPass }: ChangePassword, userToken: string | null) => {

    const formData = new FormData()
    formData.append('old_password', oldPass);
    formData.append('password', newPass);
    formData.append('password_confirmation', confPass);

    const response = await Axios.post(ApiEndPoints.changePassword, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`,

        },
    })

    return response.data.status;
}