import React from 'react';
import {Box} from 'native-base';
import {ActivityIndicator} from 'react-native';

export const Loader = () => {
  return (
    <Box bg={'white'} flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator color={'silver'}  />
    </Box>
  );
};
