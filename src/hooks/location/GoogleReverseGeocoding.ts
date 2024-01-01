import axios from 'axios';
import { GoogleAddressCoords, GoogleAddress } from '../types';
import { ApiEndPoints, GOOGLE_API_URL } from '../../services/ApiEndPoints';
import Config from '../../config';

export const GoogleReverseGeocoding = async ({
  latitude,
  longitude,
}: GoogleAddressCoords): Promise<GoogleAddress> => {
  const response = await axios.get(
    GOOGLE_API_URL + ApiEndPoints.GoogleMaps.Geocoding,
    {
      params: {
        key: Config.GOOGLE_MAPS_KEY,
        latlng: `${latitude},${longitude}`,
      },
    },
  );



  const { results } = response.data;
  const [n] = results;


  if (results && results?.length > 0) {
    const [result] = results;

    const address = result?.address_components?.find((item: any) => {
      return !!item.types?.find((type: string) => type === 'country')
    })

    const {
      place_id: id,
      formatted_address: formattedAddress,
      address_components,
    } = result;

    // console.log(result.formatted_address,"current");

    // const res = address_components.find((component: any) => {
    //   return component.types.find((type: any) => type === 'country');
    // });

    // if (res?.short_name !== 'NZ') {
    //   throw new Error(
    //     'Sorry! Service is not available in your country/region.',
    //   );
    // }

    let name = '';
    let description = '';

    if (address_components && address_components?.length > 0) {
      address_components?.forEach((addressComponent: any, index: number) => {
        if (index <= 1) {
          name = name
            ? `${name}, ${addressComponent?.short_name}`
            : addressComponent?.short_name;
        } else {
          description = description
            ? `${description}, ${addressComponent?.short_name}`
            : addressComponent?.short_name;
        }
      });
    }

    return {
      id,
      name,
      description,
      formattedAddress,
      country: address?.long_name as string
    };
  } else {
    throw new Error('Google Geocoding: Failed to fetch address!');
  }
};
