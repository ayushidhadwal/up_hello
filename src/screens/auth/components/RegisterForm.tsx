import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Input,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {RootNavigationProps} from '../../../navigation/types';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../../components/CustomInput';
import {RegisterFormValues} from '../../../services/auth/types';
import {register} from '../../../services/auth/register';
import {AuthContext} from '../../../context/auth';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessage';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text as RNText, ActivityIndicator} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {socialLogin} from '../../../services/social/socialLogin';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from '../../../i18n';
import {setLocale} from 'yup';
import en from '../../../i18n/yup_locales/en';
import bn from '../../../i18n/yup_locales/bn';
import ar from '../../../i18n/yup_locales/ar';
import hn from '../../../i18n/yup_locales/hn';

const RegisterForm = () => {
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
      username: yup.string().required(),
      mobile: yup.string().min(9).max(11).required(),
    })
    .required();

  const {t} = useTranslation();

  const {createSession} = useContext(AuthContext);

  const navigation = useNavigation<RootNavigationProps>();

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

  const [googleloader, setGoogleLoader] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const passwordHide = () => {
    setShowPass(!showPass);
  };

  const [code, setCode] = useState('');

  const onSubmit = async (data: RegisterFormValues) => {
    if (code == '') {
      ErrMessage(t('All fields are required'));
    } else {
      try {
        const result = await register(data, code);
        navigation.navigate('RegisterVerify', {
          emailOtp: result.emailOtp,
          mobileOtp: result.mobileOtp,
          email: data.email,
          id: result.id,
        });
        SuccessMessage(t('Otp Sent Successfully'));
      } catch (error: any) {
        ErrMessage(error.message);
      }
    }
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
      SuccessMessage(t('Registered Successfully'));
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

  return (
    <View>
      <VStack space={2}>
        <Text px={5} bold fontSize={'lg'}>
          {t('User Name')} *
        </Text>
        <CustomInput
          icon={false}
          control={control}
          placeholder={t('Enter Username')}
          name={'username'}
          type={'text'}
          keyboardType={'default'}
          passwordHide={null}
          showPass={showPass}
        />
      </VStack>

      <VStack mt={2} space={2}>
        <Text px={5} bold fontSize={'lg'}>
          {t('Email')} *
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
          {t('Mobile Number')} *
        </Text>
        <HStack alignItems={'center'} flex={1} justifyContent={'space-evenly'}>
          <Input
            flex={0.3}
            value={code}
            InputLeftElement={
              <Icon
                size="4"
                ml="2"
                color="gray.500"
                as={<Entypo name="plus" />}
              />
            }
            onChangeText={text => {
              setCode(text);
            }}
            keyboardType="phone-pad"
            placeholder={t('code')}
            my={2}
            ml={4}
            // w={'15%'}
            variant={'outline'}
            alignSelf={'center'}
          />

          <Box flex={1}>
            <CustomInput
              icon={false}
              control={control}
              placeholder={t('Enter Mobile Numbers')}
              name={'mobile'}
              type={'text'}
              keyboardType={'phone-pad'}
              passwordHide={null}
              showPass={showPass}
            />
          </Box>
        </HStack>
      </VStack>

      <VStack mt={2} space={2}>
        <Text px={5} bold fontSize={'lg'}>
          {t('Password')} *
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
      <Text mx={5} mt={1} color={'grey'}>
        * {t('Required fields')}
      </Text>

      <Button
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        borderRadius={10}
        mt={5}
        alignSelf={'center'}
        colorScheme={'red'}
        _text={{
          color: 'white',
          fontSize: 'lg',
          fontWeight: 'bold',
        }}
        width={'90%'}>
        {t('Sign Up')}
      </Button>

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
              {t('Sign Up with Phone')}
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
                {t('Sign Up with Google')}
              </RNText>
              <Box />
            </>
          )}
        </HStack>
      </Pressable>
    </View>
  );
};

export default RegisterForm;
