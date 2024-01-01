import React, { FC, useContext } from 'react';
import { HStack, VStack, View, Pressable, Box } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { LocationContext } from '../../../context/location';
import { useTranslation } from 'react-i18next';
import { Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../navigation/types';
import { LangContext } from '../../../context/lang';

interface navigation {
  navigation: any;
}
type Props = navigation;

const TopBar: FC<Props> = ({ navigation }) => {
  const rootNavigation = useNavigation<RootNavigationProps>();

  const { locationDesc, locationData, lat, long } = useContext(LocationContext);

  const { isUsingLocation, country } = useContext(LangContext)

  const { t } = useTranslation();

  return (
    <HStack px={2} mt={3} bg={'white'} alignItems={'center'} justifyContent={'space-between'}>
      <Entypo
        // style={{ flex: 1, }}
        onPress={() => {
          navigation.toggleDrawer();
        }}
        name="menu"
        size={36}
        color={'red'}
      />
      <Box pl={16}>
        <Image source={require('../../../../assets/images/logo.png')} style={{
          width: 50, height: 50, resizeMode: 'contain'
        }} />
      </Box>
      <Pressable mt={2}
        width={'23%'}
        // flexShrink={1}
        alignItems={'center'}
        justifyContent={'center'}
        onPress={() => { navigation.navigate('Locationscreen') }}  >
        <HStack alignItems={'center'} justifyContent={'center'} space={1} right={1} >

          <SimpleLineIcons
            style={{ alignSelf: 'center' }}
            name="location-pin"
            size={24}
            color="red"
          />
          {/* <Text numberOfLines={1}>Lorem FDFFDKDF</Text> */}
          {!isUsingLocation ? 
          <Text numberOfLines={1}>{country}</Text>
           : locationDesc ? (
            <Text numberOfLines={1}>{locationDesc}</Text>
          ) : locationData?.stateName && locationData?.cityName && locationData?.localityName ? (
            <Text numberOfLines={1}>{locationData?.stateName + ',' + locationData?.cityName + ',' + locationData?.localityName}</Text>
          ) : (
            <Text numberOfLines={1}>{t("Choose Location")}</Text>
          )
          }
        </HStack>
      </Pressable>


    </HStack>
  );
};

export default TopBar;
