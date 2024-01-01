import { useNavigation } from '@react-navigation/native';
import { Box, FlatList, Text, View, HStack, Pressable } from 'native-base'
import React, { FC } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootNavigationProps } from '../../navigation/types';
import { Loader } from '../../Common/Loader';
import { useGetState } from '../../hooks/location/useGetState';
import { StatesType } from '../../services/types';
import { FormDataImg } from '../ListingScreen';
import { useTranslation } from 'react-i18next';

type Props = {
    categoryId: number;
    subCategoryId: number;
    description: string;
    images: FormDataImg[];
    price: string;
    title: string;
    bikes: any,
    cars: any,
    commercial: any,
    mobile: any,
    properties: any,
    item:any;
}



const StateList: FC<Props> = ({ categoryId, subCategoryId, description, images, price, title, properties, bikes, cars, commercial, mobile,item }) => {

    const { t } = useTranslation()

    const navigation = useNavigation<RootNavigationProps>()

    const { state, loading } = useGetState();

    if (loading) {
        return <Loader />
    }

    const renderItem = ({ item:items  }: { item: StatesType }) => {
        return (
            <Pressable onPress={() => {
                navigation.navigate('AddCityScreen',
                    {
                        id: items.id,
                        name: items.stateName,
                        categoryId: categoryId,
                        description: description,
                        images: images,
                        price: price,
                        subCategoryId: subCategoryId,
                        title: title,
                        bikes: bikes,
                        cars: cars,
                        commercial: commercial,
                        mobile: mobile,
                        properties: properties,
                        item:item
                    }
                )
            }}>
                <HStack justifyContent={'space-between'} my={2} px={3}>
                    <Text fontSize={'md'}>{items.stateName}</Text>
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


