import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';
import {GetCategory} from '../types';

export const getCategories = async (): Promise<GetCategory[]> => {
  const response = await Axios.get(ApiEndPoints.categories.getCategory);

  const data = response.data.data;

  return data.map((item: any): GetCategory => {
    return {
      id: item.id,
      brandId: item.brand_id,
      categoryNameEn: item.category_name,
      categoryNameHn: item.hi,
      categoryNameBn: item.ba,
      categoryNameAr: item.ar,
      categoryIcon: item.category_icon,
      categoryCover: item.category_cover,
    };
  });
};
