import {
  View,
  Text,
  Pressable,
  Input,
  Button,
  FlatList,
  VStack,
  HStack,
  Box,
} from 'native-base';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, Dimensions, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ErrMessage} from '../../../utils/toastMessage';
import {RootStackScreenProps} from '../../../navigation/types';
import {useGetBrands} from '../../../hooks/useGetBrand';
import i18n from 'i18next';

type Props = RootStackScreenProps<'CommercialVehicle'>;

const CommercialVechicles: FC<Props> = ({navigation, route}) => {
  const {categoryId, subCategoryId, item} = route.params;
  const {brands, error} = useGetBrands(categoryId, subCategoryId);

  const {t} = useTranslation();

  const [typeModal, setTypeModal] = useState(false);
  const locale = i18n.language;

  const [title, setTitle] = useState(
    item?.add_title == null || item?.add_title == 'null'
      ? ''
      : item?.add_title == undefined || item?.add_title == 'undefined'
      ? ''
      : item?.add_title,
  );
  const [year, setYear] = useState(
    item?.year == null || item?.year == 'null'
      ? ''
      : item?.year == undefined || item?.year == 'undefined'
      ? ''
      : item?.year,
  );
  const [desc, setDesc] = useState(
    item?.description == null || item?.description == 'null'
      ? ''
      : item?.description == undefined || item?.description == 'undefined'
      ? ''
      : item?.description,
  );
  const [type, setType] = useState(
    item?.type == null || item?.type == 'null'
      ? ''
      : item?.type == undefined || item?.type == 'undefined'
      ? ''
      : item?.type,
  );
  const [km, setKm] = useState(
    item?.km_driven == null || item?.km_driven == 'null'
      ? ''
      : item?.km_driven == undefined || item?.km_driven == 'undefined'
      ? ''
      : item?.km_driven,
  );

  const data = [
    {
      id: 1,
      name: t('Auto-rickshaws & E-rickshaws'),
    },
    {
      id: 2,
      name: t('Buses'),
    },
    {
      id: 3,
      name: t('Ducati'),
    },
    {
      id: 4,
      name: t('Trucks'),
    },
    {
      id: 5,
      name: t('Heavy Machinery'),
    },
    {
      id: 6,
      name: t('Modified Jeeps'),
    },
    {
      id: 7,
      name: t('Scrap Cars'),
    },
    {
      id: 8,
      name: t('Tractors'),
    },
    {
      id: 9,
      name: t('Others'),
    },
  ];

  const height = Dimensions.get('window').height;

  const renderItem = ({item}: {item: any}) => {
    return (
      <Pressable
        onPress={() => {
          setTypeModal(false);
          setType(item.name);
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
    if (year == '' || km == '' || title == '' || desc == '') {
      ErrMessage(t('Required fields cannot be empty'));
    } else {
      navigation.navigate('AddImages', {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        bikes: null,
        cars: null,
        commercial: {
          year: year,
          kmDriven: km,
          type: type,
        },
        mobile: null,
        properties: null,
        title: title,
        description: desc,
        item: item,
      });
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <ScrollView>
        <Box flex={1} pt={10}>
          <VStack space={6}>
            <Pressable
              mx={5}
              onPress={() => {
                setTypeModal(true);
              }}
              w={'90%'}
              borderBottomWidth={0.5}
              borderColor={'silver'}
              variant={'underlined'}
              h={8}>
              <Text color={type == '' ? 'grey' : 'black'}>
                {type == '' ? t('Type') : type}
              </Text>
            </Pressable>
            <Input
              value={year}
              onChangeText={text => {
                setYear(text);
              }}
              placeholder={t('Year *')}
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
              placeholder={t('KM driven *')}
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
              placeholder={t('Ad Title *')}
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
              placeholder={t('Describe what you are selling *')}
              placeholderTextColor={'grey'}
              mt={2}
              w={'90%'}
              variant={'underlined'}
              alignSelf={'center'}
            />
          </VStack>
          <Text mx={3} mt={1} color={'grey'}>
            * {t('Required fields')}
          </Text>
        </Box>
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
      <Modal transparent={true} visible={typeModal}>
        <Pressable
          onPress={() => {
            setTypeModal(false);
          }}
          alignItems={'center'}
          justifyContent={'center'}
          flex={1}
          bg={'rgba(0,0,0,0.5)'}>
          <Pressable p={4} maxHeight={height - 90} w={'90%'} bg={'white'}>
            <Text fontSize={'xl'}>{t('Type')}</Text>
            <Text bold fontSize={'lg'} mt={6}>
              {t('Popular')}
            </Text>
            <FlatList data={brands} renderItem={renderItem} />
            <Text
              mt={2}
              onPress={() => {
                setTypeModal(false);
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

export default CommercialVechicles;
