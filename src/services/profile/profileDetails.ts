import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';
import {Profile} from '../types';

export const profileDetails = async (
  userToken: string | null,
): Promise<Profile> => {
  const response = await Axios.get(ApiEndPoints.profileDetails, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data = response.data.data.data;

  return {
    id: data.id,
    email: data.email,
    username: data.username,
    address: data.address,
    profileImage: data.profile_image,
    phoneNumber: data.phone_number,
    linkStatus: response.data.data.link_status,
    code: data.country,
    description: data.short_description,
  };
};
