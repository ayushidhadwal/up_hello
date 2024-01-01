import { View, Text } from 'native-base';
import React, { useContext, useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LocationContext } from '../context/location';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../config';
import { LangContext } from '../context/lang';

const GoogleMapSearchScreen = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigation<RootNavigationProps>();

  const { setLocationDescription, setCoordinates } = useContext(LocationContext);
  const { setCountries, updateIsUsingLocation } = useContext(LangContext);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const onPress = async (data: any, details: any) => {
    setCountries(data.terms[data.terms.length - 1].value, 0);
    setLocationDescription(data.description);
    navigation.navigate('BottomTabs', { screen: 'Homescreen' });
    updateIsUsingLocation(true);
    // await AsyncStorage.setItem(Config.LocationScreenKey,'1')
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
          key: 'AIzaSyAZLjsxQX39mjxXMIs60fqD7LiJXR4Rogo',
          language: 'en',
        }}
      />
    </View>
  );
};

export default GoogleMapSearchScreen;
