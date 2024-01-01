import {HStack, Box, Text, VStack, Pressable} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {FC, useState, useContext} from 'react';
import {SearchItems} from '../../../services/types';
import {Loader} from '../../../Common/Loader';
import Config from '../../../config';
import ImageBackground from '../../../components/ImageBackground';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../navigation/types';
import {LangContext} from '../../../context/lang';
import {Text as RNText} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

type Props = {
  item: SearchItems;
  addFavourite: (id: any) => void;
};

const SearchItem: FC<Props> = ({item, addFavourite}) => {
  const [btnLoading, setBtnLoading] = useState(false);


  const navigation = useNavigation<RootNavigationProps>();
  const {t} = useTranslation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Itemscreen', {id: item.id});
      }}
      mx={2}
      shadow={1}
      backgroundColor={'white'}
      borderWidth={0.5}
      borderRadius={5}
      borderColor={'silver'}
      my={2}>
      <HStack>
        <Box py={1}>
          {item?.featuredPackage ? (
            <HStack
              w={70}
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
              <Text fontSize={10}>{t('FEATURED')}</Text>
            </HStack>
          ) : null}

          <ImageBackground
            resizeMode="contain"
            style={{width: 100, height: 100, borderRadius: 5}}
            source={{uri: `${Config.API_URL}/public/${item.photo[0]}`}}
          />
        </Box>

        <VStack w={'60%'} m={1}>
          <VStack flex={1}>
            <RNText style={{fontSize: 15, fontWeight: 'bold'}}>
            {item.currency}{' '}{item.price}
            </RNText>
            <Text numberOfLines={1} fontSize={'sm'}>
              {item.description}
            </Text>
          </VStack>
          <HStack alignItems={'center'}>
            <EvilIcons name="location" size={18} />
            <Text numberOfLines={1}>{item.location}</Text>
          </HStack>
        </VStack>
        <VStack>
          <Box m={2} justifyContent={'flex-end'}>
            <Pressable
              onPress={async () => {
                setBtnLoading(true);
                await addFavourite(item.id);
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
                <Loader />
              ) : (
                <AntDesign
                  name={item.favorite ? 'heart' : 'hearto'}
                  color={'red'}
                  size={14}
                />
              )}
            </Pressable>
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default SearchItem;
