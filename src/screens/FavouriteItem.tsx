import React, {FC, useContext, useState} from 'react';
import {Favourites} from '../services/types';
import {Box, HStack, VStack, Text, Pressable} from 'native-base';
import ImageBackground from '../components/ImageBackground';
import Config from '../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Loader} from '../Common/Loader';
import {RootNavigationProps} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {LangContext} from '../context/lang';

import {Text as RNText} from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  item: Favourites;
  addFavourite: (id: any) => void;
};

const FavouriteItem: FC<Props> = ({item, addFavourite}) => {
  const navigation = useNavigation<RootNavigationProps>();

  // const { currency } = useContext(LangContext)

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Itemscreen', {id: String(item?.itemId)});
      }}
      mx={1}
      shadow={1}
      backgroundColor={'white'}
      borderWidth={0.5}
      borderRadius={5}
      borderColor={'silver'}
      my={2}
      flex={1}>
      {/* <Text>dfijmd</Text> */}
      <HStack flex={1} justifyContent={'space-between'}>
        <HStack flex={1}>
          <FastImage
            source={{uri: `${Config.API_URL}/public/${item?.image[0]}`}}
            style={{width: 70, height: 70, margin: 4}}
            resizeMode="contain"
          />
          <VStack flex={1}>
            <Text fontSize={'md'} mx={2}>
              {item?.itemName}
            </Text>
            <RNText style={{fontWeight: 'bold', marginHorizontal: 10}}>
              {item?.symbol} {item?.itemPrice}
            </RNText>
          </VStack>
        </HStack>
        <AntDesign
          onPress={async () => {
            await addFavourite(item?.itemId);
          }}
          style={{margin: 4}}
          name="heart"
          color={'red'}
          size={16}
        />
      </HStack>
    </Pressable>
  );
};

export default FavouriteItem;
