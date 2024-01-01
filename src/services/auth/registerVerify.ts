import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';

export const registerVerify = async (
  mobileOtp: any,
  emailOtp: any,
  id: any,
) => {
  const formData = new FormData();

  formData.append('id', id);
  formData.append('phone_otp', mobileOtp);
  formData.append('email_otp', emailOtp);

  const response = await Axios.post(ApiEndPoints.registerVerfiy, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};
