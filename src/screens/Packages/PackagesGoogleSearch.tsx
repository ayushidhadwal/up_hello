import {View} from 'native-base';
import React, {FC, useContext, useEffect, useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { LangContext } from '../../context/lang';
import { LocationContext } from '../../context/location';
import { AuthContext } from '../../context/auth';
import { PackagesStackScreenProps } from '../../navigation/types';
import Config from '../../config';

type Props = PackagesStackScreenProps<'PackageGoogleSearchScreen'>

const PackagesGoogleSearch:FC<Props> = ({navigation}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {PackageSubCategory} = useContext(AuthContext)


  const {setLocationDescription, setCoordinates} = useContext(LocationContext);
  const {setCountries} = useContext(LangContext);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const onPress = async (data: any, details: any) => {
    setCountries(data.terms[data.terms.length - 1].value,0);
    setLocationDescription(data.description);

    navigation.navigate('BuyPackages',{subCategory:PackageSubCategory})
    setCoordinates(
      details?.geometry?.location.lat,
      details?.geometry?.location.lng,
    );
  };

  return (
    <View flex={1} bg={'white'}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        textInputProps={
          {
            // placeholderTextColor: '#32a852',
            // returnKeyType: "search"
          }
        }
        minLength={2}
        placeholder="Search..."
        onPress={onPress}
        ref={inputRef}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            width: '90%',
            alignSelf: 'center',
            marginTop: 12,
            borderColor: 'silver',
            borderRadius: 6,
          },
        }}
        query={{
          key: Config.GOOGLE_MAPS_KEY,
          language: 'en',
        }}
      />
    </View>
  );
};

export default PackagesGoogleSearch;
