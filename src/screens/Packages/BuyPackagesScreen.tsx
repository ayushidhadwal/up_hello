import {
  HStack,
  Image,
  Text,
  VStack,
  View,
  Box,
  Button,
  Divider,
  Pressable,
} from 'native-base';
import React, { FC, useContext } from 'react';

import { PackagesStackScreenProps } from '../../navigation/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { LocationContext } from '../../context/location';
import { useTranslation } from 'react-i18next';

type Props = PackagesStackScreenProps<'BuyPackages'>;

const BuyPackagesScreen: FC<Props> = ({ navigation, route }) => {

  const { subCategory } = route.params;

  const {t} = useTranslation

  const { locationDesc, locationData, lat, long } = useContext(LocationContext);


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flex: 1,
        }}>
        <VStack style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Select  options to show Packages
          </Text>
        </VStack>



        <Pressable onPress={() => navigation.navigate('PackageCategoryScreen')}>
          <HStack px={4} py={3} justifyContent={'space-between'} alignItems={'center'}>
            <VStack flex={1}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Category</Text>
              <Text numberOfLines={1}>{subCategory !== '' ? subCategory : "Search category"}</Text>
            </VStack>
            <MaterialIcons
              style={{ alignSelf: 'center', marginTop: 8 }}
              name="arrow-forward-ios"
              size={18}
              color="black"
            />
          </HStack>
        </Pressable>
        <Divider />

        <Pressable onPress={() => navigation.navigate('PackageStateScreen')}>
          <HStack px={4} py={3} justifyContent={'space-between'} alignItems={'center'}>
            <VStack flex={1}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Location</Text>
              {locationDesc ? (
                <Text numberOfLines={1}>{locationDesc}</Text>
              ) : locationData?.stateName && locationData?.cityName && locationData?.localityName ? (
                <Text numberOfLines={1}>{locationData?.stateName + ',' + locationData?.cityName + ',' + locationData?.localityName}</Text>
              ) : (
                <Text numberOfLines={1}>{t("Choose Location")}</Text>
              )
              }
            </VStack>
            <MaterialIcons
              style={{ alignSelf: 'center', marginTop: 8 }}
              name="arrow-forward-ios"
              size={18}
              color="black"
            />
          </HStack>
        </Pressable>



        <Divider />
        <HStack
          style={{
            width: '90%',
            backgroundColor: '#f2f2f2',
            alignSelf: 'center',
            padding: 15,
            marginTop: 15,
            paddingHorizontal:10,
            borderRadius:10
          }}>
          <Feather
            style={{ marginTop: 2, marginRight: 5 }}
            name="info"
            size={15}
            color={'red'}
          />
          <Text>
            The package you choose will only be valid for the selected category
            and country
          </Text>
        </HStack>
      </View>

      <Button
        borderRadius={10}
        mb={5}
        alignSelf={'center'}
        colorScheme={'red'}
        width={'90%'}>
        <Text color={'white'} bold fontSize={'lg'}>
          Show Packages
        </Text>
      </Button>
    </View >
  );
};

export default BuyPackagesScreen;
