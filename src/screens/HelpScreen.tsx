import { useNavigation } from '@react-navigation/native'
import { View, VStack, Text, Divider, HStack, Pressable } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Alert, Linking, Text as RNText, Share } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RootNavigationProps } from '../navigation/types'

const HelpScreen = () => {

  const { t } = useTranslation()

  const navigation = useNavigation<RootNavigationProps>()


  const url = "https://play.google.com/store/apps/details?id=com.uphello"



  const onShare = async () => {
    try {
      const result = await Share.share({
        message: url
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <VStack mt={6} space={5} >

        <Pressable onPress={() => { navigation.navigate('Contactus') }}>
          <HStack mr={2} alignItems={'center'}>

            <HStack alignItems={'center'} space={2} px={4} flex={1}>
              <VStack>
                <RNText style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>{t("Contact Us")}</RNText>
                <Text fontSize={'sm'} color={'grey'}>{t("Contact Support")}</Text>
              </VStack>
            </HStack>
            <AntDesign size={20} name="right" />

          </HStack>
          <Divider mt={2} />
        </Pressable>


        <Pressable onPress={() => { Linking.openURL(url) }}>
          <HStack mr={2} alignItems={'center'}>

            <HStack alignItems={'center'} space={2} px={4} flex={1}>
              <VStack>
                <RNText style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>{t("Rate us")}</RNText>
                <Text fontSize={'sm'} color={'grey'}>{t("If you love our app,please take a moment to rate it")}</Text>
              </VStack>
            </HStack>
            <AntDesign size={20} name="right" />

          </HStack>
          <Divider mt={2} />
        </Pressable>


        <Pressable onPress={onShare}>
          <HStack alignItems={'center'} space={2} px={4}>
            <VStack>
              <RNText style={{ fontSize: 18, fontWeight: 'bold' }}>{t("Invite friends to")}UpHello</RNText>
              <Text fontSize={'sm'} color={'grey'}>{t("invite your friends to buy and sell")}</Text>
            </VStack>
          </HStack>
          <Divider mt={2} />
        </Pressable>

      </VStack>
    </View>
  )
}

export default HelpScreen
