import React, {useContext, useState, useEffect, FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  InputLeftAddon,
  ScrollView,
  Stack,
  Text,
  VStack,
  View,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {FormDataImg} from '../ListingScreen';
import {updateProfile} from '../../services/profile/updateProfile';
import {AuthContext} from '../../context/auth';
import {ErrMessage, SuccessMessage} from '../../utils/toastMessage';
import {useGetProfileDetails} from '../../hooks/profile/useGetProfileDetails';
import {Loader} from '../../Common/Loader';
import Config from '../../config';
import {useTranslation} from 'react-i18next';
import {Text as RNText} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {socialLogin} from '../../services/social/socialLogin';
import {unlinkGoogle} from '../../services/auth/unlinkGoogle';
import {socialLinking} from '../../services/social/socialLinking';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';

export type UpdateImg = {
  username: string;
  email: string;
  phoneNumber: string;
  img: FormDataImg | undefined;
};

const EditProfileScreen: FC<any> = ({route}) => {
  const {linkStatus} = route.params;

  GoogleSignin.configure({
    webClientId:
      '841843061886-o8nv3bftnb95s7cj3ivildubjb61nn1l.apps.googleusercontent.com',
  });

  const navigation = useNavigation<RootNavigationProps>();
  const {profile, loading} = useGetProfileDetails();

  const {t} = useTranslation();

  const {userToken, userId} = useContext(AuthContext);

  const [googleloader, setGoogleLoader] = useState(false);

  const [username, setUsername] = useState(profile?.username);
  const [email, setEmail] = useState(profile?.email);
  const [number, setNumber] = useState<string | undefined>(
    profile?.phoneNumber,
  );
  const [profileImg, setProfileImg] = useState<string | undefined>('');
  const [btnloading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<FormDataImg | undefined>();
  const [desc, setDesc] = useState('');

  useEffect(() => {
    setUsername(profile?.username);
    setEmail(profile?.email);
    setNumber(profile?.phoneNumber);
    setCode(profile?.code);
    setProfileImg(`${Config.API_URL}/${profile?.profileImage}`);
    setDesc(profile?.description);
  }, [profile]);

  const [link, setLink] = useState<boolean>(linkStatus);

  const [code, setCode] = useState('');

  const _uploadImageHandler = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const [selectedImg] = result.assets;

      setImage({
        name: selectedImg.fileName,
        type: selectedImg.type,
        uri: selectedImg.uri,
      });
      setProfileImg(selectedImg.uri);
    }
  };

  const unLinkGoogles = async () => {
    try {
      setGoogleLoader(true);
      await unlinkGoogle(userToken);
      SuccessMessage(t('Unlinked Successfully'));
      setLink(false);
      setGoogleLoader(false);
    } catch (error: any) {
      setGoogleLoader(false);
      ErrMessage(error.message);
    }
  };

  const socialLogins = async (Provider: string, id: string) => {
    try {
      const result = await socialLinking(Provider, id, userId);
      setLink(true);

      setGoogleLoader(false);
      SuccessMessage(t('Linked Successfully'));
    } catch (e: any) {
      ErrMessage(e.message);
      setGoogleLoader(false);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      setGoogleLoader(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();

      await socialLogins('google', userInfo.user.id);
      setGoogleLoader(false);
    } catch (e: any) {
      ErrMessage(e.message);

      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        setGoogleLoader(false);
        ErrMessage('Cancelled by user.');
      } else if (e.code === statusCodes.IN_PROGRESS) {
        setGoogleLoader(true);
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setGoogleLoader(false);
        ErrMessage('Play Services Not Available or Outdated');
      } else {
        setGoogleLoader(false);
        ErrMessage(e.message);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  const onSubmitHandler = async () => {
    if (
      username == '' ||
      email == '' ||
      number == '' ||
      code == '' ||
      desc == ''
    ) {
      ErrMessage(t('All Fields are required'));
    } else if (number?.length < 9 || number?.length > 12) {
      ErrMessage('Mobile number length is not correct');
    } else {
      const options: UpdateImg = {
        username: String(username),
        email: String(email),
        phoneNumber: String(number),
        img: image,
      };

      setLoading(true);
      try {
        await updateProfile(options, userToken, code, desc);
        setLoading(false);
        SuccessMessage(t('Updated Successfully'));
        navigation.goBack();
      } catch (error: any) {
        ErrMessage(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <ScrollView>
        <VStack space={4}>
          <RNText style={{fontSize: 22, fontWeight: 'bold', margin: 20}}>
            {t('Basic Information')}
          </RNText>
          <HStack alignItems={'center'} justifyContent={'space-evenly'}>
            <Box w={100} h={100} bg={'white'} borderRadius={'full'}>
              <FastImage
                key={profileImg}
                source={{uri: profileImg}}
                resizeMode="cover"
                style={{width: '100%', height: '100%', borderRadius: 200}}
              />
              <IconButton
                colorScheme="primary"
                variant={'solid'}
                borderRadius={'full'}
                _icon={{
                  as: MaterialIcons,
                  name: 'edit',
                  color: 'white',
                  size: 'md',
                }}
                position={'absolute'}
                bottom={2}
                right={2}
                shadow={5}
                size={'sm'}
                onPress={_uploadImageHandler}
              />
            </Box>
            <Box w={'55%'}>
              {/* <Text>Enter Your Name</Text> */}
              <Input
                value={username}
                onChangeText={text => {
                  setUsername(text);
                }}
                placeholder={t('Enter Your Name')}
                variant={'underlined'}
                alignSelf={'center'}
              />
            </Box>
          </HStack>
          <Box alignItems={'center'} mx={5}>
            {/* <Text>Enter Your Name</Text> */}
            <Input
              value={desc}
              onChangeText={text => {
                setDesc(text);
              }}
              placeholder={t('Something about you')}
              variant={'underlined'}
              alignSelf={'center'}
            />
          </Box>
          {/* <Divider mt={10} color={'black'} /> */}

          <RNText style={{fontSize: 22, fontWeight: 'bold', margin: 20}}>
            {t('Contact Information')}
          </RNText>

          <HStack justifyContent={'space-between'} alignItems={'center'} mx={5}>
            {/* <Text>Enter Your Name</Text> */}
            <Input
              w={'17%'}
              value={code}
              onChangeText={text => {
                setCode(text);
              }}
              placeholder={t('Code')}
              variant={'underlined'}
              InputLeftElement={
                <Icon size="4" color="gray.500" as={<Entypo name="plus" />} />
              }
              alignSelf={'center'}
            />
            <Input
              value={number}
              onChangeText={text => {
                setNumber(text);
              }}
              w={'70%'}
              placeholder={t('Phone Number')}
              variant={'underlined'}
              alignSelf={'center'}
            />
          </HStack>
          <Box mt={5} alignItems={'center'} mx={5}>
            {/* <Text>Enter Your Name</Text> */}
            <Input
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              placeholder={t('Email')}
              variant={'underlined'}
              alignSelf={'center'}
            />
          </Box>

          <RNText
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            {t('Additional Information')}
          </RNText>

          <Box mx={5}>
            <RNText style={{fontSize: 16, color: 'black', marginBottom: 2}}>
              {t('Google')}
            </RNText>
            <HStack alignItems={'center'} flex={1}>
              <RNText style={{fontSize: 12, flex: 2, color: 'grey'}}>
                {t(
                  'Link your Google account to seamlessly use your contact list',
                )}
              </RNText>
              <Box flex={1}>
                <Button
                  onPress={link ? unLinkGoogles : onGoogleButtonPress}
                  isLoading={googleloader}
                  isDisabled={googleloader}
                  colorScheme={'gray'}
                  mx={1}>
                  {link ? t('Unlink') : t('Link')}
                </Button>
              </Box>
            </HStack>
          </Box>

          <Button
            isDisabled={btnloading}
            isLoading={btnloading}
            onPress={onSubmitHandler}
            colorScheme={'red'}
            mt={8}
            mx={8}>
            {t('Update')}
          </Button>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
