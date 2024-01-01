import { Box, FlatList, Text, View, HStack, Pressable } from 'native-base'
import React, { FC } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {t} from "i18next";
import { useGetState } from '../../hooks/location/useGetState';
import { StatesType } from '../../services/types';

type Props = {
  navigation:any;
}

const PackageStateList:FC<Props> = ({navigation}) => {

    const { state } = useGetState();

    const renderItem = ({ item }: {item:StatesType}) => {
        return (
            <Pressable onPress={()=>{navigation.navigate('PackageCityScreen',{id:item.id,name:item.stateName})}}>
                <HStack justifyContent={'space-between'} my={2} px={3}>
                    <Text fontSize={'md'}>{item.stateName}</Text>
                    <Ionicons name="chevron-forward" size={24} />
                </HStack>
            </Pressable>
        )
    }
    return (
        <View>
            <Text fontSize={'lg'} mt={1} color={'gray.500'} px={3}>{t("Choose State")}</Text>
            <FlatList my={2} data={state} renderItem={renderItem} />
        </View>
    )
}

export default PackageStateList


