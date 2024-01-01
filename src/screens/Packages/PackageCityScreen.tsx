import React, { FC } from 'react'
import { FlatList, Pressable, View, HStack, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {t} from "i18next";
import { PackagesStackScreenProps } from '../../navigation/types';
import { useGetCity } from '../../hooks/location/useGetCity';
import { Loader } from '../../Common/Loader';
import { CityType } from '../../services/types';



type Props = PackagesStackScreenProps<'PackageCityScreen'>;

const CityListScreen: FC<Props> = ({ navigation, route }) => {

    const { id, name } = route.params


    const { city, cityLoading, error } = useGetCity(id)

    if (error) {
        return (
            <View>
                <Text>{t("Something Went Wrong")}</Text>
            </View>
        )
    }


    if (cityLoading) {
        return <Loader />
    }

    const renderItem = ({ item }: { item: CityType }) => {
        return (
            <Pressable
                onPress={() => { navigation.navigate('PackageLocalityScreen', { cityId: item.id, cityName: item.cityName, stateName: name, stateId: id }) }}
            >
                <HStack justifyContent={'space-between'} my={2} px={3}>
                    <Text fontSize={'md'}>{item.cityName}</Text>
                    <Ionicons name="chevron-forward" size={24} />
                </HStack>
            </Pressable>
        )
    }

    return (
        <View flex={1} bg={'white'}>
            <Text fontSize={'lg'} mt={1} color={'gray.500'} px={3}>{t("Choose City")}</Text>
            <FlatList data={city} renderItem={renderItem} />
        </View>
    )
}

export default CityListScreen
