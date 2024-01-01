import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';
import {CityType} from '../types';

export const cities = async (id: number) => {
  const response = await Axios.get(`${ApiEndPoints.location.getCity}/${id}`);

  const data = response.data.data;

  return data.map((item: any): CityType => {
    return {
      id: item.id,
      cityName: item.district_title,
    };
  });
};
