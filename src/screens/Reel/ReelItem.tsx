import { Alert, Dimensions, Share, ViewBase,Text as RNText } from 'react-native'
import React, { FC, useState } from 'react'
import { Box, HStack, View, Text, Pressable, VStack, Image, } from 'native-base'
import {
    useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { bottomNavBarHeight } from '../../styles/layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import { AllReels } from '../../services/types';
import ImageProfile from '../../components/ImageProfile';
import Config from '../../config';
import convertToProxyURL from 'react-native-video-cache';


type Props = {
    item: AllReels;
    index: any;
    isLast: boolean;
    viewableItem: any;
    onPressLike: (id: number) => void
}

const ReelItem: FC<Props> = ({ item, index, isLast, viewableItem, onPressLike }) => {

    const tabBarHeight = useBottomTabBarHeight();


    const onShare = async (url: string) => {
        try {
            const result = await Share.share({
                message: url,
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

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('screen').height;



    const [like, setLike] = useState(Number(item.likeStatus));

    const likePress = async (id: number) => {
        if (like == 1) {
            setLike(0)
        } else {
            setLike(1)
        }
        onPressLike(id)
    }


    const itemHeight = height - (tabBarHeight + bottomNavBarHeight);

    const [pause, setPause] = useState(false);


    return (
        <Box
            position={'relative'}

            bg={'black'}
            width={width}
            style={{ height: itemHeight }}>
            <Pressable
                onPress={() => { setPause(!pause) }}
                style={{
                    zIndex: 1,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}>
                <Box flex={1} px={5} pt={3} pb={10}>
                    <HStack justifyContent={'space-between'}  my={2}>
                        <RNText style={{fontSize:18,fontWeight:'bold',color:'white'}}>Live</RNText>
                        <AntDesign name='search1' size={24} color={'white'} />
                    </HStack>
                    <Box flex={1}>
                        <HStack flex={1} alignItems="flex-end">

                            <Box flex={1}>
                                <HStack alignItems={'center'} space={3}>
                                    {item.profileImage == null ?
                                        <Image
                                            style={{ width: 37, height: 37, borderRadius: 100 }}
                                            alt="img"
                                            // source={require('../../../assets/images/user_avatar.png')}
                                            source={require('../../../assets/images/user_avatar.png')}
                                        /> :
                                        <ImageProfile
                                            alt="no img"
                                            source={{ uri: `${Config.API_URL}/${item.profileImage}` }}
                                            style={{
                                                width: 35,
                                                height: 35,
                                                borderRadius: 30
                                            }}
                                        />
                                    }
                                    <Text bold color="white" fontSize="lg">
                                        {item.username}
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
                                        onPress={() => likePress(item.id)}
                                        name={"heart"}
                                        size={28}
                                        color={like ? 'white' : 'red'}
                                    />
                                    <FontAwesome
                                        onPress={() => onShare(item.video)}
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
            {
                (viewableItem === index || viewableItem - 1 === index || viewableItem + 1 === index) &&
                <Video
                    paused={pause || viewableItem - 1 === index || viewableItem + 1 === index}
                    repeat
                    source={{ uri: convertToProxyURL(item.video) }}
                    style={{
                        flex: 1,
                        marginBottom: isLast ? 0 : 22,
                        marginTop: 5,
                    }}
                    playInBackground={false}
                    progressUpdateInterval={1000}
                    resizeMode="contain"
                />
            }
        </Box>
    )
}

export default ReelItem