import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, {FC} from 'react';
import {discountItemData} from './data';
import DiscountItem from './DiscountItem';

interface navigation {
  navigation: any;
}
type Props = navigation;

const DiscountItemComponent: FC<Props> = ({navigation}) => {
  const renderItem = ({item}: any) => (
    <DiscountItem
      name={item.name}
      image={item.img}
      price={item.original_price}
      discountPrice={item.discount_price}
      location={item.location}
      navigation={navigation}
      desc={item.desc}
    />
  );
  return (
    <Box>
      <HStack mt={5} mx={3} justifyContent={'space-between'}>
        <Text fontSize={'lg'}>Discount Item</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('DiscountItem');
          }}>
          <Text color={'red.500'} fontSize={'md'}>
            {t('View All')}
          </Text>
        </Pressable>
      </HStack>
      <FlatList
        keyExtractor={item => item.id}
        numColumns={2}
        data={discountItemData.slice(0, 2)}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default DiscountItemComponent;
