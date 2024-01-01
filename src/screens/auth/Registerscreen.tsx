import {
  Box,
  HStack,
  Image,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import RegisterForm from './components/RegisterForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

const Registerscreen = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Box my={4} alignItems={'center'}>
          <Image
            style={{width: 120, height: 120}}
            right={1}
            alt={'img'}
            source={require('../../../assets/images/logo.png')}
          />
          <Text mt={10} bold fontSize={'3xl'}>
            {t('Sign Up')}
          </Text>
        </Box>
        <Box my={5}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
          <Box>
            <RegisterForm />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Registerscreen;
