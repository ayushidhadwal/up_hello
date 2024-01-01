import React, {FC} from 'react';
import {Box, Button, Image, Text, VStack, View} from 'native-base';
import {Dimensions} from 'react-native';
import {data} from './data';

type Props = {
  onSkip: () => void;
  onNext: () => void;
  id: number;
  title: string;
  image: string;
  desc: string;
  index: number;
};

const GetStartItem: FC<Props> = ({
  onSkip,
  onNext,
  id,
  title,
  image,
  desc,
  index,
}) => {
  const window = Dimensions.get('window');

  return (
    <Box alignItems={'center'} w={window.width}>
      <Image
        alignSelf={'center'}
        source={image}
        resizeMode={'contain'}
        alt="slider img"
        size={'400'}
        h={'80%'}
      />
      <Box alignItems={'center'} justifyContent={'center'}>
        <Text mb={2} fontSize={'2xl'} bold>
          {title}
        </Text>
        <Text mx={2} textAlign={'center'} mb={2} fontSize={'md'}>
          {desc}
        </Text>
      </Box>
    </Box>
  );
};

export default GetStartItem;
