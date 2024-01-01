import { View } from 'native-base'
import React, { FC, useContext, useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RootStackScreenProps } from '../../navigation/types';
import { LocationContext } from '../../context/location';
import {t} from "i18next";

type Props = RootStackScreenProps<'AddGoogleApiScreen'>

const AddGoogleApiScreen: FC<Props> = ({ navigation, route }) => {

    const { categoryId, description, images, price, subCategoryId, title, properties, bikes, cars, commercial, mobile,item } = route.params;

    const inputRef = useRef<HTMLInputElement>(null);


    const { setLocationDescription, setCoordinates } = useContext(LocationContext)

    useEffect(() => {
        inputRef?.current?.focus();
    }, [])

    const onPress = (data: any, details = null) => {
        setLocationDescription(data.description);
        navigation.navigate('AddLocation', {
            categoryId: String(categoryId),
            description: description,
            images: images,
            price: price,
            subCategoryId: String(subCategoryId),
            title: title,
            bikes: bikes,
            cars: cars,
            commercial: commercial,
            mobile: mobile,
            properties: properties,
            item:item,
            editCheck:"edit"
        })
        setCoordinates(details?.geometry?.location.lat, details?.geometry?.location.lng)
    };


    return (
        <View flex={1} bg={'white'} >
            <GooglePlacesAutocomplete
                fetchDetails={true}
                minLength={2}
                placeholder={t('Search here')}
                onPress={onPress}
                ref={inputRef}
                styles={{
                    textInputContainer: {
                        borderWidth: 1,
                        width: '90%',
                        alignSelf: "center",
                        marginTop: 12,
                        borderColor: 'silver',
                        borderRadius: 6,
                    }
                }}
                // debounce={400}
                query={{
                    key: 'AIzaSyAZLjsxQX39mjxXMIs60fqD7LiJXR4Rogo',
                    language: 'en',
                }}
            />
        </View>
    )
}

export default AddGoogleApiScreen
