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

import {PackagesStackScreenProps} from '../../navigation/types';

type Props = PackagesStackScreenProps<'Invoices'>;

const InvoicesScreen: FC<Props> = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height: 200, width: 200}}
        source={require('../../../assets/images/invoice.png')}
        alt={'no img'}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        You don't have invoices
      </Text>
      <Text style={{marginTop: 10}}>
        Haven't you tried our featured ads yet?
      </Text>
      <Text>Increase your views!</Text>
    </View>
  );
};

export default InvoicesScreen;
