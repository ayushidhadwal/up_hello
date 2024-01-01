import {Text, Box, VStack, Divider, Menu, Pressable, HStack} from 'native-base';
import React, {FC, useContext, useState} from 'react';
import {MYItems} from '../../services/types';
import Config from '../../config';
import ImageBackground from '../../components/ImageBackground';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Alert} from 'react-native';
import {Loader} from '../../Common/Loader';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import {useTranslation} from 'react-i18next';
import {LangContext} from '../../context/lang';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text as RNText} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  items: any;
  onDelete: (id: number) => void;
};

const MyItemComponent: FC<Props> = ({items, onDelete}) => {
  const {currency} = useContext(LangContext);

  const navigation = useNavigation<RootNavigationProps>();

  const [loading, setLoading] = useState<boolean>(false);

  const {t} = useTranslation();

  if (loading) {
    return <Loader />;
  }

  const onPressDelete = () => {
    Alert.alert(
      t('Delete'),
      t('You are about to delete ad you wont be able to undo this.'),
      [
        {
          text: t('Cancel'),

          style: 'cancel',
        },
        {
          text: t('Delete'),
          onPress: () => {
            onDelete(items?.id);
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onPressEdit = () => {
    switch (items?.slug) {
      // cars
      case 'cars':
        navigation.navigate('CarForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;

      //Properties
      case 'for_rent_shops_&_offices':
        navigation.navigate('PropertyForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;
      case 'lands_&_plots':
        navigation.navigate('PropertyForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;
      case 'for_rent_houses_&_apartments':
        navigation.navigate('PropertyForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;
      case 'pg_&_guest_houses':
        navigation.navigate('PropertyForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;
      case 'for_sale_shops_&_offices':
        navigation.navigate('PropertyForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;
      case 'for_sale_shops_&_offices':
        navigation.navigate('PropertyForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;

      // motorcycles
      case 'motorcycles':
        navigation.navigate('BikeForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;
      case 'scooters':
        navigation.navigate('BikeForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;

      // Commercial Vehicles
      case 'commercial_&_other_vehicles':
        navigation.navigate('CommercialVehicle', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;

      //Mobile Phone
      case 'mobile_phones':
        navigation.navigate('MobileForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;

      case 'tablets':
        navigation.navigate('MobileForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;

      default:
        navigation.navigate('DefaultForm', {
          categoryId: String(items?.category_id),
          subCategoryId: String(items?.subcategory_id),
          item: items,
        });
        break;
    }
  };

  function Example() {
    return (
      <Box>
        <Menu
          w="190"
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <SimpleLineIcons size={24} name="options" color={'black'} />
              </Pressable>
            );
          }}>
          {/* <Menu.Item onPress={onEdit}>Edit</Menu.Item> */}
          <Menu.Item onPress={() => onPressEdit()}>{t('Edit')}</Menu.Item>
          <Menu.Item onPress={() => onPressDelete()}>{t('Delete')}</Menu.Item>
        </Menu>
      </Box>
    );
  }

  return (
    <Pressable
      onPress={
        items?.sold_out
          ? () => {}
          : () => {
              navigation.navigate('MyAdsDetails', {id: items?.id});
            }
      }>
      <Box
        mx={2}
        shadow={1}
        backgroundColor={'white'}
        borderWidth={0.5}
        borderRadius={5}
        borderColor={'silver'}
        my={2}>
        <HStack
          px={2}
          alignItems={'center'}
          justifyContent={'space-between'}
          py={1}
          bg={'gray.200'}>
          <RNText>
            {t('Posted on')}:
            <RNText style={{fontWeight: 'bold'}}>
              {moment(items.created_at).format('MMMM Do YYYY')}
            </RNText>
          </RNText>

          {/*<RNText>*/}
          {/*  Posted On:{' '}*/}
          {/*  <RNText style={{fontWeight: 'bold'}}>*/}
          {/*    {moment(items?.created_at).format('MMMM Do YYYY')}*/}
          {/*  </RNText>*/}
          {/*</RNText>*/}

          <Example />
        </HStack>
        <Box flex={1} my={2} flexDirection={'row'}>
          <ImageBackground
            alt="no img"
            resizeMode="contain"
            style={{
              width: 90,
              height: 90,
              marginHorizontal: 6,
            }}
            source={{uri: `${Config.API_URL}/public/${items?.item_images[0]}`}}
          />
          <VStack space={1} flex={1}>
            <VStack space={0.5} flex={1}>
              <RNText style={{fontSize: 16, fontWeight: 'bold'}}>
                {items?.add_title}
              </RNText>
              <Text fontSize={'md'}>
                {items?.c_symbol}{' '}{items?.set_a_price}
              </Text>
            </VStack>
            <HStack alignItems={'center'} space={2}>
              <Ionicons size={16} name={'eye-outline'} />

              <HStack alignItems={'center'} space={0.5}>
                <RNText style={{fontWeight: 'bold'}}>{t('Views')}:</RNText>
                <Text>{items.view_count}</Text>
              </HStack>
              <RNText style={{fontWeight: 'bold', fontSize: 16, bottom: 2}}>
                |
              </RNText>
              <AntDesign name="heart" size={14} />
              <HStack alignItems={'center'} space={0.5}>
                <RNText style={{fontWeight: 'bold'}}>{t('Likes')}:</RNText>
                <Text>{items.favorite_count}</Text>

                {/*<HStack alignItems={'center'} space={0.5}>*/}
                {/*  <RNText style={{fontWeight: 'bold'}}>Views:</RNText>*/}
                {/*  <Text>{items?.view_count}</Text>*/}
                {/*</HStack>*/}
                {/*<RNText style={{fontWeight: 'bold', fontSize: 16, bottom: 2}}>*/}
                {/*  |*/}
                {/*</RNText>*/}
                {/*<AntDesign name="heart" size={14} />*/}
                {/*<HStack alignItems={'center'} space={0.5}>*/}
                {/*  <RNText style={{fontWeight: 'bold'}}>Likes:</RNText>*/}
                {/*  <Text>{items?.favorite_count}</Text>*/}
                {/*</HStack>*/}
              </HStack>
            </HStack>
          </VStack>
        </Box>
        <Divider alignSelf={'center'} w={'90%'} mt={2} />
        <Box
          mt={3}
          mx={2}
          alignItems={'center'}
          borderRadius={10}
          width={'100'}
          bg={items?.sold_out ? 'red.500' : 'green.500'}>
          <Text fontWeight={'bold'} p={1} color={'white'} fontSize={'md'}>
            {items?.sold_out ? t('Sold Out') : t('Active')}
          </Text>
        </Box>
        <Text mx={3} mb={10} mt={1}>
          {items?.sold_out
            ? t('Item Sold Out')
            : t('This ad is currently live')}
        </Text>
      </Box>
    </Pressable>
  );
};

export default MyItemComponent;
