import { FlatList, Text, View, HStack, Pressable } from 'native-base'
import React, { FC, useContext } from 'react'
import { useGetLocality } from '../../hooks/location/useGetLocality';
import { RootNavigationProps, RootStackScreenProps } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../../context/location';
import { Loader } from '../../Common/Loader';
import { LocationObject } from '../Home/locationComponent/LocalityListScreen';
import { LocalityType } from '../../services/types';
import { useTranslation } from 'react-i18next';


type Props = RootStackScreenProps<'AddLocalityScreen'>

const AddLocalityScreen: FC<Props> = ({ route }) => {

    const {t} = useTranslation()
    const navigation = useNavigation<RootNavigationProps>()

    const { cityId, stateId, cityName, stateName, categoryId, description, images, price, subCategoryId, title,bikes,cars,commercial,mobile,properties ,item} = route.params

    const { locality, localityLoading, error } = useGetLocality(cityId)





    if (localityLoading) {
        return <Loader />
    }

    const { setLocationObject } = useContext(LocationContext)



    const setLocation = (localityName: string, localityId: number) => {
        const locationObject: LocationObject = {
            cityId: cityId,
            stateId: stateId,
            cityName: cityName,
            stateName: stateName,
            localityId: localityId,
            localityName: localityName
        }
        setLocationObject(locationObject);
        navigation.navigate('AddLocation', {
            categoryId: String(categoryId),
            description: description,
            images: images,
            price: price,
            subCategoryId: String(subCategoryId),
            title: title,
            bikes:bikes,
            cars:cars,
            properties:properties,
            commercial:commercial,
            mobile:mobile,
            item:item,
            editCheck:"edit"
        })
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

export default AddLocalityScreen