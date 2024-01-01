import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {FC, useState} from 'react';
import {useInterval} from '../../hooks/useInterval';
import {useNavigation} from '@react-navigation/native';
import {
  AuthStackScreenProps,
  RootNavigationProps,
} from '../../navigation/types';
import CustomInput from '../../components/CustomInput';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {VerificationValues} from '../../services/auth/types';
import {ErrMessage, SuccessMessage} from '../../utils/toastMessage';
import {forgotPassword} from '../../services/auth/forgotPassword';
import {useTranslation} from 'react-i18next';

const schema = yup
  .object({
    otp: yup.number().required(),
  })
  .required();

type Props = AuthStackScreenProps<'Verificationscreen'>;

const VerificationScreen: FC<Props> = ({route, navigation}) => {
  const {otp, email} = route.params;

  const [otps, setOtps] = useState(otp);

  const [timer, setTimer] = useState(60);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useInterval(() => {
    setTimer(prevState => {
      const time = prevState;
      if (time > 0) {
        return time - 1;
      } else {
        return 0;
      }
    });
  }, 1000);

  const onSumbit = (data: VerificationValues) => {
    if (otps === data.otp) {
      navigation.navigate('NewPasswordscreen', {otps, email});
      SuccessMessage(t('success'));
    } else {
      ErrMessage(t('wrong otp'));
    }
  };

  const resendOtp = async () => {
    setTimer(60);
    try {
      const otp = await forgotPassword(email);
      SuccessMessage(t('Otp Sent Successfully'));
      setOtps(otp);
    } catch (error: any) {
      ErrMessage(error.message);
    }
  };

  const {t} = useTranslation();

  return (
    <View bg={'white'} flex={1}>
      <Box my={8} alignItems={'center'}>
        <Image
          size={'lg'}
          alt={'img'}
          source={require('../../../assets/images/logo.png')}
        />
      </Box>
      <Text my={6} textAlign={'center'} mx={7}>
        {t('Please Enter the 4 Digit Code Sent to')}
        <Text bold> {email}</Text>
      </Text>

      <VStack space={2}>
        <Text bold pl={5} fontSize={'xl'}>
          {t('Enter Code')}
        </Text>
        <CustomInput
          control={control}
          placeholder={t('code')}
          name="otp"
          type={'text'}
        />
      </VStack>

      {timer === 0 ? (
        <Text
          onPress={resendOtp}
          bold
          mt={4}
          color={'red.500'}
          mx={4}
          alignSelf={'flex-end'}>
          {t('Resend Otp')}
        </Text>
      ) : (
        <Text bold mt={4} color={'red.500'} mx={4} alignSelf={'flex-end'}>
          {t('Resend Otp')} : {timer}
        </Text>
      )}

      <Button
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        onPress={handleSubmit(onSumbit)}
        bg={'red.500'}
        mx={4}
        mt={16}>
        {t('Enter Code')}
      </Button>
    </View>
  );
};

export default VerificationScreen;
