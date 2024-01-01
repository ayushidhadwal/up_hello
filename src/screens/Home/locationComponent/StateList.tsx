import { Box, FlatList, Text, View, HStack, Pressable } from 'native-base'
import React from 'react'
import { useGetState } from '../../../hooks/location/useGetState'
import { StatesType } from '../../../services/types';
import { Loader } from '../../../Common/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../navigation/types';
import {t} from "i18next";

const StateList = () => {
    const navigation = useNavigation<RootNavigationProps>()

    const { state } = useGetState();

    const renderItem = ({ item }: {item:StatesType}) => {
        return (
            <Pressable onPress={()=>{navigation.navigate('city',{id:item.id,name:item.stateName})}}>
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

export default StateList


