import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AdsList from '../screens/Add/AdsList';
import FavouritesScreen from '../screens/FavouritesScreen';
import MyReels from '../screens/Reel/MyReels';
import { AdsTopBarParamList } from './types';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';



const Tab = createMaterialTopTabNavigator<AdsTopBarParamList>();

const TopBarNavigation = () => {

  const { t } = useTranslation();


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
        },

        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: { backgroundColor: 'red' },
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: t("Ads")
        }}
        name="ads"
        component={AdsList}
      />

      <Tab.Screen
        options={{
          tabBarLabel: t("My Videos")
        }}
        name="Videos"
        component={MyReels}
      />

      <Tab.Screen
        options={{
          tabBarLabel: t("Favourites")
        }}
        name="favourite"
        component={FavouritesScreen}
      />

    </Tab.Navigator>
  );
};

export default TopBarNavigation;
