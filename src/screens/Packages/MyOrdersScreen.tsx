import {View} from 'native-base';
import React, {FC} from 'react';

import {PackagesStackScreenProps} from '../../navigation/types';
import TopOrderNavigation from '../../navigation/TopOrderNavigation';

type Props = PackagesStackScreenProps<'Orders'>;

const MyOrdersScreen: FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopOrderNavigation />
    </View>
  );
};

export default MyOrdersScreen;
