import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Divider,
  Pressable,
  HStack,
  Image,
  FlatList,
  Button,
} from 'native-base';
import { Modal, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../context/lang';
import Config from '../config';
import RNRestart from 'react-native-restart';
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { Loader } from '../Common/Loader';
import FastImage from 'react-native-fast-image';

const ModalComp = () => {
  const { setCountries, setLanguage, lang, countriesData, countryLoading, updateIsUsingLocation } = useContext(LangContext);
  const [showCountryModal, setCountryModal] = useState(true);
  const [showLangModal, setLangModal] = useState(false);
  const [countryId, setCountryId] = useState<any>();
  const [countryName, setcountryName] = useState('');
  const [langId, setLangId] = useState<number | undefined>();
  const [langName, setLangName] = useState('');
  const [shortName, setShortName] = useState('');
  const locale = i18n.language;


  const { t } = useTranslation();

  const chooseCountry = (country: string, id: number) => {
    setShortName(country);
    setCountryId(id);
    setcountryName(country);
  };

  const selectCountry = () => {
    setCountries(countryName, countryId);
    updateIsUsingLocation(false);
    setCountryModal(false);
    setLangModal(true);
  };



  const renderItem = ({ item, index }: { item: any; index: number }) => {


    return (
      <Pressable
        onPress={() => chooseCountry(item.name_en, item.id)}>
        <HStack
          justifyContent={'space-between'}
          borderRadius={10}
          borderWidth={0.5}
          m={2}
          p={2}
          alignItems={'center'}>
          <HStack space={3}>
            <FastImage
              style={{ width: 40, height: 40 }}
              source={{ uri: item.img }}
            />
            <Text fontSize={'2xl'}>{item[`name_${locale}`]}</Text>
          </HStack>
          {item.id == countryId && (
            <Feather name="check" size={24} color={'red'} />
          )}
        </HStack>
      </Pressable>
    );
  };

  const setLang = async (langs: string, id: number) => {
    setLangId(id);
    setLangName(langs);
  };

  const selectLang = async () => {
    setLangModal(false);
    setLanguage(langName, langId);
    await AsyncStorage.setItem(Config.GetCountryKey, '1');
    if (langName == lang) {
      return null;
    }
    await i18n.changeLanguage(langName);
    if (langName == 'ar') {
      I18nManager.forceRTL(true);
      RNRestart.restart();
    } else {
      I18nManager.forceRTL(false);
    }
  };

  return (
    <>
      {/* Countries Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCountryModal}>
        <View justifyContent={'center'} flex={1} bg={'rgba(0,0,0,0.5)'}>

          <View
            minHeight={600}
            mx={2}
            maxHeight={600}
            borderRadius={10}
            bgColor={'white'}>
            <Text alignSelf={'center'} my={2} bold fontSize={'2xl'}>
              {t('Select Country')}
            </Text>

            <Divider />
            {countryLoading ? <Loader /> :
              <FlatList
                persistentScrollbar
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
                data={countriesData}
                renderItem={renderItem}
              />
            }
            <Divider />
            <Button
              isDisabled={countryId == undefined}
              onPress={() => {
                selectCountry();
              }}
              colorScheme={'red'}
              w={'80%'}
              alignSelf={'center'}
              m={2}>
              {t('Select')}
            </Button>
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      <Modal animationType="slide" transparent={true} visible={showLangModal}>
        <View justifyContent={'center'} flex={1} bg={'rgba(0,0,0,0.5)'}>
          <View minHeight={300} mx={2} borderRadius={10} bgColor={'white'}>
            <Text alignSelf={'center'} my={2} bold fontSize={'2xl'}>
              {t('Select Language')}
            </Text>

            <Pressable onPress={() => setLang('hn', 1)}>
              <HStack
                borderRadius={10}
                justifyContent={'space-between'}
                borderWidth={0.5}
                m={2}
                p={2}
                alignItems={'center'}>
                <HStack space={3}>
                  <FastImage
                    style={{ width: 40, height: 40 }}
                    source={require('../../assets/images/india_flag.png')}
                  />
                  <Text fontSize={'2xl'}>हिंदी</Text>
                </HStack>
                {langId == 1 && (
                  <Feather name="check" size={24} color={'red'} />
                )}
              </HStack>
            </Pressable>

            <Pressable onPress={() => setLang('ar', 2)}>
              <HStack
                justifyContent={'space-between'}
                borderRadius={10}
                borderWidth={0.5}
                m={2}
                p={2}
                alignItems={'center'}>
                <HStack space={3}>
                  <FastImage
                    style={{ width: 40, height: 40 }}
                    source={require('../../assets/images/uae_flag.png')}
                  />
                  <Text fontSize={'2xl'}>عربي</Text>
                </HStack>
                {langId == 2 && (
                  <Feather name="check" size={24} color={'red'} />
                )}
              </HStack>
            </Pressable>

            <Pressable onPress={() => setLang('en', 3)}>
              <HStack
                borderRadius={10}
                justifyContent={'space-between'}
                borderWidth={0.5}
                m={2}
                p={2}
                space={3}
                alignItems={'center'}>
                <HStack space={3}>
                  <FastImage
                    style={{ width: 40, height: 40 }}
                    source={require('../../assets/images/usa_flag.png')}
                  />
                  <Text fontSize={'xl'}>English</Text>
                </HStack>
                {langId == 3 && (
                  <Feather name="check" size={24} color={'red'} />
                )}
              </HStack>
            </Pressable>

            <Pressable onPress={() => setLang('bn', 4)}>
              <HStack
                borderRadius={10}
                borderWidth={0.5}
                m={2}
                p={2}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <HStack space={3}>
                  <FastImage
                    style={{ width: 40, height: 40 }}
                    source={require('../../assets/images/bangla_flag.png')}
                  />
                  <Text fontSize={'xl'}>বাংলা</Text>
                </HStack>
                {langId == 4 && (
                  <Feather name="check" size={24} color={'red'} />
                )}
              </HStack>
            </Pressable>
            <Divider />
            <Button
              isDisabled={langId == undefined}
              onPress={() => {
                selectLang();
              }}
              colorScheme={'red'}
              w={'80%'}
              alignSelf={'center'}
              m={2}>
              {t('Select')}
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalComp;
