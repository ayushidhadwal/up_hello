import {
  HStack,
  Image,
  Text,
  VStack,
  View,
  Box,
  Button,
  Divider,
  Pressable,
} from 'native-base';
import React, {FC} from 'react';

import {
  OrderTopBarScreenProps,
  PackagesStackScreenProps,
} from '../../navigation/types';

type Props = OrderTopBarScreenProps<'Active'>;

const ActiveOrderScreen: FC<Props> = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../assets/images/search.png')}
        alt={'no img'}
        style={{height: 200, width: 200}}
      />
      <Text style={{fontWeight: 'bold', fontSize: 18}}>Nothing here...</Text>
      <Text mt={1}>You don't have any expired package</Text>
    </View>
  );
};

export default ActiveOrderScreen;
