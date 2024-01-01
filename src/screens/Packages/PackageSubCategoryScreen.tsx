import { Text, View, VStack, FlatList, Divider, Pressable } from 'native-base';
import React, { FC, useContext } from 'react';
import { PackagesStackScreenProps } from '../../navigation/types';
import { useGetSubCategory } from '../../hooks/category/useGetSubCategory';
import { Loader } from '../../Common/Loader';
import { AuthContext } from '../../context/auth';
import i18n from '../../i18n';
import { SubCategory } from '../../services/types';


type Props = PackagesStackScreenProps<'PackageSubCategoryScreen'>;

const PackageSubCategoryScreen: FC<Props> = ({ navigation, route }) => {
  const { id, item } = route.params;


  const { subCategoryData, loading, error } = useGetSubCategory(id);

  const { setCategory } = useContext(AuthContext)

  const locale = i18n.language;

  const onPress = (subCategoryId: number, subCategoryName: string) => {
    setCategory(subCategoryName);
    navigation.navigate('BuyPackages', { subCategory: subCategoryName })
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

  const renderItem = ({ item }: { item: SubCategory }) => {
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

export default PackageSubCategoryScreen;
