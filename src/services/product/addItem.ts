import { Axios } from '../../lib/Axios';
import { ApiEndPoints } from '../ApiEndPoints';
import { AddItem } from '../types';

export const addItem = async (
  options: AddItem,
  userToken: any,
): Promise<boolean> => {
  const formData = new FormData();
  formData.append('add_title', options.title);
  formData.append('set_a_price', options.price);
  formData.append('category_id', options.categoryId);
  formData.append('subcategory_id', options.subCategoryId);
  formData.append('description', options.description);
  formData.append('location', options.location);
  // formData.append('brand_id', options.cars?.brand);
  {options.brandId?
    formData.append('brand_id', options.brandId)
    :
    formData.append('brand_id', '')
  }
  formData.append('no_of_owners', options.cars?.noOfOwner);
  formData.append('created_by', null);
  formData.append('created_type', null);
  formData.append('user_name', null);
  formData.append('furnishing', options.properties?.furnishing);
  formData.append('listed_by', options.properties?.listedBy);
  formData.append('super_bueltp_area', options.properties?.superArea);
  formData.append('corpet_area', options.properties?.carpetArea);
  formData.append('maintenance', options.properties?.maintainance);
  formData.append('car_parking', options.properties?.carParking);
  formData.append('washrooms', options.properties?.bathrooms);
  formData.append('project_name', null);
  formData.append('length', null);
  formData.append('breadth', null);
  formData.append('facing', options.properties?.facing);
  formData.append('apartmenttype', null);
  formData.append('bedrooms', options.properties?.bedrooms);
  formData.append('total_floors', options.properties?.totalFloors);
  formData.append('bathroom', options.properties?.bathrooms);
  formData.append('floor_no', options.properties?.floorNo);
  formData.append('bachlors_allowed', null);
  formData.append(
    'construction_status',
    options.properties?.constructionStatus,
  );
  formData.append('subtype', null);
  formData.append('meals_included', null);
  formData.append('fuel', options.cars?.fuel);
  formData.append('transmission', options.cars?.transmission);

  //year

  if (options.bikes?.year == '' || options.bikes?.year == undefined || options.bikes?.year == null && options.commercial?.year == '' || options.commercial?.year == null || options.commercial?.year == undefined) {
    formData.append('year', options.cars?.year);
  } else if (options.bikes?.year == '' || options.bikes?.year == undefined || options.bikes?.year == null && options.cars?.year == '' || options.cars?.year == null || options.cars?.year == undefined) {
    formData.append('year', options.commercial?.year);
  } else if (options.commercial?.year == '' || options.commercial?.year == undefined || options.commercial?.year == null && options.cars?.year == '' || options.cars?.year == null || options.cars?.year == undefined) {
    formData.append('year', options.bikes?.year);
  } else {
    formData.append('year', '');
  }

  // Km driven
  if (options.bikes?.kmDriven == '' ||  options.bikes?.kmDriven == undefined  || options.bikes?.kmDriven == null && options.commercial?.kmDriven == '' || options.commercial?.kmDriven == undefined || options.commercial?.kmDriven == null) {
    formData.append('km_driven', options.cars?.kmDriven);
  } else if (options.bikes?.kmDriven == '' || options.bikes?.kmDriven == undefined || options.bikes?.kmDriven == null && options.cars?.kmDriven == '' || options.cars?.kmDriven == undefined || options.cars?.kmDriven == null) {
    formData.append('km_driven', options.commercial?.kmDriven);
  } else if (
    options.commercial?.kmDriven == '' || options.commercial?.kmDriven == undefined || options.commercial?.kmDriven == null &&
    options.cars?.kmDriven == '' || options.cars?.kmDriven == undefined || options.cars?.kmDriven == null
  ) {
    formData.append('km_driven', options.bikes?.kmDriven);
  } else {
    formData.append('km_driven', '');
  }

  // location
  if (
    options.stateId == undefined &&
    options.cityId == undefined &&
    options.localityId == undefined
  ) {
    formData.append('latitude', options.lat);
    formData.append('longitude', options.long);
    formData.append('state_id', '');
    formData.append('district_id', '');
    formData.append('city_id', '');
  } else {
    formData.append('latitude', '');
    formData.append('longitude', '');
    formData.append('state_id', options.stateId);
    formData.append('district_id', options.cityId);
    formData.append('city_id', options.localityId);
  }

  options.image.forEach((img, index) => {
    formData.append(`photo[${index}]`, img);
    // if (img.type) {
    // } else {
    //     formData.append(`old_photo[${index}]`, img.uri);
    // }
  });


  const response = await Axios.post(ApiEndPoints.addItem, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userToken}`,
    },
  });

  return true;
};
