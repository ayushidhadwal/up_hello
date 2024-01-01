import React, { FC, useContext, useState } from 'react'
import { Box, Image, View, Text, VStack, Button, Input } from 'native-base'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { AuthStackScreenProps, RootNavigationProps } from '../../navigation/types'
import { registerVerify } from '../../services/auth/registerVerify'
import { useNavigation } from '@react-navigation/native'
import { ErrMessage, SuccessMessage } from '../../utils/toastMessage'
import { AuthContext } from '../../context/auth'


type Props = AuthStackScreenProps<'RegisterVerify'>


const RegisterVerifyScreen: FC<Props> = ({ route }) => {

    const { email, emailOtp, mobileOtp, id } = route.params;

    const navigation = useNavigation<RootNavigationProps>()

    const { createSession } = useContext(AuthContext)


    const { t } = useTranslation();

    const [userMobileOtp, setMobileOtp] = useState(String(mobileOtp));
    const [userEmailOtp, setEmailOtp] = useState(String(emailOtp));
    const [loading, setLoading] = useState(false);



    const onSubmit = async () => {
        try {
            setLoading(true)
            const result = await registerVerify(userMobileOtp, userEmailOtp, id);
            createSession(result.token, result.user_id);
            setLoading(false)
            navigation.navigate('BottomTabs', { screen: 'Homescreen' });
            SuccessMessage('registered successfully');
        } catch (error) {
            ErrMessage(error.message)
            setLoading(false)

        }
    }




    return (
        <View bg={'white'} flex={1}>
            <Box my={8} alignItems={'center'}>
                <Image size={'lg'} alt={'img'} source={require('../../../assets/images/logo.png')} />
            </Box>
            <Text my={6} textAlign={'center'} mx={7}>{t("Please Enter the 4 Digit Code Sent to")}<Text bold>{' '}{email}</Text></Text>
            <VStack>
                <Text bold pl={5} fontSize={'xl'}>{t("Enter Email Code")}</Text>
                <Input
                    multiline={true}
                    value={userEmailOtp}
                    onChangeText={(text) => { setEmailOtp(text) }}
                    placeholder={t('Enter Email Otp')}
                    mt={5} w={'90%'}
                    variant={'outline'}
                    alignSelf={'center'}
                />

            </VStack>
            <VStack>
                <Text bold pl={5} fontSize={'xl'}>{t("Enter Phone Code")}</Text>
                <Input
                    multiline={true}
                    value={userMobileOtp}
                    onChangeText={(text) => { setMobileOtp(text) }}
                    placeholder={t('Enter Mobile Otp')}
                    mt={5} w={'90%'}
                    variant={'outline'}
                    alignSelf={'center'}
                />

            </VStack>

            <Button isLoading={loading} isDisabled={loading} bg={'red.500'} onPress={onSubmit} mx={4} mt={10}>
                {t("Verify")}
            </Button>


        </View >



        // <View bg={'white'} flex={1}>

        //     <Box my={8} alignItems={'center'}>
        //         {/* <Image size={'lg'} alt={'img'} source={require('../../../assets/images/logo.png')} /> */}
        //     </Box>
        //     <Text my={6} textAlign={'center'} mx={7}>{t("Please Enter the 4 Digit Code Sent to")}<Text bold> dfjnfdj</Text></Text>

        //     <VStack space={2}>
        //         <Text bold pl={5} fontSize={'xl'}{t("Enter Code")}</Text>
        //          <CustomInput
        //         control={control}
        //         placeholder={t('code')}
        //         name='otp'
        //         type={'text'}
        //           />
        //     </VStack>


        // </View>
    )
}

export default RegisterVerifyScreen



{/* <VStack space={2}>
                <Text bold pl={5} fontSize={'xl'}{t("Enter Code")}</Text>
            </VStack> */}

