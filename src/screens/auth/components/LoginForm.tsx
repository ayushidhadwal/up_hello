import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {FC, useContext, useState} from 'react';
import {RootNavigationProps} from '../../../navigation/types';
import {LoginFormValues} from '../../../services/auth/types';
import CustomInput from '../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {login} from '../../../services/auth/login';
import {SuccessMessage, ErrMessage} from '../../../utils/toastMessage';
import {AuthContext} from '../../../context/auth';
import {useTranslation} from 'react-i18next';
import {Text as RNText, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {socialLogin} from '../../../services/social/socialLogin';
import {setLocale} from 'yup';

import en from '../../../i18n/yup_locales/en';
import ar from '../../../i18n/yup_locales/ar';
import hn from '../../../i18n/yup_locales/hn';
import bn from '../../../i18n/yup_locales/bn';
import i18n from '../../../i18n';

const LoginForm: FC = ({}) => {
  const yupLocale = i18n.language;

  setLocale(
    yupLocale === 'en'
      ? en
      : yupLocale === 'bn'
      ? bn
      : yupLocale === 'ar'
      ? ar
      : hn,
  );

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const navigation = useNavigation<RootNavigationProps>();

  const {createSession} = useContext(AuthContext);

  GoogleSignin.configure({
    webClientId:
      '841843061886-o8nv3bftnb95s7cj3ivildubjb61nn1l.apps.googleusercontent.com',
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSumbit = async (data: LoginFormValues) => {
    const {email, password} = data;
    try {
      const Result = await login(email, password);
      createSession(Result.token, Result.id);
      navigation.navigate('BottomTabs');
      SuccessMessage('login successfully');
    } catch (error: any) {
      ErrMessage(error.message);
    }
  };

  const [googleloader, setGoogleLoader] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const passwordHide = () => {
    setShowPass(!showPass);
  };

  const socialLogins = async (
    Provider: string,
    id: string,
    name: string | null,
    email: string,
  ) => {
    try {
      const result = await socialLogin(Provider, id, name, email);
      createSession(result.authToken, result.id);
      navigation.navigate('BottomTabs');
      setGoogleLoader(false);
      SuccessMessage('Login Successfully');
    } catch (e: any) {
      ErrMessage(e.message);
      setGoogleLoader(false);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      setGoogleLoader(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();

      await socialLogins(
        'google',
        userInfo.user.id,
        userInfo.user.name,
        userInfo.user.email,
      );
      setGoogleLoader(false);
    } catch (e: any) {
      ErrMessage(e.message);
      console.log(e.me);
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        setGoogleLoader(false);
        ErrMessage('Cancelled by user.');
      } else if (e.code === statusCodes.IN_PROGRESS) {
        setGoogleLoader(true);
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setGoogleLoader(false);
        ErrMessage('Play Services Not Available or Outdated');
      } else {
        setGoogleLoader(false);
        ErrMessage(e.message);
      }
    }
  };

  const {t} = useTranslation();

  return (
    <View mt={5}>
      <VStack mt={2} space={2}>
        <Text px={5} bold fontSize={'lg'}>
          {t('Email')}
        </Text>

        <CustomInput
          icon={false}
          control={control}
          placeholder={t('Enter Email')}
          name={'email'}
          type={'text'}
          keyboardType={'default'}
          passwordHide={null}
          showPass={showPass}
        />
      </VStack>

      <VStack mt={2} space={2}>
        <Text px={5} bold fontSize={'lg'}>
          {t('Password')}
        </Text>
        <CustomInput
          icon={true}
          control={control}
          placeholder={t('Enter Password')}
          name={'password'}
          showPass={showPass}
          type={showPass ? 'text' : 'password'}
          keyboardType={'default'}
          passwordHide={passwordHide}
        />
      </VStack>

      <Pressable
        onPress={() => {
          navigation.navigate('ForgotPasswordscreen');
        }}>
        <Text color={'red.600'} mt={2} px={5} alignSelf={'flex-end'}>
          {t('Forgot Password?')}
        </Text>
      </Pressable>

      <Button
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        onPress={handleSubmit(onSumbit)}
        borderRadius={10}
        mt={5}
        alignSelf={'center'}
        colorScheme={'red'}
        width={'90%'}>
        <Text color={'white'} bold fontSize={'lg'}>
          {t('Log in')}
        </Text>
      </Button>

      <HStack mt={2} px={5} justifyContent={'space-between'}>
        <Text fontSize={'md'}>{t("Don't have an account?")}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Registerscreen');
          }}>
          <Text fontSize={'md'} color={'red.600'}>
            {t('Sign Up')}
          </Text>
        </Pressable>
      </HStack>

      <HStack my={3} justifyContent={'center'} alignItems={'center'}>
        <Divider w={'40%'} />
        <Text mx={2}>{t('OR')}</Text>
        <Divider w={'40%'} />
      </HStack>

      <Pressable
        onPress={() => {
          navigation.navigate('LoginWithPhone');
        }}>
        <HStack
          rounded={5}
          mx={5}
          p={4}
          justifyContent={'space-between'}
          alignItems={'center'}
          bg={'red.100'}>
          {/* {googleloader ? (
                        <>
                            <Box />
                            <ActivityIndicator size={20} style={{ alignSelf: 'center' }} color={'red'} />
                            <Box />
                        </>
                    )
                        : */}
          <>
            <Ionicons size={22} name="phone-portrait-outline" color={'red'} />
            <RNText style={{fontSize: 18, color: 'red', fontWeight: 'bold'}}>
              {t('Sign In with Phone')}
            </RNText>
            <Box />
          </>
          {/* } */}
        </HStack>
      </Pressable>
      <Pressable
        my={3}
        onPress={() => {
          onGoogleButtonPress();
        }}>
        <HStack
          rounded={5}
          mx={5}
          p={4}
          justifyContent={'space-between'}
          alignItems={'center'}
          bg={'red.100'}>
          {googleloader ? (
            <>
              <Box />
              <ActivityIndicator
                size={20}
                style={{alignSelf: 'center'}}
                color={'red'}
              />
              <Box />
            </>
          ) : (
            <>
              <AntDesign size={24} name="google" color={'red'} />
              <RNText style={{fontSize: 18, color: 'red', fontWeight: 'bold'}}>
                {t('Sign In with Google')}
              </RNText>
              <Box />
            </>
          )}
        </HStack>
      </Pressable>
    </View>
  );
};

export default LoginForm;
