import {
  Box,
  Divider,
  FlatList,
  HStack,
  Pressable,
  Text,
  View,
} from 'native-base';
import React from 'react';
import useGetCategories from '../../hooks/category/useGetCategory';
import {Loader} from '../../Common/Loader';
import SvgImage from '../../components/Svg';
import {GetCategory} from '../../services/types';
import Config from '../../config';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import Entypo from 'react-native-vector-icons/Entypo';
import {t} from 'i18next';
import i18n from '../../i18n';

const MoreCategoriesScreen = () => {
  const {data, categoryLoading, error} = useGetCategories();

  const navigation = useNavigation<RootNavigationProps>();
  const locale = i18n.language || 'en';

  if (categoryLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <View alignItems={'center'} justifyContent={'center'} flex={1}>
        <Text bold fontSize={'lg'}>
          {t('No Categories')}
        </Text>
      </View>
    );
  }

  const renderItem = ({item}: {item: GetCategory}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('AddSubCategory', {
            id: item.id,
            name:
              locale === 'en'
                ? item.categoryNameEn
                : locale === 'bn'
                ? item.categoryNameBn
                : locale === 'ar'
                ? item.categoryNameAr
                : item.categoryNameHn,
          });
        }}
        my={2}>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          my={2}
          mx={3}
          space={5}>
          <HStack alignItems={'center'} space={5}>
            <SvgImage uri={`${Config.API_URL}/${item.categoryIcon}`} />
            <Text fontSize="md">
              {locale === 'en' && item.categoryNameEn}
              {locale === 'bn' && item.categoryNameBn}
              {locale === 'ar' && item.categoryNameAr}
              {locale === 'hn' && item.categoryNameHn}
            </Text>
          </HStack>
          <Entypo name="chevron-right" size={24} color={'gray'} />
        </HStack>
        <Divider />
      </Pressable>
    );
  };

  return (
    <View bg={'white'} flex={1}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default MoreCategoriesScreen;
