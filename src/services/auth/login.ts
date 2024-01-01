import {Axios} from '../../lib/Axios';
import {getNotificationToken} from '../../lib/Notifee';
import {ApiEndPoints} from '../ApiEndPoints';
import {LoginFormValues} from './types';

type ReturnObject = {
  token: string;
  id: number;
};

export const login = async (
  email: string,
  password: string,
): Promise<ReturnObject> => {
  const formData = new FormData();

  const tokens = await getNotificationToken();

  formData.append('email', email);
  formData.append('password', password);
  formData.append('token', tokens);

  const response = await Axios.post(ApiEndPoints.auth.login, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const token = response.data.data.token;
  const id = response.data.data.user.id;

  return {token, id};
};
