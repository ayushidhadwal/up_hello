import { Axios } from "../../lib/Axios"
import { UpdateImg } from "../../screens/Profile/EditProfileScreen";
import { ApiEndPoints } from "../ApiEndPoints"

export const updateProfile = async (options: UpdateImg, userToken: string | null,code:any,description:string) => {
    const formData = new FormData();
    formData.append('username', options.username);
    formData.append('phone_number', options.phoneNumber);
    formData.append('email', options.email);
    formData.append('user_image', options.img);
    formData.append('status', 1);
    formData.append('country', code);
    formData.append('description', description);


    const response = await Axios.post(ApiEndPoints.updateProfile, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`
        }
    });

    return true;
}