import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {OrdersTopBarParamList} from './types';
import {useTranslation} from 'react-i18next';
import ActiveOrderScreen from '../screens/orders/ActiveOrderScreen';
import ScheduledOrderScreen from '../screens/orders/ScheduledOrderScreen';
import ExpiredOrderScreen from '../screens/orders/ExpiredOrderScreen';

const Tab = createMaterialTopTabNavigator<OrdersTopBarParamList>();

const TopOrderNavigation = () => {
  const {t} = useTranslation();

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
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Active',
        }}
        name="Active"
        component={ActiveOrderScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Scheduled',
        }}
        name="Scheduled"
        component={ScheduledOrderScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Expired',
        }}
        name="Expired"
        component={ExpiredOrderScreen}
      />
    </Tab.Navigator>
  );
};

export default TopOrderNavigation;
