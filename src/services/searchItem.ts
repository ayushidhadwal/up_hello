import {Axios} from '../lib/Axios';
import {Search} from '../screens/Home/ItemCategoryScreen';
import {ApiEndPoints} from './ApiEndPoints';
import {SearchItems} from './types';

export const searchItem = async (
  options: Search,
  userToken: string | null,
): Promise<SearchItems> => {
  const body = {
    search: options.search,
    brand_id: options.brandsArray.join(','),
    category_id: options.categoryId,
    subcatgory_id: options.subCategoryId,
    price_min: options.minAmount,
    price_max: options.maxAmount,
    state_id: '',
    district_id: '',
    city_id: '',
    lat: '',
    long: '',
  };

  if (
    options.lat == null &&
    options.long == null &&
    options.stateId !== undefined &&
    options.cityId !== undefined &&
    options.localityId !== undefined
  ) {
    (body.state_id = options.stateId),
      (body.district_id = options.cityId),
      (body.city_id = options.localityId);
  } else if (
    options.stateId == undefined &&
    options.cityId == undefined &&
    options.localityId == undefined &&
    options.lat !== null &&
    options.long !== null
  ) {
    (body.lat = String(options.lat)), (body.long = String(options.long));
  }

  const response = await Axios.get(ApiEndPoints.search, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: body,
  });

  const data = response.data.data;

  return data.map((item: any): SearchItems => {
    return {
      categoryNameEn: '',
      id: item.id,
      brandId: item.brand_id,
      brandName: item.brand_name,
      categoryId: item.category_id,
      categoryName: item.category_name,
      cityId: item.city_id,
      cityName: item.city_name,
      description: item.description,
      discount: item.discount,
      districtId: item.district_id,
      districtName: item.district_name,
      location: item.location,
      name: item.add_title,
      photo: item.item_images,
      price: item.set_a_price,
      stateId: item.state_id,
      stateName: item.state_name,
      subcategoryId: item.subcategory_id,
      subCategoryName: item.sub_category_id,
      favorite: item.favorite,
      featuredPackage: item.package,
      currency:item.symbol
    };
  });
};
