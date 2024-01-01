import {
  View,
  Text,
  HStack,
  VStack,
  Box,
  Button,
  useSafeArea,
} from 'native-base';
import React, {FC, useContext, useEffect, useState} from 'react';
import {useGetProfileDetails} from '../../hooks/profile/useGetProfileDetails';
import Config from '../../config';
import ImageProfile from '../../components/ImageProfile';
import {Loader} from '../../Common/Loader';
import {RootStackScreenProps} from '../../navigation/types';
import {AddItem} from '../../services/types';
import {addItem} from '../../services/product/addItem';
import {ErrMessage, SuccessMessage} from '../../utils/toastMessage';
import {AuthContext} from '../../context/auth';
import MyAds from '../myads/MyAds';
import {LocationContext} from '../../context/location';
import {useTranslation} from 'react-i18next';
import {editItem} from '../../services/product/editItem';

type Props = RootStackScreenProps<'AddPost'>;

const AddPost: FC<Props> = ({navigation, route}) => {
  const {
    categoryId,
    description,
    images,
    price,
    subCategoryId,
    title,
    bikes,
    cars,
    properties,
    commercial,
    mobile,
    item,
  } = route.params;

  const {locationData, lat, long, locationDesc} = useContext(LocationContext);

  const [location, setLocation] = useState('');

  const {t} = useTranslation();


  const {brandId} = useContext(AuthContext)

  useEffect(() => {
    if (locationDesc == null) {
      setLocation(
        `${locationData?.localityName},${locationData?.cityName},${locationData?.cityName} `,
      );
    } else {
      setLocation(locationDesc);
    }
  }, []);

  const {profile, loading} = useGetProfileDetails();
  const [btnLoading, setBtnLoading] = useState(false);
  const {userToken} = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }


  const onSubmitHandler = async () => {
    const options: AddItem = {
      image: images,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      stateId: locationData?.stateId,
      cityId: locationData?.cityId,
      localityId: locationData?.localityId,
      description: description,
      price: price,
      title: title,
      lat: Number(lat),
      long: Number(long),
      location: location,
      bikes: bikes,
      cars: cars,
      properties: properties,
      commercial: commercial,
      mobile: mobile,
      brandId:brandId
    };
    setBtnLoading(true);
    try {
      const result = await addItem(options, userToken);
      SuccessMessage(t('Added Successfully'));
      navigation.navigate('BottomTabs', {screen: MyAds});
      setBtnLoading(false);
    } catch (error: any) {
      ErrMessage(error.message);
      setBtnLoading(false);
    }
  };

  const onEdit = async () => {
    const options: AddItem = {
      image: images,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      stateId: locationData?.stateId,
      cityId: locationData?.cityId,
      localityId: locationData?.localityId,
      description: description,
      price: price,
      title: title,
      lat: Number(lat),
      long: Number(long),
      location: location,
      bikes: bikes,
      cars: cars,
      properties: properties,
      commercial: commercial,
      mobile: mobile,
      brandId:brandId
    };
    setBtnLoading(true);
    try {
      await editItem(options, userToken, item?.id);
      navigation.navigate('BottomTabs', {screen: MyAds});
      setBtnLoading(false);
    } catch (error: any) {
      ErrMessage(error.message);
      setBtnLoading(false);
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <Box flex={1}>
        <HStack m={4} space={4}>
          <ImageProfile
            style={{width: 80, height: 80, borderRadius: 50}}
            alt={'no img'}
            source={{uri: `${Config.API_URL}/${profile?.profileImage}`}}
          />
          {profile?.username && (
            <VStack mt={2}>
              <Text>{t('Your Name')}</Text>
              <Text fontSize={'2xl'}>{profile?.username}</Text>
            </VStack>
          )}
        </HStack>
        {profile?.phoneNumber !== null ? (
          <Box m={2}>
            <Text bold fontSize={'lg'}>
              {t('Verified Number')}
            </Text>
            <Text m={2}>
              {profile?.code.includes('+') ? profile?.code : `+${profile?.code}`}{' '}
              {profile?.phoneNumber}
            </Text>
          </Box>
        ) : (
          <Box m={2}>
            <Text bold fontSize={'lg'}>
              {t('Verified Email')}
            </Text>
            <Text m={2}>{profile?.email}</Text>
          </Box>
        )}
      </Box>
      <Box mb={8} mx={6}>
        {item == '' ? (
          <Button
            isDisabled={btnLoading}
            isLoading={btnLoading}
            onPress={onSubmitHandler}
            colorScheme={'red'}>
            {t('Post Now')}
          </Button>
        ) : (
          <Button
            isDisabled={btnLoading}
            isLoading={btnLoading}
            onPress={onEdit}
            colorScheme={'red'}>
            {t('Update')}
          </Button>
        )}
      </Box>
    </View>
  );
};
export default AddPost;

// const onEdit = () => {

// try {
//     await editItem(options, userToken);
//     navigation.navigate('BottomTabs', { screen: MyAds })
// } catch (
//     )
