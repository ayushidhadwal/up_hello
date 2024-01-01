import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';

export const forgotPassword = async (email: string) => {
  const response = await Axios.post(ApiEndPoints.auth.forgotPassword, {
    email: email,
  });

  const otp = response.data.data.OTP;

  return otp;
};
