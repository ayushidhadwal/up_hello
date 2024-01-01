import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from '../screens/auth/Loginscreen';
import Registerscreen from '../screens/auth/Registerscreen';
import { AuthStackParamList } from './types';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import { useTranslation } from 'react-i18next';
import RegisterVerifyScreen from '../screens/auth/RegisterVerifyScreen';
import LoginWithPhone from '../screens/auth/LoginWithPhone';
import MobileVerification from '../services/auth/MobileVerification';

const AuthStackNavigation = () => {
    const Stack = createNativeStackNavigator<AuthStackParamList>();

    const { t } = useTranslation();

    return (
        <Stack.Navigator initialRouteName='Loginscreen' screenOptions={{ headerShown: false, headerShadowVisible: false, }}>
            <Stack.Screen options={{
                headerShown: true,
                title: t('Register'),
                headerShadowVisible: true
            }}
                name="Registerscreen" component={Registerscreen} />
            <Stack.Screen options={{
                headerShown: true,
                title: t('Login'),
                headerShadowVisible: true
            }} name="Loginscreen" component={Loginscreen} />
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: t('Forget Password'),
                }}
                name="ForgotPasswordscreen" component={ForgotPasswordScreen} />
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: t('Verification Code'),

                }}
                name="Verificationscreen" component={VerificationScreen} />

            <Stack.Screen
                options={{
                    headerShown: true,
                    title: t('Login'),
                    headerShadowVisible: true
                }}
                name="LoginWithPhone" component={LoginWithPhone} />

            <Stack.Screen
                options={{
                    headerShown: true,
                    title: t('Verification'),
                    headerShadowVisible: true
                }}
                name="MobileVerification" component={MobileVerification} />

            

            

            <Stack.Screen
                options={{
                    headerShown: true,
                    title: t('Verification Code'),

                }}
                name="RegisterVerify"
                component={RegisterVerifyScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: t('Create New Password'),
                }}
                name="NewPasswordscreen"
                component={NewPasswordScreen} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigation