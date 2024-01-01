import {Axios} from '../../lib/Axios';
import {ApiEndPoints} from '../ApiEndPoints';
import {SubCategory} from '../types';

export const getSubCategories = async (id: number): Promise<SubCategory[]> => {
  const response = await Axios.post(ApiEndPoints.categories.subCategory, {
    category_id: id,
  });
  const data = response.data.data;
  return data.map((item: any): SubCategory => {
    return {
      id: item.id,
      categoryId: item.category_id,
      subCategoryNameEn: item.sub_category_name,
      subCategoryNameHn: item.hi,
      subCategoryNameBn: item.ba,
      subCategoryNameAr: item.ar,
      subCategoryIcon: item.sub_category_icon,
      subCategoryPhoto: item.sub_category_photo,
      formType: item.form_type,
    };
  });
};
