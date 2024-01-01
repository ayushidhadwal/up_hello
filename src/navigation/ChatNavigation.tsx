import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BuyingScreen from '../screens/Message/BuyingScreen';
import SellingScreen from '../screens/Message/SellingScreen';
import { ChatStackParamList } from './types';
import { useTranslation } from 'react-i18next';


const Tab = createMaterialTopTabNavigator<ChatStackParamList>();


const ChatNavigation = () => {

  const {t} = useTranslation()
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
      },
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'black',
      tabBarIndicatorStyle: { backgroundColor: 'red' },
      tabBarLabelStyle: {
        fontSize: 16,
      },
    }} >
      <Tab.Screen options={{ tabBarLabel: t('Buying') }} name="buying" component={BuyingScreen} />
      <Tab.Screen options={{ tabBarLabel: t('Selling') }} name="selling" component={SellingScreen} />
    </Tab.Navigator>
  )
}

export default ChatNavigation