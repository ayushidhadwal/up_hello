import { FlatList, Text, View, Button, Image } from 'native-base'
import React, { useState } from 'react'
import MyReelsComponent from './MyReelsComponent'
import { useGetMyReels } from '../../hooks/reels/useGetMyReels'
import { Loader } from '../../Common/Loader'
import { useTranslation } from 'react-i18next'

const MyReels = () => {


  const { data, loading, error, deleteItem } = useGetMyReels();

  const [delLoading, setDelLoading] = useState<boolean>(false);

  const {t} = useTranslation();


  if (loading) {
    return <Loader />
  }

  const onDelete = async (id: number) => {
    setDelLoading(true);
    await deleteItem(id);
    setDelLoading(false);
  }

  if (delLoading) {
    return <Loader />
  }

  if (data.length === 0) {
    return (
      <View alignItems={'center'} justifyContent={'center'} flex={1} bg={'white'}>
        <Image style={{width:300,height:300}} alt="no img" source={require('../../../assets/images/no_video.jpg')} />
        <Text mt={4} bold fontSize={'xl'}>{t("You haven't listed anything yet")}</Text>
        {/* <Button onPress={() => { navigation.navigate('AddScreen') }} mt={5} _text={{ fontSize: 'lg' }} rounded={10} colorScheme={'red'} w={'70%'}>Post</Button> */}
      </View>
    )
  }

  const renderItem = ({ item }: any) => (
    <MyReelsComponent item={item} onDelete={onDelete} />
  )


  return (
    <View flex={1} bg={'white'}>
      <FlatList numColumns={2} data={data} renderItem={renderItem} />
    </View>
  )
}

export default MyReels