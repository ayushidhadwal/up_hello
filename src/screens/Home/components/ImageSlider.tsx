import { Box, } from 'native-base';
import React from 'react';
import Swiper from 'react-native-swiper';
import { useGetSlider } from '../../../hooks/useGetSlider';
import Config from '../../../config';
import FastImage from 'react-native-fast-image';


const ImageSlider = () => {

  const { data, error } = useGetSlider()

  if (error || data.length === 0) {
    return <Box />
  }


  return (
    <Box px={5} py={3} bg={'#fff'}>
      <Swiper height={150} autoplay activeDotColor="red">

        {data.map((slide, i) => (
          <Box  width={'100%'} height={'100%'} key={i.toString()}>
            <FastImage
              source={{
                uri: `${Config.API_URL}/${slide.image}`,
              }}
              style={{
                width: '100%',
                height: '100%'
              }}
              resizeMode={'stretch'}
            />
          </Box>
        ))}

      </Swiper>
    </Box>
  );
};

export default ImageSlider;
