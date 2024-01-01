import {
  View,
  Box,
  HStack,
  ScrollView,
  Divider,
  Button,
  StatusBar,
  VStack,
  Image,
  useStyledSystemPropsResolver,
} from 'native-base';

import React, { FC, useContext, useEffect, useState } from 'react';
import ImageComponent from './components/ImageComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RootStackScreenProps } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecentItemsDetails } from '../../hooks/recentItems/useRecentItemsDetails';
import { Loader } from '../../Common/Loader';
import { AuthContext } from '../../context/auth';
import ImageProfile from '../../components/ImageProfile';
import Config from '../../config';
import { addFavourite } from '../../services/addFavourite';
import { useTranslation } from 'react-i18next';
import { LangContext } from '../../context/lang';
import { Text } from 'react-native';
import moment from 'moment';
import { ErrMessage } from '../../utils/toastMessage';
import FastImage from 'react-native-fast-image';

type Props = RootStackScreenProps<'Itemscreen'>;

const ItemScreen: FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { userToken, userId } = useContext(AuthContext);
  const { id } = route.params;
  const { data, loading, error } = useRecentItemsDetails(id, userToken);

  const { currency } = useContext(LangContext);

  const [isFav, setFav] = useState<boolean | 'undefined'>(data?.favorite);

  useEffect(() => {
    setFav(data?.favorite);
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  const onPressFavourite = async () => {
    if (userToken) {
      try {
        setFav(!isFav);
        await addFavourite(id, userToken);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate('AuthStack');
    }
  };

  const getlocation = () => {
    if (data?.location !== null) {
      return (
        <HStack mb={1} alignItems={'center'} mx={2}>
          <Text style={{ fontSize: 15 }}>{data?.location}</Text>
        </HStack>
      );
    } else if (
      data?.state_name !== null &&
      data?.district_name !== null &&
      data?.city_name !== null
    ) {
      return (
        <HStack mb={1} alignItems={'center'} mx={2}>
          <Text style={{ fontSize: 15 }}>
            {`${data?.city_name}, ${data?.district_name}, ${data?.state_name}`}
          </Text>
        </HStack>
      );
    } else {
      return (
        <HStack mb={1} alignItems={'center'} mx={2}>
          <Text style={{ fontSize: 15 }}>
            {`${data?.c_neighbourhood}, ${data?.c_city}, ${data?.c_state}`}
          </Text>
        </HStack>
      );
    }
  };

  const getData = () => {
    return (
      <>
        <VStack space={1} px={2} mx={2} mt={2} bg={'white'}>
          {data?.fuel !== null &&
            data?.fuel !== 'null' &&
            data?.fuel !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Fuel')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.fuel}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.year !== null &&
            data?.year !== 'null' &&
            data?.year !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Year')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.year}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.km_driven !== null &&
            data?.km_driven !== 'null' &&
            data?.km_driven !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Km Driven')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.km_driven}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.brand_name !== null &&
            data?.brand_name !== 'null' &&
            data?.brand_name !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Brand')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.brand_name}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.transmission !== null &&
            data?.transmission !== 'null' &&
            data?.transmission !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Transmission')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.transmission}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.no_of_owners !== null &&
            data?.no_of_owners !== 'null' &&
            data?.no_of_owners !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('No.of Owners')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.no_of_owners}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.type !== null &&
            data?.type !== 'null' &&
            data?.type !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Type')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.type}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.bedrooms === null ||
            data?.bedrooms === 'null' ||
            data?.bedrooms === 'undefined' ? null : (
            <HStack flex={1} justifyContent={'space-between'}>
              <Box flex={1}>
                <Text>{t('Bedrooms')}</Text>
              </Box>
              <Box flex={1}>
                <Text>{data?.bedrooms}</Text>
              </Box>
              <Box flex={1} />
            </HStack>
          )}
          {data?.bathroom !== null &&
            data?.bathroom !== 'null' &&
            data?.bathroom !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Bathroom')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.bathroom}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.furnishing !== null &&
            data?.furnishing !== 'null' &&
            data?.furnishing !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Furnishing')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.furnishing}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.construction_status !== null &&
            data?.construction_status !== 'null' &&
            data?.construction_status !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Construction Status')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.construction_status}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.listed_by !== null &&
            data?.listed_by !== 'null' &&
            data?.listed_by !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Listed By')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.listed_by}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.super_bueltp_area !== null &&
            data?.super_bueltp_area !== 'null' &&
            data?.super_bueltp_area !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Super Buildup Area')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.super_bueltp_area}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.corpet_area !== null &&
            data?.corpet_area !== 'null' &&
            data?.corpet_area !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Carpet Area')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.corpet_area}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.maintenance !== null &&
            data?.maintenance !== 'null' &&
            data?.maintenance !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Maintainence')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.maintenance}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.total_floors !== null &&
            data?.total_floors !== 'null' &&
            data?.total_floors !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Total Floors')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.total_floors}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.floor_no !== null &&
            data?.floor_no !== 'null' &&
            data?.floor_no !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Floor No.')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.floor_no}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.car_parking !== null &&
            data?.car_parking !== 'null' &&
            data?.car_parking !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Car Parking')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.car_parking}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {data?.facing !== null &&
            data?.facing !== 'null' &&
            data?.facing !== 'undefined' && (
              <HStack flex={1} justifyContent={'space-between'}>
                <Box flex={1}>
                  <Text>{t('Facing')}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{data?.facing}</Text>
                </Box>
                <Box flex={1} />
              </HStack>
            )}
          {/* {
                    data?.salary !== null && data?.salary !== "null" && data?.salary !== "undefined" &&
                    < HStack flex={1} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Text>Salary</Text>
                        </Box>
                        <Box flex={1}>
                            <Text>{data?.salary}</Text>
                        </Box>
                        <Box flex={1} />
                    </HStack>
                }
                {
                    data?.position !== null && data?.position !== "null" && data?.position !== "undefined" &&
                    < HStack flex={1} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Text>Position</Text>
                        </Box>
                        <Box flex={1}>
                            <Text>{data?.position}</Text>
                        </Box>
                        <Box flex={1} />
                    </HStack>
                }
                {
                    data?.salaryfrom !== null && data?.salaryfrom !== "null" && data?.salaryfrom !== "undefined" &&
                    < HStack flex={1} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Text>Salary From</Text>
                        </Box>
                        <Box flex={1}>
                            <Text>{data?.salaryfrom}</Text>
                        </Box>
                        <Box flex={1} />
                    </HStack>
                }
                {
                    data?.salaryto !== null && data?.salaryto !== "null" && data?.salaryto !== "undefined" &&
                    < HStack flex={1} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Text>Salary to</Text>
                        </Box>
                        <Box flex={1}>
                            <Text>{data?.salaryto}</Text>
                        </Box>
                        <Box flex={1} />
                    </HStack>
                } */}
        </VStack>
      </>
    );
  };



  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          flex={1}
          backgroundColor={'white'}>
          <ImageComponent image={data?.item_image} navigation={navigation} />
          <Box>
            <VStack space={1}>
              <HStack justifyContent={'space-between'}>
                <Box>

                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 5,
                    }}>
                    {data?.c_symbol} {data?.set_a_price}
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 10,
                    }}>
                    {data?.add_title}
                  </Text>
                </Box>

              </HStack>
              <Divider my={2} />

              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                {t('Description')}
              </Text>
              <Box p={3} mx={3} bg={'whitesmoke'}>
                <Text>{data?.description}</Text>
              </Box>
              {getData()}
              {/* {detailsCheck && <Text mt={2} mx={2} bold fontSize={'lg'}>Details</Text>} */}
              <Divider my={2} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginHorizontal: 10,
                }}>
                {t('Location')}
              </Text>
              {getlocation()}
              <Divider my={3} />


              {/* <Divider /> */}


        
              <HStack
                p={3}
                borderWidth={1}
                borderColor={'red.500'}
                borderRadius={10}
                space={3}
                bg={'whitesmoke'}
                mx={3}
                alignItems={'center'}>
                {data?.profile_image ?
                  <FastImage
                    style={{ width: 40, height: 40, borderRadius: 30 }}
                    source={{ uri: `${Config.API_URL}/${data?.profile_image}` }}
                  />
                  :
                  <FastImage
                    style={{ width: 40, height: 40, borderRadius: 30 }}
                    source={require('../../../assets/images/user_avatar.png')}
                  />
                }
                <VStack>
                  {/* <Text style={{ color: 'silver', fontSize: 12 }}>
                    {t('   ')}
                  </Text> */}
                  {data?.usename && (
                    <Text style={{ fontSize: 19 }}>{data?.username}</Text>
                  )}

                  <Text style={{ color: 'silver', fontSize: 12 }}>
                    {t('Posted on')}
                  </Text>
                  <Text>{moment(data?.created_at).format('MMMM Do YYYY')}</Text>
                </VStack>
              </HStack>

              <Divider my={3} />
            </VStack>
          </Box>
        </ScrollView>
      </SafeAreaView>
      <Box backgroundColor={'white'}>
        <Divider mb={5} />
        <HStack pb={2} justifyContent={'space-evenly'}>
          <Button
            onPress={
              userToken
                ? () => {
                  navigation.navigate('Chat', {
                    chatId: `${data?.id}-${data?.created_by}-${userId}`,
                    sellerId: data?.created_by,
                    sellerName: data?.username,
                    itemImage: data?.item_image[0],
                    itemId: data?.id,
                    itemTitle: data?.add_title,
                    phoneNumber: data?.phone_number
                  });
                }
                : () => {
                  navigation.navigate('AuthStack');
                }
            }
            width={'82%'}
            rounded={6}
            _text={{ fontSize: 'xl' }}
            colorScheme={'red'}>
            {t('Chat')}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default ItemScreen;
