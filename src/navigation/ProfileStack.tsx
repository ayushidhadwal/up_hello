import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settingscreen from '../screens/settings/Settingscreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import EditProfileScreen from '../screens/Profile/EditProfileScreen'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HelpScreen from '../screens/HelpScreen'
import { ProfileStackParamList } from './types'
import ContactUs from '../screens/ContactUs'
import { useTranslation } from 'react-i18next'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'

const ProfileStack = () => {

    const Stack = createNativeStackNavigator<ProfileStackParamList>();

    const { t } = useTranslation();

    return (
        <Stack.Navigator initialRouteName='profile' screenOptions={{ headerShown: false, }}  >
            <Stack.Screen
                options={({ navigation }) => {
                    return {
                        title: t('Profile'),
                        headerShown: true,
                        headerShadowVisible: false,
                        headerStyle: { backgroundColor: '#fff' },
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
                        headerTitleStyle: {
                            fontSize: 25,
                        },
                        drawerIcon: () => (
                            <AntDesign name="user" size={30} color={'#ffe4e1'} />
                        ),
                    };
                }}
                name="profile"
                component={ProfileScreen}
            />

            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: true,
                    title: t("Settings")
                }}
                name="Settings"
                component={Settingscreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: true,
                    title: t('Update Profile')
                }}
                name="Edit"
                component={EditProfileScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: true,
                    title: t('Contact Us')
                }}
                name="Contactus"
                component={ContactUs}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: true,
                    title: t('Help & Support')
                }}
                name="help"
                component={HelpScreen}
            />
            <Stack.Screen options={{
                headerShown: true,
                title: t('Change Password')
            }}
                name="ChangePassword"
                component={ChangePasswordScreen}
            />

        </Stack.Navigator>
    )
}

export default ProfileStack