import React, {useContext, useState} from 'react';
import {Button, FlatList, Image, Text, View} from 'native-base';
import {useGetMyItems} from '../../hooks/products/useGetMyItem';
import {Loader} from '../../Common/Loader';
import {MYItems} from '../../services/types';
import MyItemComponent from './MyItemComponent';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../../context/auth';
import FastImage from 'react-native-fast-image';

const AdsList = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const {items, loading, deleteItem} = useGetMyItems();

  const [delLoading, setDelLoading] = useState<boolean>(false);

  const {t} = useTranslation();

  if (loading) {
    return <Loader />;
  }

  const onDelete = async (id: number) => {
    setDelLoading(true);
    await deleteItem(id);
    setDelLoading(false);
  };

  if (delLoading) {
    return <Loader />;
  }

  if (items?.length === 0) {
    return (
      <View
        alignItems={'center'}
        justifyContent={'center'}
        flex={1}
        bg={'white'}>
        <FastImage
          style={{width: 250, height: 250}}
          source={require('../../../assets/images/no_items2.jpg')}
        />
        <Text mt={4} bold fontSize={'xl'}>
          {t("You haven't listed anything yet")}
        </Text>
        <Text mt={4}>{t("let go of what you don't use anymore")}</Text>
        <Button
          onPress={() => {
            navigation.navigate('AddScreen');
          }}
          mt={5}
          _text={{fontSize: 'lg'}}
          rounded={10}
          colorScheme={'red'}
          w={'70%'}>
          {t('Post')}
        </Button>
      </View>
    );
  }

  const renderItems = ({item}: {item: any}) => (
    <MyItemComponent onDelete={onDelete} items={item} />
  );

  return (
    <View flex={1} bg={'white'}>
      <FlatList data={items} renderItem={renderItems} />
    </View>
  );
};

export default AdsList;
