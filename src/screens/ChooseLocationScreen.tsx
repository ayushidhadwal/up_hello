
import { Box, Button, Image, VStack, View } from 'native-base'
import React from 'react'
import { Select } from "native-base";
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps, RootStackParamsList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../config';
import {t} from "i18next";



const ChooseLocationScreen = () => {
  const navigation = useNavigation<RootNavigationProps>()


  return (
    <View flex={1} backgroundColor={'white'}>

      <VStack space={5} alignItems={'center'} flex={1} backgroundColor={'white'}>

        <Image mt={20} alt='chooseLocationImg' source={require('../../assets/images/location_img.jpg')}
          size={'2xl'}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }} >Where is your location?</Text>
        <Text style={{ width: '70%', textAlign: 'center', fontSize: 12, marginTop: 10 }}>Enjoy a Personalized seling and buying experience by telling us your location</Text>
        <Button onPress={async () => {
          navigation.navigate('Locationscreen');
          await AsyncStorage.setItem(Config.LocationScreenKey, '1')
        }} mt={10} colorScheme={'red'} w={'90%'}><Text style={{ color: 'white', fontSize: 18 }}>{t("Choose Location")}</Text></Button>
      </VStack>
    </View>
  )
}

export default ChooseLocationScreen
