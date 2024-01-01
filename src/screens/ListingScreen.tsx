import {Box, Divider, FlatList, Pressable, Text, View} from 'native-base';
import React, {FC} from 'react';
import {RootNavigationProps, SellTopBarScreenProps} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {GetCategory} from '../services/types';
import useGetCategories from '../hooks/category/useGetCategory';
import SvgImage from '../components/Svg';
import {Loader} from '../Common/Loader';
import Config from '../config';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n';
import {SafeAreaView} from 'react-native-safe-area-context';

export type FormDataImg = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

type Props = SellTopBarScreenProps<'sellItem'>;

export type FormikValues = {
  itemName: string;
  categoryId: string;
  subCategoryId: string;
  price: string;
  discount: string;
  desc: string;
  location: string;
  brand: string;
};

const ListingScreen: FC<Props> = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const {data, error, categoryLoading} = useGetCategories();

  const {t} = useTranslation();

  if (categoryLoading) {
    return <Loader />;
  }
  const locale = i18n.language;

  const renderItem = ({item}: {item: GetCategory}) => {
    const isType = item?.type === 'custom';
    return (
      <Pressable
        onPress={() => {
          isType
            ? navigation.navigate('Morecategories')
            : navigation.navigate('AddSubCategory', {
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
        alignItems={'center'}
        justifyContent={'center'}
        borderColor={'silver'}
        h={100}
        my={1}
        mx={1}
        w={'47%'}
        borderRightWidth={1}
        borderBottomWidth={1}>
        {isType ? (
          <Box mt={5} alignItems={'center'}>
            <SvgImage uri={`${Config.API_URL}/svg/icon.svg`} />
            <Text mt={2} fontSize={'sm'} textAlign={'center'}>
              {t('More categories')}
            </Text>
          </Box>
        ) : (
          <SvgImage uri={`${Config.API_URL}/${item.categoryIcon}`} />
        )}
        <Text mt={1} fontSize={'sm'} textAlign={'center'}>
          {locale === 'en' && item.categoryNameEn}
          {locale === 'bn' && item.categoryNameBn}
          {locale === 'ar' && item.categoryNameAr}
          {locale === 'hn' && item.categoryNameHn}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text fontSize={'xl'} mt={2} bold mx={3}>
        {t('What are you offering?')}
      </Text>
      <Divider w={'96%'} alignSelf={'center'} mt={2} />
      <FlatList
        mt={8}
        numColumns={2}
        data={[
          ...data.slice(0, 7),
          {
            id: 8,
            type: 'custom',
            categoryName: 'More Categories',
            categoryIcon: require('../../assets/images/more_category.svg'),
            brandId: '',
            categoryCover: '',
          },
        ]}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default ListingScreen;
