import {Axios} from '../../lib/Axios';
import {FormikValues} from '../../screens/ListingScreen';
import {ApiEndPoints} from '../ApiEndPoints';
import {AddItem, EditItem} from '../types';

export const editItem = async (options: AddItem, userToken: any, id: any) => {
  const formData = new FormData();

  formData.append('item_id', id);
  formData.append('add_title', options.title);
  formData.append('set_a_price', options.price);
  formData.append('category_id', options.categoryId);
  formData.append('subcategory_id', options.subCategoryId);
  formData.append('description', options.description);
  formData.append('location', options.location);
  // formData.append('brand_id', options.cars?.brand);
  formData.append('brand_id', 1);
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
  if (options.bikes?.year == '' && options.commercial?.year == '') {
    formData.append('year', options.cars?.year);
  } else if (options.bikes?.year == '' && options.cars?.year == '') {
    formData.append('year', options.commercial?.year);
  } else if (options.commercial?.year == '' && options.cars?.year == '') {
    formData.append('year', options.bikes?.year);
  } else {
    formData.append('year', '');
  }

  // Km driven
  if (options.bikes?.kmDriven == '' && options.commercial?.kmDriven == '') {
    formData.append('km_driven', options.cars?.kmDriven);
  } else if (options.bikes?.kmDriven == '' && options.cars?.kmDriven == '') {
    formData.append('km_driven', options.commercial?.kmDriven);
  } else if (
    options.commercial?.kmDriven == '' &&
    options.cars?.kmDriven == ''
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
    if (img.type) {
      formData.append(`photo[${index}]`, img);
    } else {
      formData.append(`old_photo[${index}]`, img.uri);
    }
  });

  const response = await Axios.post(ApiEndPoints.editItem, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userToken}`,
    },
  });

  return true;
};
