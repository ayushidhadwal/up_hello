import React from 'react';
import {HStack, Image, Pressable, Text, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../navigation/types';

const Header = () => {
  const navigation = useNavigation<RootNavigationProps>();
  return (
    <HStack px={2} alignItems={'center'} justifyContent={'space-between'}>
      <Pressable
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          alignSelf={'center'}
          width={'28'}
          height={'28'}
          alt={'no img'}
          source={{
            uri: 'https://www.postendekker.nl/wp-content/uploads/2021/10/dummy-profile.jpg',
          }}
          rounded={'full'}
        />
      </Pressable>
      <Text ml={5} fontSize={'2xl'} bold>
          {t("Stories")}
      </Text>
      <HStack alignItems={'center'} space={1}>
        <AntDesign color={'red'} size={22} name="search1" />
        <MaterialCommunityIcons color={'red'} size={26} name="account-plus" />
      </HStack>
    </HStack>
  );
};

export default Header;
