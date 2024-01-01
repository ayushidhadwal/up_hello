import React, { useContext } from 'react';
import Homescreen from '../screens/Home/Homescreen';
import ReelScreen from '../screens/Reel/ReelScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList, RootNavigationProps } from './types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth';
import MyAds from '../screens/myads/MyAds';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MessageScreen from '../screens/Message/MessageScreen';
import AddScreen from '../screens/Add/AddScreen';
import CustomBottomNavigationBar from './CustomBottomNavigationBar';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<BottomTabsParamList>();



const BottomNavigator = () => {

  const navigation = useNavigation<RootNavigationProps>()

  const { userToken } = useContext(AuthContext)

  const {t} = useTranslation()



  return (
    <Tab.Navigator
      initialRouteName="Homescreen"
      tabBar={props => <CustomBottomNavigationBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 50
        }
      }}>
      <Tab.Screen
        options={{
          title: t('Home'),
          tabBarIcon: tabInfo => (
            <AntDesign name="home" size={26} color={tabInfo.color} />
          ),
        }}
        component={Homescreen}
        name="Homescreen"
      />

      <Tab.Screen
        options={{
          title: t('chats'),
          tabBarIcon: tabInfo => (
            <Ionicons name="chatbubble-outline" size={26} color={tabInfo.color} />
          ),
        }}
        component={MessageScreen}
        name="message"
      />

      <Tab.Screen
        options={{
          title: t('Sell'),
          tabBarIcon: tabInfo => (
            <AntDesign style={{ marginBottom: 1 }} name="pluscircleo" size={32} color={tabInfo.color} />
          ),
        }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            if (!userToken) {
              e.preventDefault();
              navigation.navigate('AuthStack')
            }
          },
        }}
        component={AddScreen}
        name="AddScreen"
      />


      <Tab.Screen
        options={{
          title: t('Videos'),
          tabBarIcon: tabInfo => (
            <Feather name="play" size={26} color={tabInfo.color} />
          ),
        }}
        component={ReelScreen}
        name="Reelscreen"
      />


      <Tab.Screen
        options={{
          title: t('My Ads'),
          tabBarIcon: tabInfo => (
            <AntDesign style={{ marginBottom: 20 }} name="hearto" size={2} color={tabInfo.color} />
          ),
        }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            if (!userToken) {
              e.preventDefault();
              navigation.navigate('AuthStack')
            }
          },
        }}
        component={MyAds}
        name="myAds"
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
