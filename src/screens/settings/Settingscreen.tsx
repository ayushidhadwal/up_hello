import {useNavigation} from '@react-navigation/native';
import {VStack, View, Text, HStack, Divider, Button} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {RootNavigationProps} from '../../navigation/types';
import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  Modal,
  Pressable,
  Text as RNText,
} from 'react-native';

import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {countryData} from '../../Common/CountryData';
import {AuthContext} from '../../context/auth';

const Settingscreen = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const {t} = useTranslation();
  const {logout} = useContext(AuthContext);

  const onPressLogout = () => {
    Alert.alert(
      t('Logout'),
      t(
        'you will not receive messages and notifications for your ads until you log in again.Are you sure you want to log out?',
      ),
      [
        {
          text: t('Cancel'),

          style: 'cancel',
        },
        {
          text: t('Logout'),
          onPress: () => {
            logout();
            navigation.navigate('BottomTabs', {screen: 'Homescreen'});
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View flex={1} bg={'#fff'}>
      <VStack>
        <VStack mt={2} space={4}>
          <Pressable
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <HStack
              mr={2}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <HStack alignItems={'center'} space={2} px={4}>
                <VStack>
                  <RNText style={{fontWeight: 'bold', fontSize: 18}}>
                    {t('Privacy')}
                  </RNText>
                  <Text fontSize={'sm'} color={'grey'}>
                    {t('Change Password')}
                  </Text>
                </VStack>
              </HStack>
              <AntDesign name="right" size={22} />
            </HStack>
            <Divider mt={2} />
          </Pressable>

          <Pressable onPress={onPressLogout}>
            <HStack alignItems={'center'} space={2} px={4}>
              <VStack>
                <Text fontSize={'md'}>{t('Logout')}</Text>
              </VStack>
            </HStack>
            <Divider mt={2} />
          </Pressable>
        </VStack>
      </VStack>
    </View>
  );
};

export default Settingscreen;
