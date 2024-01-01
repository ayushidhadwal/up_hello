import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';
import {MyReels} from '../types';

export const myReels = async (userToken: string | null) => {
  const response = await Axios.get(ApiEndPoints.myReels, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = response.data.data;

  return data.map((item: any): MyReels => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      video: item.video,
      type: item.like_status,
      thumbnail: item.thumbnail,
    };
  });
};
