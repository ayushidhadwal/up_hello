import { Box, View, Divider, HStack, Text, Pressable, VStack, Button } from 'native-base'
import React, { useContext, useEffect, useRef, useState } from 'react'
import StateList from './locationComponent/StateList'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Geolocation from '@react-native-community/geolocation'
import { GoogleReverseGeocoding } from '../../hooks/location/GoogleReverseGeocoding'
import { LocationContext } from '../../context/location'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProps } from '../../navigation/types'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useGetState } from '../../hooks/location/useGetState'
import { Loader } from '../../Common/Loader'
import { useTranslation } from 'react-i18next'
import AndroidOpenSettings from 'react-native-android-open-settings'
import { AppState } from 'react-native'
import { LangContext } from '../../context/lang'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../config";




const LocationScreen = () => {

  const { t } = useTranslation()

  const navigation = useNavigation<RootNavigationProps>()


  const [location, setLocation] = useState('')

  const { setLocationDescription, setCoordinates } = useContext(LocationContext)

  const { country, setCountries, isUsingLocation, updateIsUsingLocation } = useContext(LangContext)


  const [lat, setLat] = useState<any>()

  const [long, setLong] = useState<any>()


  const appState = useRef(AppState.currentState);


  const [checkLocation, setCheckLocation] = useState(false);

  const [locationLoading, setLocationLoading] = useState(true)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {

        getLocation();

      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);


  const getLocation = async () => {
    setLocationLoading(true)
    Geolocation.getCurrentPosition(async info => {

      const result = await GoogleReverseGeocoding({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      })
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
      setLocation(result.description);

      // set country
      setCountries(result.country, 0)
      // result.country

      setCheckLocation(true);
      setLocationLoading(false);

    }, (error) => {
      console.log(error)
      setCheckLocation(false);
      setLocationLoading(false);
    })
  }
  useEffect(() => {
    if (isUsingLocation) {
      getLocation();
    }
  }, [isUsingLocation])

  const onPressCurrentLoc = async () => {
    setLocationDescription(location)
    setCoordinates(lat, long);
    // await AsyncStorage.setItem(Config.LocationScreenKey,'1')
    navigation.navigate('BottomTabs', { screen: 'Homescreen' });
  }


  const { loading } = useGetState();

  const getLocationState = () => {
    if (!isUsingLocation) {
      return <Pressable onPress={() => {
        updateIsUsingLocation(true)
        // AndroidOpenSettings.locationSourceSettings()
      }} w={'40%'} bg={'blue.400'} color={'white'} alignItems={'center'} p={0.5} rounded={10}><Text
        color={'white'}>{t("Enable Location")}</Text></Pressable>
    }

    if (locationLoading) {
      return <Text color={'silver'}>{t("Fetching location")}...</Text>
    } else {
      if (checkLocation) {
        return <Text numberOfLines={2} style={{ width: 320 }}>{location}</Text>
      } else {
        return <Pressable onPress={() => {
          // updateIsUsingLocation(true)
          AndroidOpenSettings.locationSourceSettings()
        }} w={'40%'} bg={'blue.400'} color={'white'} alignItems={'center'} p={0.5} rounded={10}><Text
          color={'white'}>{t("Enable Location")}</Text></Pressable>
      }
    }
  }

  if (loading) {
    return <Loader />
  }



  return (
    <View flex={1} backgroundColor={'#fff'}>
      <HStack alignItems={'center'} mt={2} p={2} space={6} borderBottomWidth={1} borderColor={'silver'}>
        <Ionicons onPress={() => { navigation.navigate('BottomTabs', { screen: 'Homescreen' }) }} name="arrow-back" size={30} />
        <Text color={'black'} fontSize={20}>{t('Location')}</Text>
      </HStack>
      <Pressable onPress={() => { navigation.navigate('GoogleMapSearchScreen') }}>
        <HStack borderColor={'silver'} my={3} h={10} mx={4} borderRadius={10} alignItems={'center'} borderWidth={1} px={2} space={2}>
          <AntDesign
            style={{ paddingLeft: 1 }}
            color={'silver'}
            name="search1"
            size={24}
          />
          <Text numberOfLines={1} fontWeight={'normal'} color={'silver'} fontSize={'16'}>
            {t("search")}...
          </Text>
        </HStack>
      </Pressable>

      <Box >
        <Pressable onPress={location == "" ? () => { } : onPressCurrentLoc} mb={3} >

          <HStack  >
            <HStack justifyContent={'center'} alignItems={'center'} flex={1}>
              <Box mx={2}>
                <MaterialIcons color={'#1d4ed8'} name="my-location" size={28} />
              </Box>
              <VStack pr={2} flex={1} >
                <Text fontSize={'lg'} color={'#1d4ed8'} bold>{t("Use Current Location")}</Text>

                {getLocationState()}

              </VStack>
            </HStack>
          </HStack>
        </Pressable>
        {country == 'India' &&
          <>
            <Divider alignSelf={'center'} w={'92%'} />
            <StateList />
          </>
        }
      </Box>

    </View >
  )
}

export default LocationScreen
