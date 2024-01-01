import React, {FC} from 'react';
import {RootStackScreenProps} from '../../navigation/types';
import {View, Text, FlatList, Pressable, Divider} from 'native-base';
import {useGetSubCategory} from '../../hooks/category/useGetSubCategory';
import {SubCategory} from '../../services/types';
import {Loader} from '../../Common/Loader';
import i18n from '../../i18n';

type Props = RootStackScreenProps<'AddSubCategory'>;

const AddSubCategory: FC<Props> = ({navigation, route}) => {
  const {id} = route.params;

  const onPress = (formId: string, subCategoryId: number) => {
    switch (formId) {
      // cars
      case 'cars':
        navigation.navigate('CarForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;

      //Properties
      case 'for_rent_shops_&_offices':
        navigation.navigate('PropertyForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;
      case 'lands_&_plots':
        navigation.navigate('PropertyForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;
      case 'for_rent_houses_&_apartments':
        navigation.navigate('PropertyForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;
      case 'pg_&_guest_houses':
        navigation.navigate('PropertyForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;
      case 'for_sale_shops_&_offices':
        navigation.navigate('PropertyForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;
      case 'for_sale_shops_&_offices':
        navigation.navigate('PropertyForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;

      // motorcycles
      case 'motorcycles':
        navigation.navigate('BikeForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;
      case 'scooters':
        navigation.navigate('BikeForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;

      // Commercial Vehicles
      case 'commercial_&_other_vehicles':
        navigation.navigate('CommercialVehicle', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;

      //Mobile Phone
      case 'mobile_phones':
        navigation.navigate('MobileForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;

      case 'tablets':
        navigation.navigate('MobileForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;

      default:
        navigation.navigate('DefaultForm', {
          categoryId: String(id),
          subCategoryId: String(subCategoryId),
          item: '',
        });
        break;
    }
  };

  const locale = i18n.language;

  const {subCategoryData, loading} = useGetSubCategory(id);

  if (loading) {
    return <Loader />;
  }

  const renderItem = ({item}: {item: SubCategory}) => {
    const checkItem = item.subCategoryNameEn == 'View All';
    return (
      <>
        {!checkItem && (
          <Pressable
            my={1}
            onPress={() => {
              onPress(item.formType, item.id);
            }}>
            <Text px={2} m={2} fontSize={'lg'}>
              {locale === 'en' && item.subCategoryNameEn}
              {locale === 'bn' && item.subCategoryNameBn}
              {locale === 'ar' && item.subCategoryNameAr}
              {locale === 'hn' && item.subCategoryNameHn}
            </Text>
            <Divider />
          </Pressable>
        )}
      </>
    );
  };

  return (
    <View flex={1} bg={'white'}>
      <FlatList data={subCategoryData} renderItem={renderItem} />
    </View>
  );
};

export default AddSubCategory;
