import { Axios } from '../lib/Axios';
import { ApiEndPoints } from './ApiEndPoints';
import { Brand } from './types';

export const brand = async (userToken: string | null, categoryId: string, subCategoryId: string): Promise<Brand[]> => {

  const formData = new FormData();



  formData.append('category_id', categoryId);
  formData.append('sub_category', subCategoryId);


  const response = await Axios.post(ApiEndPoints.getbrands,formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const data = response.data.data;


  return data.map((item: any): Brand => {
    return {
      id: item.id,
      brandName: item.brand_name,
      brandNamehn: item.hi,
      brandNamebn: item.bn,
      brandNamear: item.ar,
    };
  });
};
