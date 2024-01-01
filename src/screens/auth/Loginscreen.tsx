import {Box, HStack, Image, StatusBar, Text, View} from 'native-base';
import React, {FC, useContext, useState} from 'react';
import LoginForm from './components/LoginForm';
import {AuthStackScreenProps} from '../../navigation/types';
import {login} from '../../services/auth/login';
import {LoginFormValues} from '../../services/auth/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = AuthStackScreenProps<'Loginscreen'>;

const Loginscreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 5, backgroundColor: 'white'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

      <Box mt={8} alignItems={'center'}>
        <Image
          size={'lg'}
          alt={'img'}
          source={require('../../../assets/images/logo.png')}
        />
        <Text mt={10} bold fontSize={'3xl'}>
          {t('Log in')}
        </Text>
      </Box>

      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <LoginForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Loginscreen;
