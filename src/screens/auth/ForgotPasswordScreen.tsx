import {Box, Image, Text, VStack, View, Button} from 'native-base';
import React, {FC} from 'react';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {
  AuthStackScreenProps,
  RootNavigationProps,
} from '../../navigation/types';
import {ForgotPasswordValues} from '../../services/auth/types';
import {forgotPassword} from '../../services/auth/forgotPassword';
import {ErrMessage} from '../../utils/toastMessage';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n';
import {setLocale} from 'yup';
import en from '../../i18n/yup_locales/en';
import bn from '../../i18n/yup_locales/bn';
import ar from '../../i18n/yup_locales/ar';
import hn from '../../i18n/yup_locales/hn';

type Props = AuthStackScreenProps<'ForgotPasswordscreen'>;

const ForgotPasswordScreen: FC<Props> = ({navigation}) => {
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
    })
    .required();

  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSumbit = async (data: ForgotPasswordValues) => {
    const {email} = data;
    try {
      const otp = await forgotPassword(email);
      navigation.navigate('Verificationscreen', {otp, email});
    } catch (error: any) {
      ErrMessage(error.message);
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <Box my={8} alignItems={'center'}>
        <Image
          size={'lg'}
          alt={'img'}
          source={require('../../../assets/images/logo.png')}
        />
      </Box>
      <Text fontSize={'md'} textAlign={'center'} mx={6}>
        {t(
          'Enter the Email Associated with your Account and we’ll send an email with Instructions to reset your Password.',
        )}
      </Text>

      <VStack my={12} space={4}>
        <Text mx={4} fontSize={'lg'} bold>
          {t('Enter Email')}
        </Text>
        <CustomInput
          control={control}
          placeholder={t('Email')}
          name={'email'}
          type={'text'}
        />
      </VStack>

      <Button
        onPress={handleSubmit(onSumbit)}
        my={6}
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        bg={'red.500'}
        _text={{fontWeight: 'bold', fontSize: 'md'}}
        mx={4}>
        {t('Send')}
      </Button>
    </View>
  );
};

export default ForgotPasswordScreen;
