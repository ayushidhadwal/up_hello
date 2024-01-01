import {Box, Button, FlatList, Image, Text} from 'native-base';
import React, {FC, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetFavouriteItems} from '../hooks/useGetFavouriteItem';
import {Favourites} from '../services/types';
import FavouriteItem from './FavouriteItem';
import {Loader} from '../Common/Loader';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../navigation/types';
import {useTranslation} from 'react-i18next';

const FavouritesScreen: FC = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const {t} = useTranslation();

  const {data, loading, pressFavourite} = useGetFavouriteItems();

  const [delLoading, setDelLoading] = useState<boolean>(false);

  if (loading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return (
      <Box
        bg={'white'}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}>
        <Image
          alt="no img"
          style={{width: 220, height: 220}}
          source={require('../../assets/images/heart.jpg')}
        />
        <Text my={3} fontSize={'xl'}>
          {t("You haven't liked anything yet")}
        </Text>
        <Text w={'50%'} textAlign={'center'} color={'grey'}>
          {t('collect all the things you like in one place')}
        </Text>
        <Button
          onPress={() => {
            navigation.navigate('Homescreen');
          }}
          rounded={10}
          w={'70%'}
          mt={5}
          colorScheme={'red'}>
          {t('Discover')}
        </Button>
      </Box>
    );
  }

  const addFavourite = async (id: any) => {
    setDelLoading(true);
    await pressFavourite(id);
    setDelLoading(false);
  };

  if (delLoading) {
    return <Loader />;
  }

  const renderItem = ({item}: {item: Favourites}) => (
    <FavouriteItem addFavourite={addFavourite} item={item} />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default FavouritesScreen;
