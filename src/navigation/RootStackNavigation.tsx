import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerNavigationProps, RootStackParamsList} from './types';
import BottomNavigator from './BottomTabNavigation';
import FavouritesScreen from '../screens/FavouritesScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ItemScreen from '../screens/Home/ItemScreen';
import MessageScreen from '../screens/Message/MessageScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ChatScreen from '../screens/chat/ChatScreen';
import {Text} from 'native-base';
import CategoriesScreen from '../screens/Home/CategoriesScreen';
import Searchscreen from '../screens/Home/Searchscreen';
import LocationScreen from '../screens/Home/LocationScreen';
import AuthStackNavigation from './AuthStackNavigation';
import GetStarted from '../screens/Welcome/GetStartedScreen';
import SubCategoryScreen from '../screens/Home/components/SubCategoryScreen';
import ItemCategoryScreen from '../screens/Home/ItemCategoryScreen';
import SellerAccount from '../screens/Home/SellerAccount';
import CityListScreen from '../screens/Home/locationComponent/CityListScreen';
import LocalityListScreen from '../screens/Home/locationComponent/LocalityListScreen';
import MyAdsDetials from '../screens/Add/MyAdsDetials';
import MyReelDetailScreen from '../screens/Reel/MyReelDetailScreen';
import EditAdsScreen from '../screens/myads/EditAdsScreen';
import AddSubCategory from '../screens/Add/AddSubCategory';
import AddDescription from '../screens/Add/AddDescription';
import AddImages from '../screens/Add/AddImages';
import AddPrice from '../screens/Add/AddPrice';
import AddLocation from '../screens/Add/AddLocation';
import AddPost from '../screens/Add/AddPost';
import AddStateScreen from '../screens/Add/AddStateScreen';
import AddCityScreen from '../screens/Add/AddCityScreen';
import AddLocalityScreen from '../screens/Add/AddLocalityScreen';
import GoogleMapSearchScreen from '../screens/GoogleMapSearchScreen';
import AddGoogleApiScreen from '../screens/Add/AddGoogleApiScreen';
import Config from '../config';
import {registerNotification} from '../lib/Notifee';
import MoreCategoriesScreen from '../screens/Add/MoreCategoriesScreen';
import {useTranslation} from 'react-i18next';
import CarForm from '../screens/forms/car/CarForm';
import MobileForm from '../screens/forms/Mobile/MobileForm';
import BikeForm from '../screens/forms/bike/BikeForm';
import PropertyForm from '../screens/forms/properties/PropertyForm';
import DefaultForm from '../screens/forms/DefaultForm';
import commercial_vechicles from '../screens/forms/commercial/CommercialVechicles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../Common/Loader';
import ChooseLocationScreen from '../screens/ChooseLocationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import i18n from '../i18n';
import { View } from 'react-native';
import {Linking} from 'react-native'


