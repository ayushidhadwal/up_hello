import {Axios} from '../../lib/Axios';
import {getNotificationToken} from '../../lib/Notifee';
import {ApiEndPoints} from '../ApiEndPoints';
import {RegisterFormValues} from './types';

export const register = async (data: RegisterFormValues, code: string) => {
  const {username, email, password, mobile} = data;

  const tokens = await getNotificationToken();

  const formData = new FormData();

  formData.append('username', username);
  formData.append('mobile', mobile);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('f_token', tokens);
  formData.append('country_code', `+${code}`);

  const response = await Axios.post(ApiEndPoints.auth.register, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // const token = response.data.data.token
  // const id = response.data.data.user.id

  const emailOtp = response.data.data.user.email_otp;
  const mobileOtp = response.data.data.user.mobile_otp;
  const id = response.data.data.user.id;

  return {emailOtp, mobileOtp, id};
};
