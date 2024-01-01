import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import React, { FC, useState, useRef, useCallback } from 'react';
import {
  FlatList,
  Text,
  VStack,
  HStack,
  Box,
  Pressable,
} from 'native-base';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BottomTabsParamList } from '../../navigation/types';
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { bottomNavBarHeight } from '../../styles/layout';
import ImageProfile from '../../components/ImageProfile';
import { useGetReelsList } from '../../hooks/reels/useGetReelsList';
import { AllReels } from '../../services/types';
import ReelItem from './ReelItem';

type Props = BottomTabScreenProps<BottomTabsParamList, 'Reelscreen'>;

const ReelScreen: FC<Props> = () => {
  const tabBarHeight = useBottomTabBarHeight();

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

  const [pause, setPause] = useState(false);
  const [page, setPage] = useState(1);

  const { data, likeFilter } = useGetReelsList(page)




  const width = Dimensions.get('window').width;
  const height = Dimensions.get('screen').height;



  const itemHeight = height - (tabBarHeight + bottomNavBarHeight);

  const onPressLike = async (id: number) => {
    likeFilter(id)
  }




  const [viewableItem, setViewableItem] = useState(0);


  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isLast = index === data.length - 1;
    return (
      <ReelItem viewableItem={viewableItem} onPressLike={onPressLike} isLast={isLast} item={item} index={index} />
    )
  }



  // console.log(ViewableItem)

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

  // Viewable configuration
  const onViewRef = useRef(
    (data: { changed: { index: number }[] }) => {
      setViewableItem(data.changed[0].index as number);
    }
  );





  return (
    <Box flex={1} bg="#000">
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <FlatList

        alwaysBounceVertical={false}
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={itemHeight}
        decelerationRate={0.9}
        onViewableItemsChanged={onViewRef.current}
        onEndReached={() => { setPage(page + 1) }}
        onEndReachedThreshold={3}
        viewabilityConfig={viewConfigRef.current}
      />
    </Box>
  );
};

export default ReelScreen;