const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootStackNavigation = () => {
  const navigation = useNavigation<DrawerNavigationProps>();

  const {t} = useTranslation();

  const [isKey, setKey] = useState<number | undefined>();
  const [locationKey, setLocationKey] = useState<string | null>(null);

  //storing key in async storage so the get started screen will be shown only once

  const [splashLoading, setSplashLoading] = useState(false);
  const locale = i18n.language;

  useEffect(() => {
    (async () => {
      setSplashLoading(true);
      const key = await AsyncStorage.getItem(Config.GetStartedKey);
      const locKey = await AsyncStorage.getItem(Config.LocationScreenKey);
      setLocationKey(locKey);
      setKey(Number(key));
      setSplashLoading(false);
    })();

    registerNotification();
  }, []);

  if (splashLoading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isKey !== 1 && <Stack.Screen name="GetStarted" component={GetStarted} />}

      {locationKey !== '1' && (
        <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} />
      )}

      <Stack.Screen name="BottomTabs" component={BottomNavigator} />
      <Stack.Screen name="AuthStack" component={AuthStackNavigation} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
        }}
        name="Favourites"
        component={FavouritesScreen}
      />
      <Stack.Screen
        options={({route}) => ({
          headerTitle: () => (
            // <Text bold fontSize={'lg'} textTransform={'capitalize'}>{route.params.}</Text>,
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {locale === 'en' && route.params.item.categoryNameEn}
              {locale === 'hn' && route.params.item.categoryNameHn}
              {locale === 'bn' && route.params.item.categoryNameBn}
              {locale === 'ar' && route.params.item.categoryNameAr}
            </Text>
          ),
          headerShown: true,
        })}
        name="SubCategory"
        component={SubCategoryScreen}
      />
      <Stack.Screen
        options={({route}) => ({
          headerTitle: () => (
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {t('Choose a category')}
            </Text>
          ),
          headerShown: true,
        })}
        name="Morecategories"
        component={MoreCategoriesScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: t('Notification'),
        }}
        name="Notification"
        component={NotificationScreen}
      />
      <Stack.Screen
        name="GoogleMapSearchScreen"
        component={GoogleMapSearchScreen}
      />
      <Stack.Screen name="AddGoogleApiScreen" component={AddGoogleApiScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: t('Edit'),
        }}
        name="EditAds"
        component={EditAdsScreen}
      />

      <Stack.Screen name="ItemCategory" component={ItemCategoryScreen} />

      <Stack.Screen name="MyAdsDetails" component={MyAdsDetials} />
      <Stack.Screen name="SellerAccount" component={SellerAccount} />
      <Stack.Screen name="Itemscreen" component={ItemScreen} />

      <Stack.Screen name="Searchscreen" component={Searchscreen} />

      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: true,
          title: t('Location'),
        }}
        name="Locationscreen"
        component={LocationScreen}
      />

      {/* Add screens  */}
      <Stack.Screen
        name="AddSubCategory"
        component={AddSubCategory}
        options={({route}) => ({
          headerTitle: () => (
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {route.params.name}
            </Text>
          ),
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="AddDescription"
        component={AddDescription}
        options={{
          headerShown: true,
          headerTitle: t('Include some details'),
        }}
      />

      <Stack.Screen
        name="AddStateScreen"
        component={AddStateScreen}
        options={{
          headerShown: true,
          headerTitle: t('Location'),
        }}
      />

      <Stack.Screen
        name="AddCityScreen"
        component={AddCityScreen}
        options={({route}) => ({
          headerTitle: () => (
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {route.params.name}
            </Text>
          ),
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="AddLocalityScreen"
        component={AddLocalityScreen}
        options={({route}) => ({
          headerTitle: () => (
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {route.params.cityName}
            </Text>
          ),
          headerShown: true,
        })}
      />

      <Stack.Screen
        name="AddImages"
        component={AddImages}
        options={{
          headerShown: true,
          headerTitle: t('Upload your photos'),
        }}
      />
      <Stack.Screen
        name="AddPrice"
        component={AddPrice}
        options={{
          headerShown: true,
          headerTitle: t('Set a price'),
        }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocation}
        options={{
          headerShown: true,
          headerTitle: t('Confirm your location'),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: true,
          headerTitle: t('Review your Details'),
        }}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: t('Categories'),
        }}
        name="CategoriesScreen"
        component={CategoriesScreen}
      />
      <Stack.Screen name="MyReelsDetail" component={MyReelDetailScreen} />
      <Stack.Screen
        name="Chat"
        options={({route}) => ({
          headerShown: true,
          headerShadowVisible: true,
          headerTitle: () =>
            route.params.sellerName === null || '' ? (
              <Text bold fontSize={'lg'} textTransform={'capitalize'}>
                User
              </Text>
            ) : (
              <Text bold fontSize={'lg'} textTransform={'capitalize'}>
                {route.params.sellerName}
              </Text>
            ),
            headerRight: () => (
              <View>
              <Ionicons onPress={() => { 
                Linking.openURL(`tel:${route.params.phoneNumber}`)
               }} color={'red'} name="call-sharp" size={24} />
              {/* <Text>dfklj</Text> */}
            </View>
            ),
        })}
        component={ChatScreen}
      />
      <Stack.Screen
        name="city"
        options={({route}) => ({
          headerShown: true,
          headerShadowVisible: true,
          headerTitle: () => (
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {route.params.name}
            </Text>
          ),
        })}
        component={CityListScreen}
      />
      <Stack.Screen
        name="locality"
        options={({route}) => ({
          headerShown: true,
          headerShadowVisible: true,
          headerTitle: () => (
            <Text bold fontSize={'lg'} textTransform={'capitalize'}>
              {route.params.cityName}
            </Text>
          ),
        })}
        component={LocalityListScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Message',
          headerShadowVisible: true,
          headerStyle: {backgroundColor: '#fff'},
          headerLeft: () => (
            <Entypo
              onPress={() => {
                navigation.toggleDrawer();
              }}
              size={30}
              color={'red'}
              name="menu"
            />
          ),

          headerTitleStyle: {fontSize: 20},
        }}
        name="Message"
        component={MessageScreen}
      />

      {/* Forms */}
      <Stack.Screen
        name="CarForm"
        options={{
          headerShown: true,
          headerTitle: t('Include some details'),
        }}
        component={CarForm}
      />

      <Stack.Screen
        name="MobileForm"
        options={{
          headerShown: true,
          headerTitle: t('Include some details'),
        }}
        component={MobileForm}
      />
      <Stack.Screen
        name="BikeForm"
        options={{
          headerShown: true,
          headerTitle: t('Include some details'),
        }}
        component={BikeForm}
      />
      <Stack.Screen
        name="PropertyForm"
        options={{
          headerShown: true,
          headerTitle: t('Include some details'),
        }}
        component={PropertyForm}
      />

      <Stack.Screen
        name="DefaultForm"
        options={{
          headerShown: true,
          headerTitle: t('Include some details'),
        }}
        component={DefaultForm}
      />

      <Stack.Screen
        name="CommercialVehicle"
        options={{
          headerShown: true,
          headerTitle: t('Include some details'),
        }}
        component={commercial_vechicles}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
