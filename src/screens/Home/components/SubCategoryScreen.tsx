import {Text, View, VStack, FlatList, Divider, Pressable} from 'native-base';
import React, {FC} from 'react';
import {RootStackScreenProps} from '../../../navigation/types';
import {useGetSubCategory} from '../../../hooks/category/useGetSubCategory';
import {SubCategory} from '../../../services/types';
import {Loader} from '../../../Common/Loader';
import i18n from '../../../i18n';

type Props = RootStackScreenProps<'SubCategory'>;

const SubCategoryScreen: FC<Props> = ({navigation, route}) => {
  const {id,item} = route.params;



  const {subCategoryData, loading, error} = useGetSubCategory(id);
  const locale = i18n.language;

  const onPress = (subCategoryId: number, subCategoryName: string) => {
    navigation.navigate('ItemCategory', {
      categoryId: String(id),
      subCategoryId: String(subCategoryId),
      searchItem: subCategoryName,
        item:item
    });
  };
  if (loading) {
    return <Loader />;
  }

  if (subCategoryData.length === 0) {
    return (
      <View
        alignItems={'center'}
        justifyContent={'center'}
        flex={1}
        bg={'white'}>
        <Text fontSize={'xl'}>No Data</Text>
      </View>
    );
  }

  const renderItem = ({item}: {item: SubCategory}) => {
    return (
      <Pressable
        my={1}
        onPress={() => {
          onPress(
            item.id,
            locale === 'en'
              ? item.subCategoryNameEn
              : locale === 'bn'
              ? item.subCategoryNameBn
              : locale === 'ar'
              ? item.subCategoryNameAr
              : item.subCategoryNameHn,
          );
        }}>
        <Text px={2} m={2} fontSize={'lg'}>
          {locale === 'en' && item.subCategoryNameEn}
          {locale === 'hn' && item.subCategoryNameHn}
          {locale === 'bn' && item.subCategoryNameBn}
          {locale === 'ar' && item.subCategoryNameAr}
        </Text>
        <Divider />
      </Pressable>
    );
  };

  return (
    <View flex={1} bg={'#fff'}>
      <VStack space={5}>
        <FlatList
          data={subCategoryData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </VStack>
    </View>
  );
};

export default SubCategoryScreen;
