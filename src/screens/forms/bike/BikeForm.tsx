import {
  View,
  Text,
  VStack,
  Input,
  Button,
  Pressable,
  FlatList,
  HStack,
} from 'native-base';
import React, {useState, FC, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Dimensions, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ErrMessage} from '../../../utils/toastMessage';
import {RootStackScreenProps} from '../../../navigation/types';
import {useGetBrands} from '../../../hooks/useGetBrand';
import {Brand} from '../../../services/types';
import i18n from '../../../i18n';
import { AuthContext } from '../../../context/auth';

type Props = RootStackScreenProps<'BikeForm'>;

const BikeForm: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();

  const locale = i18n.language;

  const {categoryId, subCategoryId, item} = route.params;

  const [brandModel, setBrandModal] = useState(false);


  const {setBrandId} = useContext(AuthContext)

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
  const [km, setKm] = useState(
    item?.km_driven == null || item?.km_driven == 'null'
      ? ''
      : item?.km_driven == undefined || item?.km_driven == 'undefined'
      ? ''
      : item?.km_driven,
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

  const {brands} = useGetBrands(categoryId, subCategoryId);

  const height = Dimensions.get('window').height;

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
              : item.brandNamehn)
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

  const onNext = () => {
    if (brand == '' || year == '' || km == '' || title == '' || desc == '') {
      ErrMessage(t('All fields are required'));
    } else {
      navigation.navigate('AddImages', {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        bikes: {
          brand: brand,
          kmDriven: km,
          year: year,
        },
        cars: null,
        commercial: null,
        mobile: null,
        properties: null,
        description: desc,
        title: title,
        item: item,
      });
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <ScrollView>
        <VStack flex={1} pt={10} space={6}>
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
            <Text color={brand == '' ? 'grey' : 'black'}>
              {brand == '' ? t('Brand*') : brand}
            </Text>
          </Pressable>
          <Input
            value={year}
            onChangeText={text => {
              setYear(text);
            }}
            placeholder={t('Year')}
            placeholderTextColor={'grey'}
            my={2}
            w={'90%'}
            keyboardType="numeric"
            variant={'underlined'}
            alignSelf={'center'}
          />
          <Input
            value={km}
            onChangeText={text => {
              setKm(text);
            }}
            placeholder={t('KM driven')}
            placeholderTextColor={'grey'}
            my={2}
            w={'90%'}
            keyboardType="numeric"
            variant={'underlined'}
            alignSelf={'center'}
          />
          <Input
            value={title}
            onChangeText={text => {
              setTitle(text);
            }}
            placeholder={t('Ad Title')}
            placeholderTextColor={'grey'}
            mt={2}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
          />
          <Input
            multiline={true}
            value={desc}
            onChangeText={text => {
              setDesc(text);
            }}
            placeholder={t('Describe what you are selling')}
            placeholderTextColor={'grey'}
            mt={2}
            w={'90%'}
            variant={'underlined'}
            alignSelf={'center'}
          />
        </VStack>
      </ScrollView>
      <Button
        onPress={onNext}
        mb={10}
        mx={6}
        colorScheme={'red'}
        _text={{fontSize: 'lg'}}
        m={2}>
        {t('Next')}
      </Button>

      {/* brand modal */}
      <Modal transparent={true} visible={brandModel}>
        <Pressable
          onPress={() => {
            setBrandModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Text fontSize={'xl'}>
              <Text color={'gray.400'}>{t('Motorcycles')} {'>'} </Text>
              {t('Brand')}
            </Text>
            <Text bold fontSize={'lg'} mt={6}>
              {t('Popular')}
            </Text>
            <FlatList data={brands} renderItem={renderItem} />
            <Text
              mt={2}
              onPress={() => {
                setBrandModal(false);
              }}
              alignSelf={'flex-end'}
              fontSize={'lg'}>
              {t('Cancel')}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default BikeForm;
