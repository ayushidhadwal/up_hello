import React, { FC } from 'react'
import { FlatList, Pressable, View, HStack, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Loader } from '../../Common/Loader';
import { useGetCity } from '../../hooks/location/useGetCity';
import { RootStackScreenProps } from '../../navigation/types';
import { CityType } from '../../services/types';
import { useTranslation } from 'react-i18next';



type Props = RootStackScreenProps<'AddCityScreen'>

const AddCityScreen: FC<Props> = ({ navigation, route }) => {

    const { id, name, categoryId, description, images, price, subCategoryId, title,bikes,cars,commercial,mobile,properties ,item} = route.params


    const { city, cityLoading, error } = useGetCity(id)

    const { t } = useTranslation()

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

    const renderItem = ({ item:items }: { item: CityType }) => {
        return (
            <Pressable
                onPress={() => {
                    navigation.navigate('AddLocalityScreen', {
                        cityId: items.id,
                        cityName: items.cityName,
                        stateName: name,
                        stateId: id, categoryId: categoryId,
                        description: description,
                        images: images,
                        price: price,
                        subCategoryId: subCategoryId,
                        title: title,
                        cars:cars,
                        properties:properties,
                        bikes:bikes,
                        commercial:commercial,
                        mobile:mobile,
                        item:item
                    })
                }}
            >
                <HStack justifyContent={'space-between'} my={2} px={3}>
                    <Text fontSize={'md'}>{items.cityName}</Text>
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

export default AddCityScreen



