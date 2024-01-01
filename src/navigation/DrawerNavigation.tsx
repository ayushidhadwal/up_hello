import React, {FC, useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParamList} from './types';
import RootStackNavigation from './RootStackNavigation';
import CustomSideMenu from '../screens/Home/components/CustomSideMenu';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import ProfileStack from './ProfileStack';
import {AuthContext} from '../context/auth';
import {useTranslation} from 'react-i18next';
import PackagesStack from './PackagesStack';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation: FC = ({}) => {
  const {t} = useTranslation();

  const {userToken} = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSideMenu {...props} />}
      screenOptions={{headerShown: false, swipeEnabled: false}}>
      <Drawer.Screen
        options={{
          title: t('Home'),
          drawerLabelStyle: {
            fontSize: 18,
            color: 'black',
          },

          drawerIcon: ({size, color}) => (
            <Octicons name="home" size={30} color={'#ffe4e1'} />
          ),
        }}
        name="Home"
        component={RootStackNavigation}
      />

      {userToken && (
        <>
          <Drawer.Screen
            options={() => {
              return {
                title: t('View & Edit Profile'),
                drawerLabelStyle: {
                  fontSize: 18,
                  color: 'black',
                },
                headerStyle: {backgroundColor: '#fff'},
                drawerIcon: ({size, color}) => (
                  <AntDesign name="user" size={30} color={'#ffe4e1'} />
                ),
              };
            }}
            name="ProfileStack"
            component={ProfileStack}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
