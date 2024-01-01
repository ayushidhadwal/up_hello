import { Axios } from "../../lib/Axios"
import { ApiEndPoints } from "../ApiEndPoints"
import { AllReels } from "../types";

export const reelsList = async (page: number, userToken: string | null) => {
    const response = await Axios.get(ApiEndPoints.allReels, {
        params: {
            page: page,
        },
        headers: {
            'Authorization': `Bearer ${userToken}`,
        }
    });
    const data = response.data.data;

    return data.map((item: any): AllReels => {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            video: item.video,
            likeStatus: item.likestatus,
            profileImage: item.profile_image,
            username: item.username
        }
    })
}