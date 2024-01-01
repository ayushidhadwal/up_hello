import { Box, HStack, Text, VStack, Pressable, View } from 'native-base';
import React, { FC, useContext, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Config from '../../../config';
import ImageBackground from '../../../components/ImageBackground';
import { AuthContext } from '../../../context/auth';
import { Loader } from '../../../Common/Loader';
import { Text as RNText, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

type Props = {
  id: number;
  name: string;
  price: number;
  image: string[];
  location: string;
  navigation: any;
  desc: string;
  favorite: boolean;
  addFavourite: (id: number) => void;
  stateName: string;
  districtName: string;
  cityName: string;
  cState: string;
  cCity: string;
  cNeighbourhood: string;
  calcPrice: string;
  symbol: string;
  featuredPackage: boolean;
};

const Item: FC<Props> = ({
  id,
  name,
  price,
  image,
  location,
  navigation,
  desc,
  favorite,
  calcPrice,
  symbol,
  addFavourite,
  stateName,
  districtName,
  cityName,
  cCity,
  cNeighbourhood,
  cState,
  featuredPackage,
}) => {
  const { userToken } = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const { t } = useTranslation();

  const getlocation = () => {
    if (location !== null) {
      return (
        <HStack flex={1} mb={1} alignItems={'center'}>
          <EvilIcons name="location" size={18} />
          <Text flex={1} numberOfLines={1} fontWeight={'light'} fontSize={'12'}>
            {location}
          </Text>
        </HStack>
      );
    } else if (
      stateName !== null &&
      districtName !== null &&
      cityName !== null
    ) {
      return (
        <HStack mb={1} alignItems={'center'}>
          <EvilIcons name="location" size={18} />
          <Text flex={1} numberOfLines={1} fontWeight={'light'} fontSize={'12'}>
            {`${cityName}, ${districtName}, ${stateName}`}
          </Text>
        </HStack>
      );
    } else {
      return (
        <HStack mb={1} alignItems={'center'}>
          <EvilIcons name="location" size={18} />
          <Text flex={1} numberOfLines={1} fontWeight={'light'} fontSize={'12'}>
            {`${cNeighbourhood}, ${cCity}, ${cState}`}
          </Text>
        </HStack>
      );
    }
  };

  return (
    <Pressable
      shadow={1}
      backgroundColor={'white'}
      borderWidth={0.5}
      borderRadius={5}
      borderColor={'silver'}
      onPress={() => {
        navigation.navigate('Itemscreen', {
          id,
        });
      }}
      mx={1}
      mt={2}
      mb={1}
      width={'48%'}>
      {/* <Box justifyContent={'center'} alignItems={'center'} flex={1} px={1}>
        <ImageBackground
          source={{uri: `${Config.API_URL}/public/${image[0]}`}}
          resizeMode="contain"
          style={{
            marginVertical: 10,
            flex: 1,
            width: '100%',
            height: 150,
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: "rgbaColor('0,0,0,0.1')",
          }}
          alt="no img">
          <HStack flex={1} justifyContent={'space-between'}>
            {featuredPackage ? (
              <HStack
                h={6}
                alignItems={'center'}
                justifyContent={'center'}
                backgroundColor={'yellow.400'}
                p={1}>
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={14}
                  color="black"
                />
                <Text fontSize={10}>{t("FEATURED")}</Text>
              </HStack>
            ) : null}

            <Pressable
              position={'absolute'}
              top={0}
              right={0}
              onPress={async () => {
                setBtnLoading(true);
                await addFavourite(id);
                setBtnLoading(false);
              }}
              shadow={1}
              backgroundColor={'white'}
              width={30}
              alignItems={'center'}
              justifyContent={'center'}
              height={30}
              rounded={'full'}>
              {btnLoading ? (
                <ActivityIndicator color={'silver'} />
              ) : (
                <AntDesign
                  name={favorite ? 'heart' : 'hearto'}
                  color={'red'}
                  size={14}
                />
              )}
            </Pressable>
          </HStack>
        </ImageBackground>
      </Box> */}

      <View position={'relative'}>
        <FastImage
          style={{
            width: '100%',
            height: 150,
          }}
          source={{ uri: `${Config.API_URL}/public/${image[0]}` }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View position={'absolute'} top={0} bottom={0} left={0} right={0}>
        <HStack flex={1} justifyContent={'space-between'}>
            {featuredPackage ? (
              <HStack
                h={6}
                alignItems={'center'}
                justifyContent={'center'}
                backgroundColor={'yellow.400'}
                p={1}>
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={14}
                  color="black"
                />
                <Text fontSize={10}>{t("FEATURED")}</Text>
              </HStack>
            ) : null}

            <Pressable
              position={'absolute'}
              top={0}
              right={0}
              onPress={async () => {
                setBtnLoading(true);
                await addFavourite(id);
                setBtnLoading(false);
              }}
              shadow={1}
              backgroundColor={'white'}
              width={30}
              alignItems={'center'}
              justifyContent={'center'}
              height={30}
              rounded={'full'}>
              {btnLoading ? (
                <ActivityIndicator color={'silver'} />
              ) : (
                <AntDesign
                  name={favorite ? 'heart' : 'hearto'}
                  color={'red'}
                  size={14}
                />
              )}
            </Pressable>
          </HStack>
        </View>
      </View>
      <VStack space={1}>
        <RNText style={{ fontSize: 16, fontWeight: '500', paddingLeft: 6 }}>
          {symbol} {price}
        </RNText>
        <Text
          style={{ paddingLeft: 6 }}
          numberOfLines={1}
          fontSize={'sm'}
          flexShrink={1}>
          {desc}
        </Text>
        {getlocation()}
      </VStack>
    </Pressable>
  );
};

export default Item;
