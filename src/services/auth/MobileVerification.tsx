import { View, Text, VStack, Input, Image, Button, Box } from 'native-base'
import React, { useState, useTransition, FC, useContext, useEffect } from 'react'
import { AuthStackParamList, AuthStackScreenProps, RootNavigationProps } from '../../navigation/types'
import { useSSR, useTranslation } from 'react-i18next';
import { verifyMobile } from './verifyMobile';
import { AuthContext } from '../../context/auth';
import { useNavigation } from '@react-navigation/native';
import { ErrMessage, SuccessMessage } from '../../utils/toastMessage';
import { Text as RNText, ActivityIndicator } from 'react-native'

type Props = AuthStackScreenProps<'MobileVerification'>




const MobileVerification: FC<Props> = ({ route }) => {


    const navigation = useNavigation<RootNavigationProps>()

    const { createSession } = useContext(AuthContext)

    const { id, otp, token, number, code } = route.params;

    const [loading, setLoading] = useState(false);

    const [userMobileOtp, setMobileOtp] = useState(String(otp));


    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
        }, 2500);
    }, [])

    // useEffect(()=>{
    //     setMobileOtp(otp)
    // },[otp])

    const { t } = useTranslation();

    const onSubmit = async () => {
        try {
            setLoading(true);
            const result = await verifyMobile(id, otp);
            createSession(token, id);
            navigation.navigate('BottomTabs', { screen: 'Homescreen' });
            SuccessMessage('login successfully')
            setLoading(false);
        } catch (error: any) {
            ErrMessage(error.message);
        }
    }


    return (
        <View bg={'white'} flex={1}>

            <VStack flex={1} space={4} mt={5}>
                <RNText style={{ fontSize: 35, fontWeight: 'bold', paddingLeft: 20 }}>{t("Welcome back")}</RNText>
                <Text bold pl={5} fontSize={15}>{t(`We sent a 4-digit code to +${code} ${number}`)}</Text>
                {
                    showLoader ?
                        (
                            <Box bg={'white'} flex={1} justifyContent="center" mb={10} alignItems="center">
                                <ActivityIndicator size={60} color={'red'} />
                                <RNText style={{ fontSize: 22,marginTop:5,fontWeight:'bold' }}>{t("We are trying to detect Code")}</RNText>
                            </Box>
                        )
                        :
                        <Input
                            value={userMobileOtp}
                            onChangeText={(text) => { setMobileOtp(text) }}
                            placeholder={t('Enter Mobile Otp')}
                            mt={5}
                            w={'90%'}
                            variant={'outline'}
                            keyboardType='phone-pad'
                            alignSelf={'center'}
                            borderColor={'black'}
                        />
                }

            </VStack>

            {!showLoader &&
            <Button isLoading={loading} isDisabled={loading} bg={'red.500'} onPress={onSubmit} mx={4} mb={5}>
                {t("Verify")}
            </Button>
            }


        </View>
    )
}

export default MobileVerification
