import {
  View,
  Text,
  VStack,
  Input,
  Box,
  Pressable,
  FlatList,
  HStack,
  ScrollView,
  Button,
} from 'native-base';
import React, {useState, FC, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootStackScreenProps} from '../../../navigation/types';
import {ErrMessage} from '../../../utils/toastMessage';
import {useGetBrands} from '../../../hooks/useGetBrand';
import i18n from '../../../i18n';
import {Brand} from '../../../services/types';
import { AuthContext } from '../../../context/auth';

type Props = RootStackScreenProps<'CarForm'>;

const CarForm: FC<Props> = ({navigation, route}) => {
  const {categoryId, subCategoryId, item} = route.params;

  const {t} = useTranslation();


  const {brands, error} = useGetBrands(categoryId, subCategoryId);

  const locale = i18n.language;

  const {setBrandId} = useContext(AuthContext)



  // value state
  const [brand, setBrand] = useState(
    item?.brand_name == null || item?.brand_name == 'null'
      ? ''
      : item?.brand_name == undefined || item?.brand_name == 'undefined'
      ? ''
      : item?.brand_name,
  );
  const [year, setYear] = useState(
    item?.year == null || item?.year == 'null'
      ? ''
      : item?.year == undefined || item?.year == 'undefined'
      ? ''
      : item?.year,
  );
  const [fuel, setFuel] = useState(
    item?.fuel == null || item?.fuel == 'null'
      ? ''
      : item?.fuel == undefined || item?.fuel == 'undefined'
      ? ''
      : item?.fuel,
  );
  const [transmission, setTransmission] = useState(
    item?.transmission == null || item?.transmission == 'null'
      ? ''
      : item?.transmission == undefined || item?.transmission == 'undefined'
      ? ''
      : item?.transmission,
  );
  const [km, setkm] = useState(
    item?.km_driven == null || item?.km_driven == 'null'
      ? ''
      : item?.km_driven == undefined || item?.km_driven == 'undefined'
      ? ''
      : item?.km_driven,
  );
  const [noOwner, setNoOwner] = useState(
    item?.no_of_owners == null || item?.no_of_owners == 'null'
      ? ''
      : item?.no_of_owners == undefined || item?.no_of_owners == 'undefined'
      ? ''
      : item?.no_of_owners,
  );
  const [title, setTitle] = useState(
    item?.add_title == null || item?.add_title == 'null'
      ? ''
      : item?.add_title == undefined || item?.add_title == 'undefined'
      ? ''
      : item?.add_title,
  );
  const [desc, setDesc] = useState(
    item?.description == null || item?.description == 'null'
      ? ''
      : item?.description == undefined || item?.description == 'undefined'
      ? ''
      : item?.description,
  );

  const [id, setId] = useState(0);
  //Modal state
  const [brandModel, setBrandModal] = useState(false);
  const [fuelModal, setFuelModal] = useState(false);
  const [ownerModal, setOwnerModal] = useState(false);

  const height = Dimensions.get('window').height;

  const onNext = () => {
    if (brand == '' || year == '' || fuel == '' || title == '' || desc == '') {
      ErrMessage(t('Required fields cannot be empty'));
    } else {
      navigation.navigate('AddImages', {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        cars: {
          brand: brand,
          fuel: fuel,
          kmDriven: km,
          noOfOwner: noOwner,
          transmission: transmission,
          year: year,
        },
        bikes: null,
        commercial: null,
        mobile: null,
        properties: null,
        title: title,
        description: desc,
        item: item,
      });
    }
  };

  const renderItem = ({item}: {item: Brand}) => {
    return (
      <Pressable
        onPress={() => {
          setBrandModal(false);
          setBrand(locale == 'en'
          ? item.brandName
          : locale == 'bn'
              ? item.brandNamebn
              : locale == 'ar'
                  ? item.brandNamear
                  : item.brandNamehn);
          setBrandId(item.id)
        }}>
        <HStack my={3} mx={1} justifyContent={'space-between'}>
          <Text fontSize={'md'}>
            {locale == 'en'
              ? item.brandName
              : locale == 'bn'
              ? item.brandNamebn
              : locale == 'ar'
              ? item.brandNamear
              : item.brandNamehn}
          </Text>
          <AntDesign name="right" size={20} />
        </HStack>
      </Pressable>
    );
  };

  const onSelectTransmission = (id: number, name: string) => {
    setId(id);
    setTransmission(name);
  };

  return (
    <View backgroundColor={'white'} flex={1}>
      <ScrollView>
        <Box flex={1} pt={5}>
          <VStack space={3}>
            <Pressable
              mx={5}
              onPress={() => {
                setBrandModal(true);
              }}
              w={'90%'}
              borderBottomWidth={0.5}
              borderColor={'silver'}
              variant={'underlined'}
              h={8}>
              <Text fontSize={13} color={brand == '' ? 'grey' : 'black'}>
                {brand == '' ? t('Brand*') : brand}
              </Text>
            </Pressable>
            <Input
              value={year}
              onChangeText={text => {
                setYear(text);
              }}
              placeholder={`${t('Year')} *`}
              placeholderTextColor={'grey'}
              my={2}
              w={'90%'}
              keyboardType="numeric"
              variant={'underlined'}
              alignSelf={'center'}
            />

            <Pressable
              mx={5}
              mt={2}
              onPress={() => {
                setFuelModal(true);
              }}
              w={'90%'}
              borderBottomWidth={0.5}
              borderColor={'silver'}
              variant={'underlined'}
              h={8}>
              <Text fontSize={13} color={fuel == '' ? 'grey' : 'black'}>
                {fuel == '' ? t('Fuel *') : fuel}
              </Text>
            </Pressable>

            <Box m={2}>
              <Text mx={2}>{t('Transmission')}</Text>
              <HStack mt={4} justifyContent={'space-evenly'}>
                <Pressable
                  onPress={() => {
                    onSelectTransmission(1, 'AutoMatic');
                  }}
                  backgroundColor={
                    transmission == t('AutoMatic') ? 'red.100' : 'white'
                  }
                  borderColor={id == 1 ? 'red.500' : 'black'}
                  borderRadius={10}
                  alignItems={'center'}
                  w={'40%'}
                  p={3}
                  borderWidth={1}>
                  <Text
                    fontSize={13}
                    color={transmission == 'AutoMatic' ? 'red.500' : 'black'}>
                    {t('AutoMatic')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    onSelectTransmission(2, 'Manual');
                  }}
                  backgroundColor={
                    transmission == t('Manual') ? 'red.100' : 'white'
                  }
                  borderColor={id == 2 ? 'red.500' : 'black'}
                  borderRadius={10}
                  alignItems={'center'}
                  w={'40%'}
                  p={3}
                  borderWidth={1}>
                  <Text
                    fontSize={13}
                    color={transmission == 'Manual' ? 'red.500' : 'black'}>
                    {t('Manual')}
                  </Text>
                </Pressable>
              </HStack>
            </Box>
            <Input
              value={km}
              onChangeText={text => {
                setkm(text);
              }}
              placeholder={t('KM driven')}
              placeholderTextColor={'grey'}
              my={2}
              w={'90%'}
              keyboardType="numeric"
              variant={'underlined'}
              alignSelf={'center'}
            />

            <Pressable
              mx={5}
              mt={2}
              onPress={() => {
                setOwnerModal(true);
              }}
              w={'90%'}
              borderBottomWidth={0.5}
              borderColor={'gray.700'}
              variant={'underlined'}
              h={8}>
              <Text fontSize={13} color={noOwner == '' ? 'grey' : 'black'}>
                {noOwner == '' ? t('No. of Owners') : noOwner}
              </Text>
            </Pressable>
            <Input
              value={title}
              onChangeText={text => {
                setTitle(text);
              }}
              placeholder={t('Ad Title *')}
              placeholderTextColor={'grey'}
              my={2}
              w={'90%'}
              variant={'underlined'}
              alignSelf={'center'}
            />
            <Input
              value={desc}
              onChangeText={text => {
                setDesc(text);
              }}
              placeholder={t('Describe what are you selling *')}
              placeholderTextColor={'grey'}
              my={2}
              w={'90%'}
              variant={'underlined'}
              alignSelf={'center'}
            />
          </VStack>
          <Text color={'grey'} mx={3} mt={1}>
            * {t('Required fields')}
          </Text>
        </Box>
      </ScrollView>

      <Button onPress={onNext} m={2} mx={8} colorScheme={'red'}>
        {t('Next')}
      </Button>

      {/* Brand Modal */}
      <Modal transparent={true} visible={brandModel}>
        <Pressable
          onPress={() => {
            setBrandModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable
            p={4}
            maxHeight={height - 90}
            minHeight={height - 90}
            w={'90%'}
            bg={'white'}>
            <Text fontSize={'xl'}>{t('Brand')}</Text>
            <Text bold fontSize={'lg'} mt={6}>
              {t('Popular')}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={brands}
              renderItem={renderItem}
            />
            <Text
              alignSelf={'flex-end'}
              fontSize={'lg'}
              onPress={() => {
                setBrandModal(false);
              }}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Fuel Modal */}
      <Modal transparent={true} visible={fuelModal}>
        <Pressable
          onPress={() => {
            setFuelModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} w={'90%'} bg={'white'}>
            <Text fontSize={'xl'}>{t('Fuel')}</Text>
            <Text
              onPress={() => {
                setFuelModal(false);
                setFuel(t('CNG & Hybrids'));
              }}
              fontSize={'md'}
              mt={6}>
              {t('CNG & Hybrids')}
            </Text>
            <Text
              onPress={() => {
                setFuelModal(false);
                setFuel(t('Petrol'));
              }}
              fontSize={'md'}
              mt={4}>
              {t('Petrol')}
            </Text>
            <Text
              onPress={() => {
                setFuelModal(false);
                setFuel(t('Diesel'));
              }}
              fontSize={'md'}
              mt={4}>
              {t('Diesel')}
            </Text>
            <Text
              onPress={() => {
                setFuelModal(false);
                setFuel(t('Electric'));
              }}
              fontSize={'md'}
              mt={4}>
              {t('Electric')}
            </Text>
            <Text
              alignSelf={'flex-end'}
              fontSize={'lg'}
              onPress={() => {
                setFuelModal(false);
              }}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* NO OF OWNERS */}
      <Modal transparent={true} visible={ownerModal}>
        <Pressable
          onPress={() => {
            setOwnerModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} w={'90%'} bg={'white'}>
            <Text fontSize={'xl'}>{t('No. of Owners')}</Text>
            <Text
              onPress={() => {
                setOwnerModal(false);
                setNoOwner('1st');
              }}
              fontSize={'md'}
              mt={6}>
              1
            </Text>
            <Text
              onPress={() => {
                setOwnerModal(false);
                setNoOwner('2nd');
              }}
              fontSize={'md'}
              mt={4}>
              2
            </Text>
            <Text
              onPress={() => {
                setOwnerModal(false);
                setNoOwner('3rd');
              }}
              fontSize={'md'}
              mt={4}>
              3
            </Text>
            <Text
              onPress={() => {
                setOwnerModal(false);
                setNoOwner('4th');
              }}
              fontSize={'md'}
              mt={4}>
              4
            </Text>
            <Text
              onPress={() => {
                setOwnerModal(false);
                setNoOwner('4+');
              }}
              fontSize={'md'}
              mt={4}>
              4+
            </Text>
            <Text
              alignSelf={'flex-end'}
              fontSize={'lg'}
              onPress={() => {
                setOwnerModal(false);
              }}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CarForm;
