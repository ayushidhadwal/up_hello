import {Box, FlatList, HStack, Pressable, Text} from 'native-base';
import React, {FC} from 'react';
import {PopularItemdata} from './data';
import Item from './Item';

interface navigation {
  navigation: any;
}
type Props = navigation;

const PopularItemComponent: FC<Props> = ({navigation}) => {
  const renderItem = ({item}: any) => (
    <Item
      name={item.name}
      image={item.img}
      price={item.price}
      location={item.location}
      navigation={navigation}
      desc={item.desc}
    />
  );
  return (
    <Box>
      <HStack mt={2} mx={3} justifyContent={'space-between'}>
        <Text fontSize={'lg'}>Popular Item</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('PopularItem');
          }}>
          <Text color={'red.500'} fontSize={'md'}>
            {t('View All')}
          </Text>
        </Pressable>
      </HStack>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        numColumns={2}
        data={PopularItemdata}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default PopularItemComponent;
