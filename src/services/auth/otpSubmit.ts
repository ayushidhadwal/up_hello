import { Axios } from "../../lib/Axios";
import { ApiEndPoints } from "../ApiEndPoints";


export const otpSubmit = async (email: string, otp: number, newPassword: string, confPassword: string) => {
    const response = await Axios.post(ApiEndPoints.auth.otpSubmut, {
        email: email,
        otp: otp,
        new_password: newPassword,
        confirm_password: confPassword
    })

    return true
}