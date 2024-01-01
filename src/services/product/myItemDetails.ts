import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';

export const myItemDetails = async (
  id: number,
  userToken: string | null,
): Promise<any> => {
  // console.log(id)
  const response = await Axios.get(`${ApiEndPoints.myItemDetails}/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });


  // console.log(response.data,"data")

  const data = response.data.data;

  return data;
};
