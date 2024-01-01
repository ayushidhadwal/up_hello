import React, { FC } from 'react';
import { Box, FlatList, HStack, Text } from 'native-base';
import { Pressable } from 'react-native';
import useGetCategories from '../../../hooks/category/useGetCategory';
import { GetCategory } from '../../../services/types';
import SvgImage from '../../../components/Svg';
import Config from '../../../config';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

interface navigation {
  navigation: any;
}
type Props = navigation;

const CategoriesComponent: FC<Props> = ({ navigation }) => {
  const { data, error } = useGetCategories();

  const { t } = useTranslation();
  const locale = i18n.language || 'en';

  const onPress = (id: number, name: string) => {
    navigation.navigate('SubCategory', { id, name });
  };

  if (error || data.length === 0) {
    return <Box />;
  }
  const renderItem = ({ item }: { item: GetCategory }) => {
    return (
      <Pressable

        onPress={() => {
          navigation.navigate('SubCategory', {
            id: item.id,
            item: item,

          })
        }}>
        <Box mt={2} justifyContent={'center'} alignItems={'center'}>
          <SvgImage uri={`${Config.API_URL}/${item.categoryIcon}`} />
          <Box style={{ width: 100 }}>
            <Text
              textAlign={'center'}
              mt={2}
              alignSelf={'center'}
              style={{ fontSize: 11 }}>
              {locale === 'en' && item.categoryNameEn}
              {locale === 'bn' && item.categoryNameBn}
              {locale === 'ar' && item.categoryNameAr}
              {locale === 'hn' && item.categoryNameHn}
            </Text>
          </Box>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box bg={'white'}>
      <HStack mx={3} justifyContent={'space-between'}>
        <Text fontSize={'lg'}>{t('Browse Categories')}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('CategoriesScreen');
          }}>
          <Text color={'red.500'} fontSize={'md'}>
            {t('View All')}
          </Text>
        </Pressable>
      </HStack>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        horizontal
      />
      <Box bg={'whitesmoke'} style={{ height: 9 }} />
    </Box>
  );
};

export default CategoriesComponent;
