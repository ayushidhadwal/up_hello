import { FlatList, Box, View } from 'native-base';
import React from 'react';
import { useGetBanner } from '../../../hooks/useGetBanner';
import { Banner } from '../../../hooks/types';
import Config from '../../../config';
import ImageBanner from '../../../components/ImageBanner';
import FastImage from 'react-native-fast-image';

const AddComponent = () => {

  const { data,  error } = useGetBanner();

  if(error)(
    <ImageBanner
        alt={'no img'}
        resizeMode="stretch"
        style={{
          height: 85,
          width: '100%'
        }}
        source={{
          uri: `${Config.API_URL}/${''}`,
        }}
      />
  )


  const renderItem = ({ item }: { item: Banner }) => {
    return (
      <FastImage
        resizeMode="stretch"
        style={{
          height: 85,
          width: '100%'
        }}
        source={{
          uri: `${Config.API_URL}/${item.image}`,
        }}
      />
    )
  }

  return (
    <Box mb={1} style={{ height: 85 }}>
      <FlatList  data={data.slice(0, 1)} renderItem={renderItem} />
    </Box>
  );
};

export default AddComponent;