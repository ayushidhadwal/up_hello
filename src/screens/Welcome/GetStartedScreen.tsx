import {SafeAreaView, StatusBar, Dimensions} from 'react-native';
import React, {FC, useCallback, useRef} from 'react';
import {data} from './components/data';
import GetStartItem from './components/GetStartItem';
import {Box, Button, Text, View, FlatList} from 'native-base';
import {RootStackScreenProps} from '../../navigation/types';
import Config from '../../config';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  id: number;
  title: string;
  desc: string;
  image: string;
};

type Prop = RootStackScreenProps<'GetStarted'>;

const GetStarted: FC<Prop> = ({navigation}) => {
  const [index, setIndex] = React.useState<number>(0);

  const {t} = useTranslation();

  
  
  const flatListRef = useRef<FlatList>(null);

  

  const onSkip = async () => {
    navigation.navigate('ChooseLocation');
    await AsyncStorage.setItem(Config.GetStartedKey,"1")
  };
  const onNext = () => {
    flatListRef.current?.scrollToIndex({index: index + 1, animated: true});
  };

  const onViewableItemsChanged: any = useCallback(
    (data: {changed: {index: number}[]}) => {
      setIndex(data.changed[0].index as number);
    },
    [],
  );

  const renderItem = ({item}: {item: Props}) => (
    <GetStartItem
      onSkip={onSkip}
      onNext={onNext}
      id={item.id}
      title={item.title}
      desc={item.desc}
      image={item.image}
      index={index}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'dark-content'}
      />

      <Button
        alignSelf={'flex-end'}
        rounded={10}
        // pt={10}
        variant={'unstyled'}
        colorScheme={'red'}
        onPress={onSkip}>
        <Text color={'red.500'} fontSize={'xl'} bold>
          {t("Skip")}
        </Text>
      </Button>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: '50%',
        }}
        ref={flatListRef}
      />

      <Box
        alignSelf={'center'}
        flex={1}
        flexDir={'row'}
        alignItems={'center'}
        justifyItems="center">
        {data.map((_, indexs) => {
          let bg = 'silver';

          if (indexs === index) {
            bg = 'red';
          }

          return (
            <View
              style={{
                backgroundColor: bg,
                width: 16,
                height: 8,
                margin: 2,
                borderRadius: 5,
              }}></View>
          );
        })}
      </Box>

      <Box px={12} py={12}>
        <Button
          _text={{
            fontWeight: 'bold',
          }}
          rounded={10}
          colorScheme={'red'}
          onPress={index === data.length - 1 ? onSkip : onNext}>
          {index === data.length - 1 ? t('Continue') : t('Next')}
        </Button>
      </Box>
    </View>
  );
};

export default GetStarted;
