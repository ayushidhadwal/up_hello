import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListingScreen from '../screens/ListingScreen';
import AddReel from '../screens/Reel/AddReel';
import { SellTopBarParamList } from './types';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator<SellTopBarParamList>();


const SellNavigation = () => {

  const {t} = useTranslation()

  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: {backgroundColor: 'red'},
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}
    >
        <Tab.Screen options={{title:t('Sell Items')}} name="sellItem" component={ListingScreen} />
        <Tab.Screen options={{title:t('Add Video')}} name="addReel" component={AddReel} />
    </Tab.Navigator>
  )
}

export default SellNavigation