import {Axios} from '../../lib/Axios';
import {getNotificationToken} from '../../lib/Notifee';
import {ApiEndPoints} from '../ApiEndPoints';

export const loginWithMobile = async (number: string, code: string) => {
  const token = await getNotificationToken();

  const formData = new FormData();

  formData.append('phone_number', number);
  formData.append('country_code', `+${code}`);
  formData.append('token', token);

  const response = await Axios.post(ApiEndPoints.loginWithPhone, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const id = response.data.data.user.id;
  const otp = response.data.data.user.mobile_otp;
  const authToken = response.data.data.token;

  return {id, otp, authToken};
};
