import { Divider, ScrollView } from 'native-base';
import React, { FC, useContext, useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import SearchBar from './components/SearchBar';
import ImageSlider from './components/ImageSlider';
import RecenetItemComponent from './components/RecentItemComponent';
import { BottomTabsParamList } from '../../navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoriesComponent from './components/CategoriesComponent';
import AddComponent from './components/AddComponent';
import { AuthContext } from '../../context/auth';
import { Loader } from '../../Common/Loader';
import ModalComp from '../../components/ModalComp';
import Config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LangContext } from '../../context/lang';
import i18n from '../../i18n';

type Props = BottomTabScreenProps<BottomTabsParamList, 'Homescreen'>;

const Homescreen: FC<Props> = ({ navigation }) => {
  const { tokenLoading } = useContext(AuthContext);

  const { country } = useContext(LangContext);

  if (tokenLoading) {
    return <Loader />;
  }

  const [isCountryKey, setCountryKey] = useState<number | undefined>();

  const [modalLoading, setModalLoading] = useState(false);
  const locale = i18n.language;

  useEffect(() => {
    (async () => {
      setModalLoading(true);
      const countrykey = await AsyncStorage.getItem(Config.GetCountryKey);
      setCountryKey(Number(countrykey));
      setModalLoading(false);
    })();
  }, []);

  if (modalLoading) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <TopBar navigation={navigation} />
      <SearchBar />
      <Divider />
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        {
          isCountryKey !== 1 &&
          <ModalComp />
        }
        <AddComponent />
        <ImageSlider />
        <CategoriesComponent navigation={navigation} />
        <RecenetItemComponent navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homescreen;