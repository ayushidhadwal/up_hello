import { Box, Pressable, View } from 'native-base';
import React, { FC, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from '../../../config';
import ImageBackground from '../../../components/ImageBackground';
import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal, TouchableOpacity } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FastImage from 'react-native-fast-image';



type Props = {
  image: string[] | undefined;
  navigation: any;
};

const ImageComponent: FC<Props> = ({ image, navigation }) => {

  const [imageModal, setImageModal] = useState(false)


  return (
    <Box bg={'white'} borderBottomWidth={0.5}>
      {
        image !== undefined ?
          <>

            <Swiper height={300}>
              <View position={'relative'}>

                {image.map((slide, i) => (

                  <FastImage
                    source={{ uri: `${Config.API_URL}/public/${slide}` }}
                    style={{ width: '100%', height: 300 }}
                    resizeMode={FastImage.resizeMode.contain}
                  />


                  // <ImageBackground
                  //   key={i.toString()}
                  //   source={{ uri: `${Config.API_URL}/public/${slide}` }}
                  //   resizeMode={'contain'}
                  //   style={{
                  //     // marginVertical: 5,
                  //     flex: 1,
                  //     width: '100%',
                  //     height: 300,
                  //     alignSelf: 'center',
                  //     backgroundColor: 'white',
                  //     flexDirection: 'row',
                  //   }}
                  //   alt={'no img'}
                  // >
                  //   
                  // </ImageBackground>
                ))}
                <View position={'absolute'} top={0} bottom={0} right={0} left={0}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => { setImageModal(true) }}>

                  </TouchableOpacity>
                </View>
              </View>
            </Swiper>


            {/* modal */}
            <Modal visible={imageModal} transparent={true}>
              <ImageViewer onCancel={() => { setImageModal(false) }} enableSwipeDown={true} imageUrls={image.map((item) => ({ url: `${Config.API_URL}/public/${item}` }))} />
              <Pressable position='absolute' style={{ paddingVertical: 14, paddingHorizontal: 14, alignSelf: 'flex-end' }} onPress={() => setImageModal(false)}><MaterialIcons name="cancel" size={30} color="white" /></Pressable>
            </Modal>
            



            <Box left={1} position={'absolute'}>
              <Ionicons
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ padding: 5 }}
                color={'grey'}
                name="arrow-back-circle"
                size={50}
              />
            </Box> 
          </>

          : null
      }
    </Box >
  );
};

export default ImageComponent;
