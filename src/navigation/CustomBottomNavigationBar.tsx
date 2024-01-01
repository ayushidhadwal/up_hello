import React, {FC, useContext} from 'react';
import {Box, HStack, VStack, View, Text, Pressable} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/auth';
import Loginscreen from '../screens/auth/Loginscreen';
import {useTranslation} from 'react-i18next';

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
};

const CustomBottomNavigationBar: FC<Props> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {userToken} = useContext(AuthContext);

  const {t} = useTranslation();

  const index = state.index;

  return (
    <HStack
      alignItems={'center'}
      style={{height: 55}}
      bg={'white'}
      justifyContent={'space-evenly'}>
      <Pressable
        alignItems={'center'}
        onPress={() => {
          navigation.navigate('Homescreen');
        }}>
        <AntDesign name="home" size={24} color={index == 0 ? 'red' : 'grey'} />
        <Text color={index == 0 ? 'red.500' : 'grey'}>{t('Home')}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          userToken
            ? navigation.navigate('message')
            : navigation.navigate('AuthStack', {
                screen: Loginscreen,
              });
        }}
        alignItems={'center'}>
        <Ionicons
          name="chatbubble-outline"
          size={23}
          color={index == 1 ? 'red' : 'grey'}
        />
        <Text color={index == 1 ? 'red.500' : 'grey'}>{t('Chats')}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          userToken
            ? navigation.navigate('AddScreen')
            : navigation.navigate('AuthStack', {
                screen: Loginscreen,
              });
        }}
        alignItems={'center'}>
        <Box
          h={12}
          w={12}
          alignItems={'center'}
          justifyContent={'center'}
          borderWidth={2}
          borderColor={index == 2 ? 'red.500' : 'grey'}
          bottom={5}
          bg={'white'}
          shadow={1}
          rounded={'full'}>
          <Ionicons
            style={{padding: 0}}
            name="add"
            size={30}
            color={index == 2 ? 'red' : 'grey'}
          />
        </Box>
        <Text color={index == 2 ? 'red.500' : 'grey'} bottom={3}>
          {t('Sell')}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('Reelscreen');
        }}
        alignItems={'center'}>
        <Ionicons
          name="play-outline"
          size={27}
          color={index == 3 ? 'red' : 'grey'}
        />
        <Text color={index == 3 ? 'red.500' : 'grey'}>{t('Videos')}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          userToken
            ? navigation.navigate('myAds')
            : navigation.navigate('AuthStack', {screen: Loginscreen});
        }}
        alignItems={'center'}>
        <AntDesign
          name="hearto"
          size={22}
          color={index == 4 ? 'red' : 'grey'}
        />
        <Text color={index == 4 ? 'red.500' : 'grey'}>{t('My Ads')}</Text>
      </Pressable>
    </HStack>
  );
};

export default CustomBottomNavigationBar;
