import {Axios} from '../../lib/Axios';
import {getNotificationToken} from '../../lib/Notifee';
import {ApiEndPoints} from '../ApiEndPoints';

export const socialLogin = async (
  provider: string,
  providerId: string,
  username: string | null,
  email: string,
) => {
  const tokens = await getNotificationToken();

  const formData = new FormData();
  formData.append('provider', provider);
  formData.append('provider_id', providerId);
  formData.append('token', tokens);
  formData.append('username', username);
  formData.append('email', email);

  const response = await Axios.post(ApiEndPoints.socialLogin, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const authToken = response.data.data.token;
  const id = response.data.data.user.id;

  return {authToken, id};
};
