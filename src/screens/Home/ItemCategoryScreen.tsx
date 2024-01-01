import {
  HStack,
  View,
  Box,
  Text,
  Divider,
  FlatList,
  Button,
  Image,
  Pressable,
} from 'native-base';
import React, {FC, useCallback, useState, useContext} from 'react';
import {RootStackScreenProps} from '../../navigation/types';
import {Modal} from 'react-native';
import BrandComponent from './components/BrandComponent';
import SortComponent from './components/SortComponent';
import FilteredScreenHeader from '../../components/FilteredScreenHeader';
import {useGetBrands} from '../../hooks/useGetBrand';
import {useGetSearchItems} from '../../hooks/useGetSearchItems';
import {SearchItems} from '../../services/types';
import {Loader} from '../../Common/Loader';
import {AuthContext} from '../../context/auth';
import SearchItem from './components/SearchItem';
import {LocationContext} from '../../context/location';
import {useTranslation} from 'react-i18next';
import i18n from "../../i18n";
type Props = RootStackScreenProps<'ItemCategory'>;

export type Search = {
  search: string;
  brandsArray: string[];
  minAmount: string;
  maxAmount: string;
  categoryId: string;
  subCategoryId: string;
  stateId: any;
  cityId: any;
  localityId: any;
  lat: number | null;
  long: number | null;

};

const ItemCategoryScreen: FC<Props> = ({navigation, route}) => {
  const {categoryId, subCategoryId, searchItem,item} = route.params;
  const locale=i18n.language;





  const [seachVal, setSearchVal] = useState(searchItem);

  const {t} = useTranslation();

  const {brands} = useGetBrands(categoryId,subCategoryId);


  const filterData = [
    {
      id: 1,
      data: t('Brand'),
    },
    {
      id: 2,
      data: t('By Budget'),
    },
  ];

  const [itemId, setItemId] = useState<number>(1);
  const [itemName, setItemName] = useState<string>('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [brandId, setBrandId] = React.useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const {userToken} = useContext(AuthContext);
  const {locationData, lat, long} = useContext(LocationContext);

  //apply data
  const [brandArrayId, setBrandArrayId] = useState<string[]>([]);
  const [minVal, setMinVal] = useState('');
  const [maxVal, setMaxVal] = useState('');

  const onSelectItem = (id: number, name: string) => {
    setItemId(id);
    setItemName(name);
  };

  const openModalHandler = useCallback(() => {
    setOpenModal(true);
  }, []);

  const onMin = (text: string) => {
    setMin(text);
  };
  const onMax = (text: string) => {
    setMax(text);
  };
  const onSetBrands = (values: any) => {
    setBrandId(values);
  };

  const onApplyHandler = () => {
    setBrandArrayId(brandId);
    setMinVal(min);
    setMaxVal(max);
    setOpenModal(false);
  };

  const onClearHandler = () => {
    setBrandArrayId([]);
    setMinVal('');
    setMaxVal('');
    setOpenModal(false);
  };

  const onPressSearch = useCallback((text: string) => {
    setSearchVal(text);
  }, []);

  const options: Search = {
    search: seachVal,
    brandsArray: brandArrayId,
    minAmount: minVal,
    maxAmount: maxVal,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    stateId: locationData?.stateId,
    cityId: locationData?.cityId,
    localityId: locationData?.localityId,
    lat: lat,
    long: long,
  };

  const {data, loading, pressFavourite} = useGetSearchItems(options);

  const addFavourite = async (id: number) => {
    if (userToken) {
      await pressFavourite(id);
    } else {
      navigation.navigate('AuthStack');
    }
  };

  if (loading) {
    return <Loader />;
  }

  const renderItem = ({item}: {item: SearchItems}) => (
    <SearchItem item={item} addFavourite={addFavourite} />
  );

  return (
    <View flex={1} bg={'white'}>
      <FilteredScreenHeader
        searchItem={seachVal}
        onPressSearch={onPressSearch}
        openModalHandler={openModalHandler}
      />
      <Divider mt={2} bg={'grey'} />
      {data.length == 0 ? (
        <View flex={1} alignItems={'center'} justifyContent={'center'}>
          <Image
            w={80}
            h={80}
            alt={'no image'}
            source={require('../../../assets/images/No_Items.png')}
          />
          <Text fontSize={'2xl'} bold>
            {t('No Ads Found')}
          </Text>
        </View>
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
      <Modal animationType="slide" transparent={true} visible={openModal}>
        <View
          borderTopRadius={10}
          style={{marginTop: 10}}
          flex={1}
          bg={'white'}>
          <Pressable
            onPress={() => {
              setOpenModal(false);
            }}>
            <Divider mt={2} h={1} alignSelf={'center'} w={12} bg={'gray.400'} />
          </Pressable>

          <HStack
            my={2}
            px={2}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text bold fontSize={'xl'}>
              {t('FILTERS & SORT')}
            </Text>
            <Text w={'40%'} numberOfLines={1}>
              {t('Category')}:{' '}
              <Text underline bold fontSize={'md'}>
                {
                  locale === 'en'
                     ? item?.categoryNameEn
                     : locale === 'bn'
                     ? item?.categoryNameBn
                     : locale === 'ar'
                     ? item?.categoryNameAr
                     : item?.categoryNameHn}
              </Text>
            </Text>
          </HStack>

          <Divider />

          <Box flexDirection={'row'} bg={'#fff'} flex={1}>
            <Box bg={'aliceblue'} flex={1}>
              {filterData.map((item: any, index: any) => {
                const activeItem = item.id === itemId;

                return (
                  <Pressable
                    onPress={() => {
                      onSelectItem(item.id, item.data);
                    }}>
                    <Box
                      bg={activeItem ? 'white' : 'aliceblue'}
                      alignItems={'center'}>
                      <Text my={2} fontSize={'md'}>
                        {item.data}
                      </Text>
                      <Divider />
                    </Box>
                  </Pressable>
                );
              })}
            </Box>

            <Box flex={2}>
              {itemId === 1 ? (
                <BrandComponent
                  brands={brands}
                  brandId={brandId}
                  onSetBrands={onSetBrands}
                />
              ) : (
                <SortComponent
                  min={min}
                  max={max}
                  onMin={onMin}
                  onMax={onMax}
                />
              )}
            </Box>
          </Box>
          <Box>
            <Divider />
            <HStack my={2} justifyContent={'space-evenly'}>
              <Button
                _text={{fontWeight: 'bold'}}
                variant={'outline'}
                onPress={onClearHandler}
                px={12}>
                {t('Clear all')}
              </Button>
              <Button
                _text={{fontWeight: 'bold'}}
                px={12}
                onPress={onApplyHandler}>
                {t('Apply')}
              </Button>
            </HStack>
          </Box>
        </View>
      </Modal>
    </View>
  );
};

export default ItemCategoryScreen;
