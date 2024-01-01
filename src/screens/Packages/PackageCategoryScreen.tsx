

import {
  FlatList,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import { PackagesStackScreenProps } from '../../navigation/types';
import i18n from '../../i18n';
import { GetCategory } from '../../services/types';
import useGetCategories from '../../hooks/category/useGetCategory';
import Config from '../../config';
import { Loader } from '../../Common/Loader';
import SvgImage from '../../components/Svg';

type Props = PackagesStackScreenProps<'PackageCategoryScreen'>

const PackageCategoryScreen: FC<Props> = ({ navigation }) => {

  const { data, categoryLoading, error } = useGetCategories();
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

  const renderItem = ({ item }: { item: GetCategory }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('PackageSubCategoryScreen', {
            id: item.id,
            item: item,
          });
        }}>
        <HStack alignItems={'center'} my={2} mx={3} space={5}>
          <SvgImage uri={`${Config.API_URL}/${item.categoryIcon}`} />

          <Text fontSize="lg">
            {locale === 'en' && item.categoryNameEn}
            {locale === 'bn' && item.categoryNameBn}
            {locale === 'ar' && item.categoryNameAr}
            {locale === 'hn' && item.categoryNameHn}
          </Text>
        </HStack>
      </Pressable>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      flex={1}
      backgroundColor={'white'}>
      <FlatList data={data} renderItem={renderItem} />
    </ScrollView>
  );
};

export default PackageCategoryScreen;
