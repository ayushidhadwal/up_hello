import {
  Box,
  Text,
  View,
  Pressable,
  HStack,
  VStack,
  Input,
  Button,
} from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../context/auth';
import { addReel } from '../../services/reels/addReel';
import { ErrMessage, SuccessMessage } from '../../utils/toastMessage';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../navigation/types';
import { Alert, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FormDataImg } from '../ListingScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Progress from 'react-native-progress';

export type FormDataVid = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

export type AddReel = {
  title: string;
  desc: string;
  video: FormDataVid | null;
  thumbnail: FormDataImg | null;
};

const AddReel = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [video, setVideo] = useState<FormDataVid | null>(null);
  const [image, setImage] = useState<FormDataImg | null>(null);
  const { userToken } = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const { t } = useTranslation();

  const _uploadVideoHandler = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      selectionLimit: 1,
    });

    if (result?.assets && result.assets?.length > 0) {
      const [selectedVideo] = result.assets;

      setVideo({
        name: selectedVideo.fileName,
        type: selectedVideo.type,
        uri: selectedVideo.uri,
      });
    }
  };

  const _uploadImageHandler = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result?.assets && result.assets?.length > 0) {
      const [selectedImage] = result.assets;
      setImage({
        name: selectedImage.fileName,
        type: selectedImage.type,
        uri: selectedImage.uri,
      });
    }
  };

  const onSubmitHandler = async () => {
    const options: AddReel = {
      title: title,
      desc: desc,
      video: video,
      thumbnail: image,
    };
    if (video == null || title == '' || desc == '' || image == null) {
      ErrMessage(t('All Fields are required'));
    } else {
      setBtnLoading(true);
      try {
        await addReel(userToken, options, prog => {
          setProgress(prog);
        });
        setBtnLoading(false);
        navigation.navigate('BottomTabs', { screen: 'myAds' });
        SuccessMessage(t('Uploaded Successfully'));
        setTitle('');
        setDesc('');
        setVideo(null);
      } catch (error: any) {
        console.log(error.message);
        ErrMessage(error.message);
        setBtnLoading(false);
      }
    }
  };


  return (
    <View bg={'white'} flex={1}>
      <ScrollView>
        <VStack mt={4} px={3}>
          <HStack mt={2}>
            <Text bold fontSize={'xl'}>
              {t('Video')}
            </Text>

            <FontAwesome
              name="asterisk"
              size={8}
              color="red"
              style={{ marginTop: 5 }}
            />
          </HStack>
          <HStack>
            <Text color={'#808080'} fontSize={'xs'}>
              {t('Video must be of 30s')}
            </Text>
            <FontAwesome
              name="asterisk"
              size={5}
              color="#808080"
              style={{ marginTop: 5 }}
            />
          </HStack>

          <Pressable onPress={_uploadVideoHandler}>
            <Box
              mt={2}
              alignItems={'center'}
              justifyContent={'center'}
              borderWidth={1}
              width={'20'}
              borderRadius={'10'}
              height={'20'}>
              <Octicons name="video" color={'red'} size={28} />
            </Box>
          </Pressable>
          {video !== null && <Text>{t('Video Selected Successfully')}</Text>}
          <VStack mt={4} space={2}>
            <HStack mt={2}>
              <Text bold fontSize={'xl'}>
                {t('Title')}
              </Text>
              <FontAwesome
                name="asterisk"
                size={8}
                color="red"
                style={{ marginTop: 5 }}
              />
            </HStack>
            <Input
              value={title}
              onChangeText={text => {
                setTitle(text);
              }}
              borderRadius={10}
              placeholderTextColor={'silver'}
              placeholder={t('Enter Title')}
              fontSize={'md'}
            />
          </VStack>
          <VStack mt={4} space={2}>
            <HStack mt={2}>
              <Text bold fontSize={'xl'}>
                {t('Description')}
              </Text>
              <FontAwesome
                name="asterisk"
                size={8}
                color="red"
                style={{ marginTop: 5 }}
              />
            </HStack>
            <Input
              multiline={true}
              value={desc}
              onChangeText={text => {
                setDesc(text);
              }}
              borderRadius={10}
              placeholder={t('Enter Description')}
              placeholderTextColor={'silver'}
              fontSize={'md'}
            />
            <HStack mt={2}>
              <Text bold fontSize={'xl'}>
                {t('Thumbnail')}
              </Text>
              <FontAwesome
                name="asterisk"
                size={8}
                color="red"
                style={{ marginTop: 5 }}
              />
            </HStack>
            <Pressable onPress={_uploadImageHandler}>
              <Box
                mt={2}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth={1}
                width={'20'}
                borderRadius={'10'}
                height={'20'}>
                <EvilIcons name="camera" color={'red'} size={38} />
              </Box>
            </Pressable>

            {image !== null && <Text>{t('Image Selected Successfully')}</Text>}
            {/*<Progress.Bar progress={0.5} width={100} />*/}

            <View mt={6}>

              {btnLoading ?
                <Progress.Bar
                  progress={progress==1?progress-0.03:progress}
                  width={200}
                  height={13}
                  color={'red'}
                  style={{ alignSelf: 'center' }}
                /> :
                <Button
                  isLoading={btnLoading}
                  isDisabled={btnLoading}
                  onPress={onSubmitHandler}
                  mx={6}
                  mt={1}
                  rounded={'6'}
                  colorScheme={'red'}>
                  {t('Submit')}
                </Button>
              }
            </View>
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default AddReel;
