import {DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {Box, Image, Text, View, VStack, ScrollView} from 'native-base';
import React, {FC, useContext} from 'react';
import {Alert, Linking, Pressable, Share} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../../context/auth';
import {useTranslation} from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import {useGetProfileDetails} from '../../../hooks/profile/useGetProfileDetails';
import ImageProfile from '../../../components/ImageProfile';
import Config from '../../../config';
import FastImage from 'react-native-fast-image';

const CustomSideMenu: FC = props => {
  const {t} = useTranslation();

  const {profile} = useGetProfileDetails();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://play.google.com/store/apps/details?id=com.uphello',
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

  const url =
    'https://play.google.com/store/apps/details?id=com.uphello';

  const {userToken, logout} = useContext(AuthContext);

  // console.log(userToken);

  const navigation = useNavigation<RootNavigationProps>();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box py={12} alignItems={'center'} flex={1} backgroundColor={'#ffe4e1'}>
          <VStack alignItems={'center'}>
            {!userToken ? (
              <>

                <FastImage
                  style={{width: 85, height: 85, borderRadius: 100}}
                  source={require('../../../../assets/images/user_avatar.png')}
                />
                <Text fontSize={'2xl'} bold color={'red.600'}>
                  {t('Buy & Sell')}
                </Text>
              </>
            ) : profile?.profileImage == null ? (
              <>
                <FastImage
                  style={{width: 85, height: 85, borderRadius: 100}}
                  source={require('../../../../assets/images/user_avatar.png')}
                />
                <Text fontSize={'2xl'} bold color={'red.600'}>
                  {profile?.username}
                </Text>
              </>
            ) : (
              <>
                <FastImage
                  key={profile?.profileImage}
                  style={{width: 85, height: 85, borderRadius: 100}}
                  source={{
                    uri: `${Config.API_URL}/${profile?.profileImage}`,
                  }}
                />
                <Text fontSize={'2xl'} bold color={'red.600'}>
                  {profile?.username}
                </Text>
              </>
            )}
          </VStack>
        </Box>
        <View flex={3}>
          {!userToken && (
            <Pressable
              onPress={() => {
                navigation.navigate('AuthStack');
              }}>
              <View
                mb={6}
                alignSelf={'center'}
                mt={5}
                backgroundColor={'#ffe4e1'}
                width={'90%'}>
                <Text
                  bold
                  top={2}
                  height={10}
                  alignSelf={'center'}
                  fontSize={'md'}>
                  {t('Log in')}
                </Text>
              </View>
            </Pressable>
          )}

          <DrawerItemList {...props} />

          {/* <DrawerItem  icon={({ color, size }) => (
                        <AntDesign name="user" size={30} color={'#ffe4e1'} />
                    )} label={'Profile'} labelStyle={{ fontSize: 18, color: 'black' }}
                    // onPress={() => { userToken?navigation.navigate('ProfileStack'):navigation.navigate('AuthStack') }}
                    /> */}

          <DrawerItem
            icon={({color, size}) => (
              <Feather name="thumbs-up" size={30} color={'#ffe4e1'} />
            )}
            label={t('Rate this App')}
            labelStyle={{fontSize: 18, color: 'black'}}
            onPress={() => {
              Linking.openURL(url);
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <AntDesign name="sharealt" size={30} color={'#ffe4e1'} />
            )}
            label={t('Share and Earn')}
            labelStyle={{fontSize: 18, color: 'black'}}
            onPress={onShare}
          />

          {userToken && (
            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="exit-outline" size={30} color={'#ffe4e1'} />
              )}
              label={t('Log Out')}
              labelStyle={{fontSize: 18, color: 'black'}}
              onPress={logout}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomSideMenu;
