import {
    Text,
    Box,
    Pressable,
    Input,
    VStack,
    HStack,
    ScrollView,
    Button,
    Select,
    CheckIcon,
    View
} from 'native-base';
import * as Yup from 'yup';
import React, { FC, useContext, useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Formik, FormikHelpers } from 'formik';
import { RootStackScreenProps } from '../../navigation/types';
import { FormDataImg, FormikValues } from '../ListingScreen';
import useGetCategories from '../../hooks/category/useGetCategory';
import { useGetSubCategory } from '../../hooks/category/useGetSubCategory';
import { useGetState } from '../../hooks/location/useGetState';
import { useGetCity } from '../../hooks/location/useGetCity';
import { useGetLocality } from '../../hooks/location/useGetLocality';
import { CityType, EditItem, GetCategory, LocalityType, StatesType, SubCategory } from '../../services/types';
import { Loader } from '../../Common/Loader';
import ImageBox from '../Home/ImageBox';
import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ErrMessage, SuccessMessage } from '../../utils/toastMessage';
import Config from '../../config';
import { editItem } from '../../services/product/editItem';
import { AuthContext } from '../../context/auth';
import MyAds from './MyAds';
import {t} from "i18next";


type Props = RootStackScreenProps<'EditAds'>;





const EditAdsScreen: FC<Props> = ({ navigation, route }) => {

    const { item } = route.params;

    const [oldImg, setOldImg] = useState<string[]>(item.itemImages)
    const [image, setImage] = useState<FormDataImg[]>([]);
    const [categoryId, setCategoryId] = useState(String(item.categoryId));
    const [subCategoryId, setSubCategoryId] = useState(String(item.subcategoryId));
    const [stateId, setStateId] = useState(String(item.stateId));
    const [cityId, setCityId] = useState(String(item.cityId));
    const [localityId, setLocalityId] = useState(String(item.loacalityId));

    const { data } = useGetCategories()
    const { subCategoryData, loading } = useGetSubCategory(Number(categoryId));
    const { state } = useGetState();
    const { city, cityLoading } = useGetCity(Number(stateId))
    const { locality, localityLoading } = useGetLocality(Number(cityId))

    const { userToken } = useContext(AuthContext)

    const onSubmitHandler = async (values: FormikValues, { resetForm }: FormikHelpers<FormikValues>) => {
        const options: EditItem = {
            id: item.id,
            image: image,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            stateId: Number(stateId),
            cityId: Number(cityId),
            localityId: Number(localityId)
        }
        try {
            const Result = await editItem(options, values, userToken);
            resetForm();
            setCategoryId('')
            setSubCategoryId('')
            setStateId('');
            setCityId('');
            setLocalityId('')
            SuccessMessage('Edit Successfully');
            navigation.goBack()
        } catch (error:any) {
            ErrMessage(error.message);
        }
    }

    const _pickImageHandler = async () => {
        check(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        )
            .then(result => {
                switch (result) {
                    case RESULTS.GRANTED:
                        _uploadImageHandler();
                        break;
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available on this device!');
                        break;
                    case RESULTS.DENIED:
                        request(
                            Platform.OS === 'ios'
                                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                                : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                        ).then(requestResult => {
                            if (requestResult === RESULTS.GRANTED) {
                                _uploadImageHandler();
                            }
                        });
                        break;
                    case RESULTS.LIMITED:
                        _uploadImageHandler();
                        break;
                    case RESULTS.BLOCKED:
                        console.log(
                            'The permission is denied! Please enable storage permission.',
                        );
                        openSettings().catch((err: any) =>
                            console.log('Unable to open settings!', err),
                        );
                        break;
                }
            })
            .catch(e => {
                console.log(e.message);
            });
    };

    const _uploadImageHandler = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 5,
        });
        if (result?.assets && result.assets?.length > 0) {
            if (image.length === 5) {
                // show error
                ErrMessage(t('you can only select upto 5 images'))
            } else {
                const images = result.assets?.map((img): FormDataImg => {
                    return {
                        name: img.fileName,
                        type: img.type,
                        uri: img.uri
                    }
                })
                setImage((prevState: any) => [...prevState, ...images]);
            }
        }
    };




    const editItemSchema = Yup.object().shape({
        itemName: Yup.string().required(),
        price: Yup.string().required(),
        discount: Yup.string().required(),
        desc: Yup.string().required(),
        location: Yup.string().required(),
        brand: Yup.string().required()
    });

    const onDelete = (id: number) => {
        setImage(prevState => {
            return prevState.filter((_, index) => index !== id);
        })
    }




    return (
        <View flex={1} bg={'white'}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Formik initialValues={{
                    itemName: item.name,
                    categoryId: String(item.categoryId),
                    subCategoryId: String(item.subcategoryId),
                    price: String(item.price),
                    discount: String(item.discount),
                    desc: item.description,
                    location: item.location,
                    brand: item.brandName
                }}
                    validationSchema={editItemSchema}
                    onSubmit={onSubmitHandler} >

                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <Box mt={4} px={3}>

                            <Text bold fontSize={'lg'}>
                                Photo
                            </Text>
                            <Pressable onPress={_uploadImageHandler} >
                                <Box
                                    mt={2}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    borderWidth={1}
                                    width={'20'}
                                    borderRadius={'10'}
                                    height={'20'}>
                                    <EvilIcons name="camera" color={'red'} size={38} />
                                </Box>
                            </Pressable>
                            <Text mt={2}>{t("You can upload upto 5 photos")}</Text>
                            <Box flexWrap={'wrap'} flexDirection={'row'}>
                                {oldImg.map((item: string, index: number) => (
                                    <ImageBox
                                        onDelete={onDelete}
                                        uri={`${Config.API_URL}/${item}`} index={index} />
                                ))}
                                {image.map((item: any, index: number) => (
                                    <ImageBox
                                        onDelete={onDelete}
                                        uri={item.uri} index={index} />
                                ))}
                            </Box>
                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("Item Name")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />
                                </HStack>
                                <Input
                                    value={values.itemName}
                                    onChangeText={handleChange('itemName')}
                                    borderRadius={10}
                                    placeholder="Enter Item Name"
                                    placeholderTextColor={'silver'}
                                    fontSize={'md'}
                                />
                                <Text color={'red.500'}>
                                    {errors.itemName && touched.itemName && errors.itemName}
                                </Text>
                            </VStack>
                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("Category")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />

                                </HStack>
                                <Select selectedValue={String(categoryId)} minWidth="200" accessibilityLabel="Choose category" placeholder={t("Choose Category")} _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => setCategoryId(String(itemValue))}>
                                    {data.map((item: GetCategory) => {
                                        return (
                                            <Select.Item label={item.categoryName} value={String(item.id)} />
                                        )
                                    })}
                                </Select>


                            </VStack>
                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("Sub Category")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />
                                </HStack>
                                {
                                    loading ? (
                                        <Loader />
                                    ) : (
                                        <Select isDisabled={categoryId == '' ? true : false} selectedValue={String(subCategoryId)} minWidth="200" accessibilityLabel="Choose Sub Category" placeholder={t("Choose Sub Category")} _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setSubCategoryId(String(itemValue))}>
                                            {subCategoryData.map((item: SubCategory) => {
                                                return (
                                                    <Select.Item label={item.subCategoryName} value={String(item.id)} />
                                                )
                                            })}
                                        </Select>
                                    )
                                }
                            </VStack>

                            <VStack>
                                <HStack>
                                    <Text mt={3} bold fontSize={'lg'}>
                                        {t("Price")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 16 }}
                                    />
                                </HStack>
                                <Input
                                    value={values.price}
                                    onChangeText={handleChange('price')}
                                    borderRadius={10}
                                    placeholder={t("Enter Price")}
                                    placeholderTextColor={'silver'}
                                    fontSize={'md'}
                                />
                                <Text color={'red.500'}>
                                    {errors.price && touched.price && errors.price}
                                </Text>
                            </VStack>

                            <VStack mt={3}>
                                <Text bold fontSize={'lg'}>
                                    {t("Discount")} (%)
                                </Text>
                                <Input
                                    value={values.discount}
                                    onChangeText={handleChange('discount')}
                                    borderRadius={10}
                                    placeholder={t("Enter Discount rate")}
                                    placeholderTextColor={'silver'}
                                    fontSize={'md'}
                                />
                                <Text color={'red.500'}>
                                    {errors.discount && touched.discount && errors.discount}
                                </Text>

                            </VStack>
                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("Description")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />
                                </HStack>
                                <Input
                                    value={values.desc}
                                    onChangeText={handleChange('desc')}
                                    borderRadius={10}
                                    placeholder={t("Description")}
                                    placeholderTextColor={'silver'}
                                    fontSize={'md'}
                                />
                                <Text color={'red.500'}>
                                    {errors.desc && touched.desc && errors.desc}
                                </Text>

                            </VStack>

                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("Brand")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />
                                </HStack>
                                <Input
                                    value={values.brand}
                                    onChangeText={handleChange('brand')}
                                    borderRadius={10}
                                    placeholder={t("Enter Brand")}
                                    placeholderTextColor={'silver'}
                                    fontSize={'md'}
                                />
                                <Text color={'red.500'}>
                                    {errors.brand && touched.brand && errors.brand}
                                </Text>
                            </VStack>

                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("State")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />

                                </HStack>
                                <Select selectedValue={String(stateId)} minWidth="200" accessibilityLabel="Choose State" placeholder={t("Choose State")} _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => setStateId(String(itemValue))}>
                                    {state.map((item: StatesType) => {
                                        return (
                                            <Select.Item label={item.stateName} value={String(item.id)} />
                                        )
                                    })}
                                </Select>


                            </VStack>




                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("City")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />
                                </HStack>
                                {
                                    cityLoading ? (
                                        <Loader />
                                    ) : (
                                        <Select isDisabled={stateId == '' ? true : false} selectedValue={String(cityId)} minWidth="200" accessibilityLabel="Choose City" placeholder={t("Choose City")} _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setCityId(String(itemValue))}>
                                            {city.map((item: CityType) => {
                                                return (
                                                    <Select.Item label={item.cityName} value={String(item.id)} />
                                                )
                                            })}
                                        </Select>
                                    )
                                }

                            </VStack>
                            <VStack mt={3}>
                                <HStack>
                                    <Text bold fontSize={'lg'}>
                                        {t("locality")}
                                    </Text>
                                    <FontAwesome
                                        name="asterisk"
                                        size={8}
                                        color="red"
                                        style={{ marginTop: 5 }}
                                    />
                                </HStack>
                                {
                                    localityLoading ? (
                                        <Loader />
                                    ) : (
                                        <Select isDisabled={stateId == '' || cityId == '' ? true : false} selectedValue={String(localityId)} minWidth="200" accessibilityLabel="Choose locality" placeholder={t("Choose locality")} _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setLocalityId(String(itemValue))}>
                                            {locality.map((item: LocalityType) => {
                                                return (
                                                    <Select.Item label={item.localityName} value={String(item.id)} />
                                                )
                                            })}
                                        </Select>
                                    )
                                }

                            </VStack>

                            <VStack mt={3}>
                                <Text bold fontSize={'lg'}>
                                    {t("Item Address")}
                                </Text>
                                <Input

                                    value={values.location}
                                    onChangeText={handleChange('location')}
                                    borderRadius={10}
                                    placeholder="address"
                                    placeholderTextColor={'silver'}
                                    fontSize={'md'}
                                />
                                <Text color={'red.500'}> {errors.location && touched.location && errors.location} </Text>
                            </VStack>
                            <Button
                                isLoading={isSubmitting}
                                isDisabled={isSubmitting}
                                my={5}
                                w={'95%'}
                                onPress={handleSubmit}
                                alignSelf={'center'}
                                borderRadius={10}
                                backgroundColor={'danger.600'}
                            >
                                {t("Update")}
                            </Button>
                        </Box>
                    )}
                </Formik>

            </ScrollView>
        </View>

    )
}

export default EditAdsScreen
