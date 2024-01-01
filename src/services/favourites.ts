import {Axios} from '../lib/Axios';
import {ApiEndPoints} from './ApiEndPoints';
import {Favourites} from './types';

export const favourites = async (userToken: string | null) => {
  const response = await Axios.get(ApiEndPoints.favourites, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data = response.data.data;

  return data.map((item: any): Favourites => {
    return {
      id: item.id,
      itemId: item.item_id,
      itemName: item.item_name,
      itemPrice: item.item_price,
      userId: item.user_id,
      userName: item.user_name,
      image: item.item_images,
      symbol: item.symbol,
    };
  });
};
