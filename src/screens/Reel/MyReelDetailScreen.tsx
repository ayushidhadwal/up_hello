import React, {FC, useContext, useEffect, useState} from 'react';
import {RootStackScreenProps} from '../../navigation/types';
import {Box, HStack, Menu, Pressable, Text, VStack} from 'native-base';
import Video from 'react-native-video';
import {Alert, Dimensions, Share, StatusBar} from 'react-native';
import ImageProfile from '../../components/ImageProfile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Config from '../../config';
import {likeReel} from '../../services/reels/likeReel';
import {AuthContext} from '../../context/auth';
import {useGetProfileDetails} from '../../hooks/profile/useGetProfileDetails';

import {t} from 'i18next';

import convertToProxyURL from 'react-native-video-cache';

type Props = RootStackScreenProps<'MyReelsDetail'>;

const MyReelDetailScreen: FC<Props> = ({navigation, route}) => {
  const {item} = route.params;

  const [like, setLike] = useState<boolean>(false);
  useEffect(() => {
    if (item.type == '1') {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  const {userToken} = useContext(AuthContext);

  const {profile} = useGetProfileDetails();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share application',
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

  const onPressLike = async () => {
    try {
      setLike(!like);
      await likeReel(
        item.id,
        item.type == '0' ? Number(1) : Number(0),
        userToken,
      );
    } catch (error) {}
  };

  const [pause, setPause] = useState(false);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  function Example() {
    return (
      <Box w="90%" alignItems="flex-end" m={2}>
        <Menu
          w="190"
          trigger={triggerProps => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <SimpleLineIcons
                  size={28}
                  name="options-vertical"
                  color={'white'}
                />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={() => {}}>{t('Delete')}</Menu.Item>
        </Menu>
      </Box>
    );
  }

  return (
    <Box
      position={'relative'}
      bg={'black'}
      width={width}
      style={{height: height}}>
      <Pressable
        onPress={() => {
          setPause(!pause);
        }}
        style={{
          zIndex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Box flex={1} px={5} pt={3} pb={10}>
          <Box my={2}></Box>
          <Box flex={1}>
            <HStack flex={1} alignItems="flex-end">
              <Box flex={1}>
                <HStack alignItems={'center'} space={3}>
                  <ImageProfile
                    alt="no img"
                    source={{uri: `${Config.API_URL}/${profile?.profileImage}`}}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 30,
                    }}
                  />
                  <Text bold color="white" fontSize="lg">
                    {profile?.username}
                  </Text>
                </HStack>
                <Text numberOfLines={2} mt={2} p={1} color={'white'}>
                  {item.description}
                </Text>
              </Box>
              <Box>
                <VStack
                  pb={10}
                  justifyContent={'center'}
                  space={5}
                  alignItems={'center'}>
                  <FontAwesome
                    onPress={() => onPressLike()}
                    name={'heart'}
                    size={28}
                    color={!like ? 'white' : 'red'}
                  />
                  <FontAwesome
                    onPress={onShare}
                    name="share"
                    size={28}
                    color={'white'}
                  />
                  <Box />
                  <Box />
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Pressable>

      <Video
        paused={pause}
        repeat
        source={{uri: convertToProxyURL(item.video)}}
        style={{
          flex: 1,
          // marginTop: 5,
        }}
        playInBackground={false}
        progressUpdateInterval={1000}
        resizeMode="contain"
      />
    </Box>
  );
};

export default MyReelDetailScreen;
