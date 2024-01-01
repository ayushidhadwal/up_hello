import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Image, Text, VStack, View} from 'native-base';
import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {forgotPassword} from '../../services/auth/forgotPassword';
import {AuthStackScreenProps} from '../../navigation/types';
import {SuccessMessage} from '../../utils/toastMessage';
import {otpSubmit} from '../../services/auth/otpSubmit';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n';
import {setLocale} from 'yup';
import en from '../../i18n/yup_locales/en';
import bn from '../../i18n/yup_locales/bn';
import ar from '../../i18n/yup_locales/ar';
import hn from '../../i18n/yup_locales/hn';

type Props = AuthStackScreenProps<'NewPasswordscreen'>;

const NewPasswordScreen: FC<Props> = ({route, navigation}) => {
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
      newPassword: yup.string().required(),
      confPassword: yup.string().required(),
    })
    .required();

  const {email, otps} = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const {newPassword, confPassword} = data;
    try {
      const result = await otpSubmit(email, otps, newPassword, confPassword);
      SuccessMessage('Password Changed Successfully');
      navigation.navigate('Loginscreen');
    } catch (error) {}
  };

  const {t} = useTranslation();

  return (
    <View flex={1} bg={'white'}>
      <VStack mt={20} space={4}>
        <Box my={4} alignItems={'center'}>
          <Image
            size={'lg'}
            alt={'img'}
            source={require('../../../assets/images/logo.png')}
          />
        </Box>

        <Text bold px={5} fontSize={'xl'}>
          {t('Change Password')}
        </Text>

        <CustomInput
          control={control}
          placeholder={t('New Password')}
          name={'newPassword'}
          type={'text'}
        />
        <CustomInput
          control={control}
          placeholder={t('Confirm Password')}
          name={'confPassword'}
          type={'text'}
        />
      </VStack>
      <Button
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        _text={{fontWeight: 'bold', fontSize: 'md'}}
        mt={16}
        mx={4}
        bg={'red.500'}>
        {t('Change Password')}
      </Button>
    </View>
  );
};

export default NewPasswordScreen;
