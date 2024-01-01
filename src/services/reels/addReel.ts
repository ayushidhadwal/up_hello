import {Axios} from '../../lib/Axios';
import {AddReel} from '../../screens/Reel/AddReel';
import {ApiEndPoints} from '../ApiEndPoints';

export const addReel = async (
  userToken: string | null,
  options: AddReel,
  callback: (progress: number) => void,
) => {
  const formData = new FormData();
  formData.append('video', options.video);
  formData.append('title', options.title);
  formData.append('description', options.desc);
  formData.append('thumbnail', options.thumbnail);

  await Axios.post(ApiEndPoints.addReels, formData, {
    onUploadProgress: (progressEvent: any) => {
      callback(progressEvent.progress);
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userToken}`,
    },
  });

  return true;
};
