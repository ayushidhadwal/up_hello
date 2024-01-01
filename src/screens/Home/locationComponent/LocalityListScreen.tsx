import { FlatList, Text, View, HStack, Pressable } from 'native-base'
import React, { FC, useContext } from 'react'
import { RootNavigationProps, RootStackScreenProps } from '../../../navigation/types';
import { useGetLocality } from '../../../hooks/location/useGetLocality';
import { Loader } from '../../../Common/Loader';
import { LocalityType } from '../../../services/types';
import { AuthContext } from '../../../context/auth';
import { useNavigation } from '@react-navigation/native';
import Homescreen from '../Homescreen';
import { LocationContext } from '../../../context/location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../config';
import { t } from "i18next";
import { LangContext } from '../../../context/lang';


type Props = RootStackScreenProps<'locality'>;


export type LocationObject = {
    cityId: number;
    stateId: number;
    cityName: string;
    stateName: string;
    localityId: number;
    localityName: string;
}


const LocalityListScreen: FC<Props> = ({ route }) => {

    const navigation = useNavigation<RootNavigationProps>()

    const { cityId, stateId, cityName, stateName, } = route.params

    const { locality, localityLoading, error } = useGetLocality(cityId)



    const { updateIsUsingLocation } = useContext(LangContext)


    if (localityLoading) {
        return <Loader />
    }



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
        navigation.navigate('BottomTabs', { screen: 'Homescreen' })
    }

    const renderItem = ({ item }: { item: LocalityType }) => {
        return (
            <Pressable
                onPress={()=>{
                    setLocation(item.localityName, item.id)
                    updateIsUsingLocation(true)
                }}
            >
                <HStack justifyContent={'space-between'} my={2} px={3}>
                    <Text fontSize={'md'}>{item.localityName}</Text>
                </HStack>
            </Pressable >
        )
    }

    return (
        <View flex={1} bg={'white'}>
            <Text fontSize={'lg'} mt={1} color={'gray.500'} px={3}>{t("Choose Locality")}</Text>
            <FlatList my={2} data={locality} renderItem={renderItem} />
        </View>
    )
}

export default LocalityListScreen
