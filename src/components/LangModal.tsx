import { Modal, I18nManager } from 'react-native'
import { View, Text, Pressable, HStack, Image } from 'native-base'
import React, { useContext, useState } from 'react'
import { LangContext } from '../context/lang'
import Config from '../config'
import { useTranslation } from 'react-i18next'
import { LocationContext } from '../context/location'
import RNRestart from 'react-native-restart';
import i18n from '../i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';



const LangModal = () => {

    const [showModal, setShowModal] = useState(true)

    const { lang, setLanguage } = useContext(LangContext)

    const setLang = async (langs: string) => {
        setShowModal(false);
        await AsyncStorage.setItem(Config.GetModalKey, "1");
        if (langs == lang) {
            return null;
        }
        setLanguage(langs);
        await i18n.changeLanguage(langs);
        if (langs == 'ar') {
            I18nManager.forceRTL(true)
        }
        else {
            I18nManager.forceRTL(false);
        }
        RNRestart.restart();

    }

    const { t } = useTranslation();





    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
        >
            <View justifyContent={'flex-end'} flex={1} bg={'rgba(0,0,0,0.5)'}>
                <View borderTopRadius={10} bgColor={'white'}>

                    <Text alignSelf={'center'} my={2} bold fontSize={'2xl'}>{t("Select Language")}</Text>

                    <Pressable onPress={() => setLang('hn')}>
                        <HStack borderRadius={10} borderWidth={0.5} m={2} p={2} space={3} alignItems={'center'}>
                            <Image alt='no img' style={{ width: 40, height: 40 }} source={require('../../assets/images/india_flag.png')} />
                            <Text fontSize={'2xl'}>हिंदी</Text>
                        </HStack>
                    </Pressable>

                    <Pressable onPress={() => setLang('ar')}>
                        <HStack borderRadius={10} borderWidth={0.5} m={2} p={2} space={3} alignItems={'center'}>
                            <Image alt='no img' style={{ width: 40, height: 40 }} source={require('../../assets/images/uae_flag.png')} />
                            <Text fontSize={'2xl'}>عربي</Text>
                        </HStack>
                    </Pressable>

                    <Pressable onPress={() => setLang('en')}>
                        <HStack borderRadius={10} borderWidth={0.5} m={2} p={2} space={3} alignItems={'center'}>
                            <Image alt='no img' style={{ width: 40, height: 40 }} source={require('../../assets/images/usa_flag.png')} />
                            <Text fontSize={'xl'}>English</Text>
                        </HStack>
                    </Pressable>

                    <Pressable onPress={() => setLang('bn')}>
                        <HStack borderRadius={10} borderWidth={0.5} m={2} p={2} space={3} alignItems={'center'}>
                            <Image alt='no img' style={{ width: 40, height: 40 }} source={require('../../assets/images/bangla_flag.png')} />
                            <Text fontSize={'xl'}>বাংলা</Text>
                        </HStack>
                    </Pressable>

                </View>
            </View>
        </Modal>
    )
}

export default LangModal