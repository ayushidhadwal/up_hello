import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {VStack, HStack, Input, Button, Icon} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import {ErrMessage} from '../../utils/toastMessage';
import {loginWithMobile} from '../../services/auth/loginWithMobile';
import Entypo from 'react-native-vector-icons/Entypo';

const LoginWithPhone = () => {
  // const {width} = Dimensions.get('window')

  const {t} = useTranslation();

  const navigation = useNavigation<RootNavigationProps>();

  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');

  const onNext = async () => {
    if (number.length < 9 || number.length > 12) {
      ErrMessage(t('number length is not correct'));
    } else if (code.length == 0) {
      ErrMessage(t('code is required'));
    } else {
      try {
        setLoading(true);
        const result = await loginWithMobile(number, code);
        navigation.navigate('MobileVerification', {
          otp: result.otp,
          id: result.id,
          token: result.authToken,
          number: number,
          code: code,
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        ErrMessage(error.message);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <VStack flex={1} space={4}>
        <Image
          source={require('../../../assets/images/user_avatar.png')}
          style={{
            width: 70,
            height: 70,
            borderRadius: 20,
            marginTop: 30,
            marginLeft: 50,
          }}
        />
        <Text style={{fontSize: 24, fontWeight: 'bold', alignSelf: 'center'}}>
          {t('Enter your phone number')}
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            fontWeight: '300',
            alignSelf: 'center',
          }}>
          {t('we will send you a verification code on the same number.')}
        </Text>
        <HStack justifyContent={'space-evenly'} space={3}>
          <Input
            value={code}
            InputLeftElement={
              <Icon size="4" color="gray.500" as={<Entypo name="plus" />} />
            }
            onChangeText={text => {
              setCode(text);
            }}
            keyboardType="phone-pad"
            placeholder={t('code')}
            mt={2}
            w={'16%'}
            variant={'underlined'}
            alignSelf={'center'}
          />
          <Input
            value={number}
            onChangeText={text => {
              setNumber(text);
            }}
            keyboardType="phone-pad"
            placeholder={t('Phone Number')}
            mt={2}
            w={'70%'}
            variant={'underlined'}
            alignSelf={'center'}
          />
        </HStack>
      </VStack>
      <Button
        isLoading={loading}
        isDisabled={loading}
        onPress={onNext}
        mb={5}
        mx={6}
        colorScheme={'red'}
        _text={{fontSize: 'lg'}}
        m={2}>
        {t('Continue')}
      </Button>
    </View>
  );
};

export default LoginWithPhone;
