import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, {FC} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {ImageBackground} from 'react-native';

type Props = {
  name: any;
  price: any;
  discountPrice: any;
  image: any;
  location: any;
  navigation: any;
  desc: any;
};

const DiscountItem: FC<Props> = ({
  name,
  price,
  discountPrice,
  image,
  location,
  navigation,
  desc,
}) => {
  return (
    <Pressable
      shadow={1}
      backgroundColor={'white'}
      borderWidth={0.5}
      mx={1}
      my={1}
      width={'48%'}
      borderRadius={5}
      borderColor={'silver'}
      onPress={() => {
        navigation.navigate('Itemscreen', {
          price,
          image,
          location,
          desc,
          name,
        });
      }}>
      <Box
        justifyContent={'center'}
        alignItems={'center'}
        flex={1}
        // alignSelf={'center'}
      >
        <ImageBackground
          resizeMode="contain"
          alt="no img"
          style={{
            backgroundColor: 'rgbaColor(0, 0, 0, 0.1)',
            marginVertical: 10,
            flex: 1,
            width: '100%',
            height: 150,
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          // size={'lg'}
          source={{uri: image}}>
          <Box flex={1} />
          <Box pr={2}>
            <Box
              shadow={1}
              backgroundColor={'white'}
              // borderWidth={0.5}
              // borderRadius={5}
              width={30}
              alignItems={'center'}
              justifyContent={'center'}
              height={30}
              rounded={'full'}>
              <AntDesign name="hearto" color={'black'} size={14} />
            </Box>
          </Box>
        </ImageBackground>

        <VStack my={1} backgroundColor={'white'} space={1} pl={2}>
          {/* <Text bold fontSize="2xl" >{name}</Text> */}
          <HStack space={2} alignItems={'center'}>
            <Text fontSize={'md'} color="black">
              ₹{discountPrice}
            </Text>
            <Text
              textDecorationLine={'line-through'}
              fontSize={'sm'}
              color="muted.600">
              ₹{price}
            </Text>
          </HStack>
          <Text
            numberOfLines={1}
            color={'muted.500'}
            fontSize={'sm'}
            flexShrink={1}>
            {desc}
          </Text>

          <HStack alignItems={'center'} right={1.5}>
            <EvilIcons name="location" size={18} />
            <Text fontWeight={'light'} fontSize={'12'}>
              {location}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default DiscountItem;
