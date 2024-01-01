import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"

export const socialLinking = async (provider: string, providerId: string, userId: any, ) =>{

    const formData = new FormData();

    formData.append('provider', provider);
    formData.append('provider_id', providerId);     
    formData.append('user_id', userId);     

    const response = await Axios.post(ApiEndPoints.socialLinking,formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })



    return true
    
}