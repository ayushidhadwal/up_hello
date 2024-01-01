import {Text, View} from 'native-base';
import React from 'react';
import TopBarNavigation from '../../navigation/TopBarNavigation';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

const MyAds = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Text bold fontSize={'2xl'} px={2}>
        {t('My Ads')}
      </Text>
      <TopBarNavigation />
    </SafeAreaView>
  );
};

export default MyAds;
