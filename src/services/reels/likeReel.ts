import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';

export const likeReel = async (
  id: number,
  type: number,
  userToken: string | null,
) => {
  const formData = new FormData();

  formData.append('short_video_id', id);
  formData.append('status', type);

  const response = await Axios.post(ApiEndPoints.likeReel, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userToken}`,
    },
  });

  return true;
};
