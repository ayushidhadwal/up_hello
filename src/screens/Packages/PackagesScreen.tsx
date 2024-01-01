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
import React, { FC } from 'react';

import { PackagesStackScreenProps } from '../../navigation/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = PackagesStackScreenProps<'Packages'>;

const PackagesScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Pressable onPress={() => navigation.navigate('BuyPackages',{subCategory:''})}>
        <HStack  justifyContent={'space-between'} alignItems={'center'} py={3} px={4}>
          <VStack >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Buy Packages</Text>
            <Text>Sell faster, more & higher margins with packages</Text>
          </VStack>
          <MaterialIcons
            style={{ alignSelf: 'center',   }}
            name="arrow-forward-ios"
            size={18}
            color="black"
          />
        </HStack>
      </Pressable>



      <Divider />
      <Pressable onPress={() => navigation.navigate('Orders')}>
        <HStack justifyContent={'space-between'} alignItems={'center'} py={3} px={4}>
          <VStack flex={1}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My Orders</Text>
            <Text>Active, Scheduled and expired orders</Text>
          </VStack>
          <MaterialIcons
            style={{ alignSelf: 'center', }}
            name="arrow-forward-ios"
            size={18}
            color="black"
          />
        </HStack>
      </Pressable>


      <Divider />
      <Pressable onPress={() => navigation.navigate('Invoices')}>
        <HStack justifyContent={'space-between'} alignItems={'center'} py={3} px={4}>
          <VStack flex={1}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Invoices</Text>
            <Text>See and download your invoices</Text>
          </VStack>
          <MaterialIcons
            style={{ alignSelf: 'center', }}
            name="arrow-forward-ios"
            size={18}
            color="black"
          />
        </HStack>
      </Pressable>
      <Divider />
    </View>
  );
};

export default PackagesScreen;
