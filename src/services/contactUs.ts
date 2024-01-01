import { Axios } from "../lib/Axios"
import { ApiEndPoints } from "./ApiEndPoints"
import { ContactUsForm } from "./types";

export const contactUs = async ({ name, email, subject, message }: ContactUsForm, userToken: string | null) => {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    const response = await Axios.post(ApiEndPoints.contactUs, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userToken}`,

        },
    });

    return response.data.status;

}