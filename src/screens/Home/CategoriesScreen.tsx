import {
  FlatList,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import useGetCategories from '../../hooks/category/useGetCategory';
import {GetCategory} from '../../services/types';
import {Loader} from '../../Common/Loader';
import SvgImage from '../../components/Svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import Config from '../../config';
import {t} from 'i18next';
import i18n from '../../i18n';

const CategoriesScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const {data, categoryLoading, error} = useGetCategories();
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
          navigation.navigate('SubCategory', {
            id: item.id,
              item:item,

          });
        }}>
        <HStack alignItems={'center'} my={2} mx={3} space={5}>
          <SvgImage uri={`${Config.API_URL}/${item.categoryIcon}`} />

          <Text  mr={2} flex={1} fontSize="lg">
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

export default CategoriesScreen;
