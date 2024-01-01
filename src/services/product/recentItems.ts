import {RecentItems} from '../../hooks/types';
import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';

export const recentItems = async (
  userToken: string | null,
  country: string,
) => {
  const response = await Axios.get(ApiEndPoints.recentItems, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data = response.data.data;

  return data.map((item: any): RecentItems => {
    return {
      id: item.id,
      itemName: item.add_title,
      price: item.set_a_price,
      brandName: item.brand_name,
      location: item.location,
      images: item.item_images,
      description: item.description,
      favorite: item.favorite,
      stateName: item.state_name,
      districtName: item.district_name,
      cityName: item.city_name,
      cState: item.c_state,
      cCity: item.c_get_city,
      cNeighbourhood: item.c_get_Neighbourhood,
      calcPrice: item.c_value,
      symbol: item.c_symbol,
      featuredPackage: item.package,
    };
  });
};
