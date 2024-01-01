import { FlatList, Text, View, HStack, Pressable } from 'native-base'
import React, { FC, useContext } from 'react'
import { t } from "i18next";
import { PackagesStackScreenProps } from '../../navigation/types';
import { useGetLocality } from '../../hooks/location/useGetLocality';
import { LocationContext } from '../../context/location';
import { Loader } from '../../Common/Loader';
import { LocalityType } from '../../services/types';
import { AuthContext } from '../../context/auth';


type Props = PackagesStackScreenProps<'PackageLocalityScreen'>;


export type LocationObject = {
  cityId: number;
  stateId: number;
  cityName: string;
  stateName: string;
  localityId: number;
  localityName: string;
}


const PackageLocalityScreen: FC<Props> = ({ route, navigation }) => {


  const { cityId, stateId, cityName, stateName, } = route.params

  const { locality, localityLoading, error } = useGetLocality(cityId)

  if (localityLoading) {
    return <Loader />
  }

  const {PackageSubCategory} = useContext(AuthContext)



  const { setLocationObject } = useContext(LocationContext)


  const setLocation = async (localityName: string, localityId: number) => {
    const locationObject: LocationObject = {
      cityId: cityId,
      stateId: stateId,
      cityName: cityName,
      stateName: stateName,
      localityId: localityId,
      localityName: localityName
    }
    setLocationObject(locationObject);
    navigation.navigate('BuyPackages',{subCategory:PackageSubCategory})
  }

  const renderItem = ({ item }: { item: LocalityType }) => {
    return (
      <Pressable
        onPress={() => setLocation(item.localityName, item.id)}
      >
        <HStack justifyContent={'space-between'} my={2} px={3}>
          <Text fontSize={'md'}>{item.localityName}</Text>
        </HStack>
      </Pressable>
    )
  }

  return (
    <View flex={1} bg={'white'}>
      <Text fontSize={'lg'} mt={1} color={'gray.500'} px={3}>{t("Choose Locality")}</Text>
      <FlatList my={2} data={locality} renderItem={renderItem} />
    </View>
  )
}

export default PackageLocalityScreen
