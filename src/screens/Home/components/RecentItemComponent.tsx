import {Box, FlatList, Text, View, Image, HStack} from 'native-base';
import React, {FC, useContext} from 'react';
import Item from './Item';
import {useRecentItems} from '../../../hooks/recentItems/useRecentItems';
import {RecentItems} from '../../../hooks/types';
import {Loader} from '../../../Common/Loader';
import {AuthContext} from '../../../context/auth';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: any;
};

const RecenetItemComponent: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const {data, error, pressFavourite, recentLoading} =
    useRecentItems(navigation);

  if (recentLoading) {
    return (
      <View mt={2}>
        <Loader />
      </View>
    );
  }

  const {userToken} = useContext(AuthContext);

  if (data?.length === 0) {
    return (
      <>
        <HStack
          bg={'white'}
          pb={2}
          pt={5}
          px={3}
          justifyContent={'space-between'}>
          <Text fontSize={'lg'}>{t('Fresh recommendations')}</Text>
        </HStack>
        <View pb={4} flex={1} alignItems={'center'} justifyContent={'center'}>
          <Image
            alt={'no img'}
            w={80}
            h={80}
            source={require('../../../../assets/images/No_Items.png')}
          />
          <Text fontSize={'2xl'} bold>
            {t('No Ads Found')}
          </Text>
        </View>
      </>
    );
  }

  const addFavourite = async (id: number) => {
    if (userToken) {
      await pressFavourite(id);
    } else {
      navigation.navigate('AuthStack', {screen: 'Loginscreen'});
    }
  };

  const renderItem = ({item}: {item: RecentItems}) => (
    <Item
      id={item.id}
      name={item.itemName}
      image={item.images}
      price={item.price}
      location={item.location}
      navigation={navigation}
      desc={item.description}
      favorite={item.favorite}
      addFavourite={addFavourite}
      cCity={item.cCity}
      cNeighbourhood={item.cNeighbourhood}
      cState={item.cState}
      cityName={item.cityName}
      districtName={item.districtName}
      stateName={item.stateName}
      calcPrice={item.calcPrice}
      symbol={item.symbol}
      featuredPackage={item.featuredPackage}
    />
  );

  return (
    <Box>
      <HStack
        bg={'white'}
        pb={2}
        pt={5}
        px={3}
        justifyContent={'space-between'}>
        <Text fontSize={'lg'}>{t('Fresh recommendations')}</Text>
      </HStack>
      <FlatList
        bg={'white'}
        numColumns={2}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default RecenetItemComponent;
