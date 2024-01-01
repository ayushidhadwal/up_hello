import {
  HStack,
  Image,
  Text,
  VStack,
  View,
  Box,
  Button,
  Divider,
  Pressable,
} from 'native-base';
import React, { FC, useContext, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackScreenProps } from '../../navigation/types';
import { useGetProfileDetails } from '../../hooks/profile/useGetProfileDetails';
import { Loader } from '../../Common/Loader';
import Config from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { FlatList, I18nManager, Modal, Text as RNText } from 'react-native';
import i18n from '../../i18n';
import { LangContext } from '../../context/lang';
import FastImage from 'react-native-fast-image';

type Props = ProfileStackScreenProps<'profile'>;

const ProfileScreen: FC<Props> = ({ navigation }) => {
  const url = 'https://play.google.com/store/apps/details?id=com.uphello';

  const [showModal, setShowModal] = useState(false);
  const [showCountryModal, setCountryModal] = useState(false);
  const {
    setLanguage,
    lang,
    setCountries,
    countryId,
    languageId,
    country,
    countryLoading,
    countriesData,
    updateIsUsingLocation
  } = useContext(LangContext);

  const [countId, setCountId] = useState<any>();

  const [langId, setLangId] = useState<any>();
  const [langName, setLangName] = useState('');

  const [countryName, setcountryName] = useState('');


  const { profile, loading, error } = useGetProfileDetails();
  const locale = i18n.language;

  const { t } = useTranslation();

  const chooseCountry = (country: string, id: number) => {
    setCountId(id);
    setcountryName(country);
  };

  const selectCountry = () => {
    setCountries(countryName, countId);
    setCountryModal(false);
    updateIsUsingLocation(false)
  };

  useEffect(() => {
    setCountId(countryId);
    setLangId(languageId);
    setcountryName(country);
  }, []);

  const rendetItem = ({ item, index }: { item: any; index: number }) => {

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
          {item.id == countId && (
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
    setShowModal(false);
    setLanguage(langName, langId);
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

  if (loading) {
    return <Loader />;
  }


  const changeLangName = () => {
    if (lang == 'en') {
      return (
        <Text>English</Text>
      );
    }
    else if (lang == 'bn') {
      return (
        <Text>বাংলা</Text>

      );
    }
    else if (lang == 'hn') {
      return (
        <Text>हिंदी</Text>
      );
    }
    else if (lang == 'ar') {
      return (
        <Text>عربي</Text>
      );
    }
  }



  return (
    <View flex={1} backgroundColor={'white'}>
      <HStack px={6} space={4} alignItems={'center'} mt={10}>
        {/* <ImageProfile
          key={profile?.profileImage}
          style={{ width: 70, height: 70, borderRadius: 100 }}
          alt="img"
          source={{
            uri: `${Config.API_URL}/${profile?.profileImage}`,
          }}
        /> */}
        {profile?.profileImage == null ? (
          <FastImage
            style={{ width: 70, height: 70, borderRadius: 100 }}
            source={require('../../../assets/images/user_avatar.png')}
          />
        ) : (
          <FastImage
            key={profile?.profileImage}
            style={{ width: 70, height: 70, borderRadius: 100 }}
            source={{
              uri: `${Config.API_URL}/${profile?.profileImage}`,
            }}
          />
        )}

        <RNText style={{ fontSize: 23, fontWeight: '500' }}>
          {profile?.username}
        </RNText>
        <Box />
      </HStack>

      <Button
        onPress={() => {
          navigation.navigate('Edit', { linkStatus: profile.linkStatus });
        }}
        _text={{ fontWeight: 'bold', fontSize: 18 }}
        mt={12}
        colorScheme={'red'}
        mx={4}>
        {t('Edit Profile')}
      </Button>

      <VStack space={5} mt={20}>
        <Pressable
          mt={10}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <HStack justifyContent={'space-between'} px={2} alignItems={'center'}>
            <HStack space={3} alignItems={'center'}>
              <AntDesign name="setting" size={24} color={'red'} />
              <VStack>
                <Text fontSize={'lg'}>{t('Settings')}</Text>
                <Text fontSize={'sm'} color={'grey'}>
                  {t('Privacy and Logout')}
                </Text>
              </VStack>
            </HStack>
            <Ionicons name="chevron-forward-sharp" size={24} />
          </HStack>

          <Divider mt={2} />
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('help');
          }}>
          <HStack justifyContent={'space-between'} px={2} alignItems={'center'}>
            <HStack space={3} alignItems={'center'}>
              <Feather name="users" size={24} color={'red'} />
              <VStack>
                <Text fontSize={'lg'}>{t('Help & Support')}</Text>
                <Text fontSize={'sm'} color={'grey'}>
                  {t('Help center and legal terms')}
                </Text>
              </VStack>
            </HStack>
            <Ionicons name="chevron-forward-sharp" size={24} />
          </HStack>

          <Divider mt={2} />
        </Pressable>

        <Pressable
          onPress={() => {
            setShowModal(true);
          }}>
          <HStack justifyContent={'space-between'} px={2} alignItems={'center'}>
            <HStack space={3} alignItems={'center'}>
              <Ionicons name="language" size={20} color={'red'} />
              <VStack>
                <Text fontSize={'md'}>{t('Change Language')}</Text>
                {changeLangName()}
              </VStack>
            </HStack>
          </HStack>
          <Divider mt={2} />
        </Pressable>

        <Pressable
          onPress={() => {
            setCountryModal(true);
          }}>
          <HStack justifyContent={'space-between'} px={2} alignItems={'center'}>
            <HStack space={3} alignItems={'center'}>
              <Entypo name="map" size={20} color={'red'} />
              <VStack>
                <Text fontSize={'md'}>{t('Change Country')}</Text>
                <Text fontSize={'sm'} color={'grey'}>
                  {countryName}
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <Divider mt={2} />
        </Pressable>

        {/* language modal */}
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <View justifyContent={'flex-end'} flex={1} bg={'rgba(0,0,0,0.5)'}>
            <View borderTopRadius={10} bgColor={'white'}>
              <HStack
                px={4}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text my={2} bold fontSize={'2xl'}>
                  {t('Select Language')}
                </Text>
                <Entypo
                  onPress={() => {
                    setShowModal(false);
                  }}
                  name="cross"
                  size={25}
                  color={'grey'}
                />
              </HStack>

              <Pressable onPress={() => setLang('hn', 1)}>
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
                      source={require('../../../assets/images/india_flag.png')}
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
                  space={3}
                  alignItems={'center'}>
                  <HStack space={3}>
                    <FastImage
                      style={{ width: 40, height: 40 }}
                      source={require('../../../assets/images/uae_flag.png')}
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
                  justifyContent={'space-between'}
                  borderRadius={10}
                  borderWidth={0.5}
                  m={2}
                  p={2}
                  space={3}
                  alignItems={'center'}>
                  <HStack space={3}>
                    <FastImage
                      style={{ width: 40, height: 40 }}
                      source={require('../../../assets/images/usa_flag.png')}
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
                  justifyContent={'space-between'}
                  borderRadius={10}
                  borderWidth={0.5}
                  m={2}
                  p={2}
                  alignItems={'center'}>
                  <HStack space={3}>
                    <FastImage
                      style={{ width: 40, height: 40 }}
                      source={require('../../../assets/images/bangla_flag.png')}
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

        {/* country modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCountryModal}>
          <View justifyContent={'flex-end'} flex={1} bg={'rgba(0,0,0,0.5)'}>
            <View
              minHeight={600}
              mx={2}
              maxHeight={600}
              borderRadius={10}
              bgColor={'white'}>
              <HStack
                px={4}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text my={2} bold fontSize={'2xl'}>
                  {t('Select Country')}
                </Text>
                <Entypo
                  onPress={() => {
                    setCountryModal(false);
                  }}
                  name="cross"
                  size={25}
                  color={'grey'}
                />
              </HStack>

              <Divider />

              {countryLoading ?
                <Loader /> :
                <FlatList
                  persistentScrollbar
                  showsVerticalScrollIndicator={true}
                  keyExtractor={(item, index) => index.toString()}
                  data={countriesData}
                  renderItem={rendetItem}
                />
              }
              <Divider />
              <Button
                isDisabled={countId == undefined}
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
      </VStack>
    </View>
  );
};

export default ProfileScreen;
