import { View, Text, Input, Box, Icon, Button } from 'native-base'
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { RootStackScreenProps } from '../../navigation/types'
import { ErrMessage } from '../../utils/toastMessage'
import { useTranslation } from 'react-i18next'
import { LangContext } from '../../context/lang'

type Props = RootStackScreenProps<'AddPrice'>

const AddPrice: FC<Props> = ({ navigation, route }) => {

    const inputRef = useRef();

    const { title, description, categoryId, subCategoryId, images, bikes, cars, mobile, properties, commercial, item } = route.params

    const { country, countriesData } = useContext(LangContext)



    const [currency, setCurrency] = useState('$')

    const setCurrenyfunc = () => {
        switch (country) {
            case 'USA':
                setCurrency('$');
            case 'United States of America':
                setCurrency('$');
                break;
            case 'Pakistan':
                setCurrency('Rs');
                break;
            case 'India':
                setCurrency('₹');
                break;
            case 'UAE':
                setCurrency('AED');
            case 'United Arab Emirates':
                setCurrency('AED');

                break;
            case 'Qatar':
                setCurrency('Riyal');
                break;
            case 'Baangladesh':
                setCurrency('Tk');
                break;
            case 'Oman':
                setCurrency('Rial');
                break;
            case 'Kuwait':
                setCurrency('KD');
                break;
            case 'Saudi Arabia':
                setCurrency('Riyal');
                break;
            default:
                setCurrency('$');
                break;
        }
    };

    useEffect(() => {
        setCurrenyfunc()
    }, [country])



    useEffect(() => {
        inputRef?.current?.focus();
    }, [])

    const [price, setPrice] = useState(item?.set_a_price);


    const [filteredPrice, setFilteredPrice] = useState(null);

    const { t } = useTranslation();




    const onNext = () => {
        if (price == '') {
            ErrMessage(t('price field can not be empty'))
        }
        else {
            navigation.navigate('AddLocation', {
                title: title,
                description: description,
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                images: images,
                price: price,
                bikes: bikes,
                cars: cars,
                commercial: commercial,
                mobile: mobile,
                properties: properties,
                item: item,
                editCheck: ""
            })
        }
    }

    return (
        <View bg={'white'} flex={1}>
            <Box flex={1} mt={5}>
                <Input
                    value={price}
                    onChangeText={(text) => { setPrice(String(text)) }}
                    keyboardType='numeric'
                    ref={inputRef}
                    InputLeftElement={<Text style={{ fontSize: 14 }}>{currency} | </Text>}
                    placeholder={t('Price')} w={'90%'} variant={'underlined'} alignSelf={'center'} />

            </Box>

            <Button mb={10} mx={6} onPress={onNext} colorScheme={'red'} >{t("Next")}</Button>
        </View>
    )
}

export default AddPrice
