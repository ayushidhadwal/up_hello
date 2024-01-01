import { View, Text, Box, HStack, VStack, Divider, Button, Pressable } from 'native-base'
import React, { FC, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RootStackScreenProps } from '../../navigation/types'
import { LocationContext } from '../../context/location'
import { ErrMessage } from '../../utils/toastMessage'
import { useTranslation } from 'react-i18next'

type Props = RootStackScreenProps<'AddLocation'>

const AddLocation: FC<Props> = ({ navigation, route }) => {


    const { t } = useTranslation();

    const { categoryId, subCategoryId, description, images, price, properties, title, bikes, cars, commercial, mobile, item,editCheck } = route.params;

    const { locationData, locationDesc, lat, long } = useContext(LocationContext);


    const onNext = () => {
        if (locationData == null && lat == null && long == null && item?.location == null && item?.state_name == null && item?.district_name && item?.city_name && item?.c_city && item?.c_neighbourhood && item?.c_state) {
            ErrMessage(t('location required'));
        }
        else {

            navigation.navigate('AddPost', {
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                description: description,
                images: images,
                price: price,
                title: title,
                bikes: bikes,
                cars: cars,
                commercial: commercial,
                mobile: mobile,
                properties: properties,
                locationDesc: locationDesc,
                item: item
            })
        }
    }

    const getlocation = () => {
        if(item!==''){

            if (item?.location !== null) {
                return (
                    <Text numberOfLines={1}>
                        {item?.location}
                    </Text>
                )
            } else if (item?.state_name !== null && item?.district_name !== null && item?.city_name !== null) {
                return (
                    
                    <Text numberOfLines={1}>
                        {`${item?.city_name}, ${item?.district_name}, ${item?.state_name}`}
                    </Text>
                )
            } else if (item?.c_neighbourhood !== null && item?.c_city && item?.c_state) {
                return (
                    <Text numberOfLines={1}>
                        {`${item?.c_neighbourhood}, ${item?.c_city}, ${item?.c_state}`}
                    </Text>
                )
            }
        }
        else {
            return (
                <Text color={'silver'} numberOfLines={1}>{t("Choose Location")}</Text>
            )
        }
    }






    return (
        <View flex={1} bg={'white'}>
            <Pressable onPress={() => {
                navigation.navigate('AddStateScreen', {
                    categoryId: Number(categoryId),
                    subCategoryId: Number(subCategoryId),
                    description: description,
                    images: images,
                    price: price,
                    title: title,
                    bikes: bikes,
                    cars: cars,
                    commercial: commercial,
                    mobile: mobile,
                    properties: properties,
                    item: item
                })
            }}
                flex={1}
            >
                <HStack alignItems={'center'} m={2} justifyContent={'space-between'}>
                    {editCheck=="edit"?
                        (
                            <VStack flex={1}>
                                <Text fontSize={'lg'}>{t("Location")}</Text>
                                {locationDesc ? (
                                    <Text numberOfLines={1}>{locationDesc} </Text>
                                ) : locationData?.stateName && locationData?.cityName && locationData?.localityName ? (
                                    <Text numberOfLines={1}>{locationData?.localityName + ',' + locationData?.cityName + ',' + locationData?.stateName}</Text>
                                ) : (
                                    <Text color={'silver'} numberOfLines={1}>{t("Choose Location")}</Text>
                                )
                                }

                            </VStack>
                        ) :
                        (
                            <VStack flex={1}>
                                <Text fontSize={'lg'}>{t("Location")}</Text>
                                {getlocation()}
                            </VStack>
                        )
                    }
                    <Ionicons name={'chevron-forward-outline'} size={30} />
                </HStack>
                <Divider />
            </Pressable>
            <Box mb={8} my={2} mx={6}>
                <Button onPress={onNext} colorScheme={'red'}
                >
                    {t("Next")}
                </Button>
            </Box>
        </View>
    )
}

export default AddLocation
