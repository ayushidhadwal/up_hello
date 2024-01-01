import React, { FC } from 'react';
import { HStack, Text, View, FlatList, Box, Image, VStack } from 'native-base';
import { RootStackScreenProps } from '../navigation/types';
import { useGetNotifications } from '../hooks/notifications/useGetNotifications';
import { Notification } from '../services/types';
import moment from 'moment';
import { Loader } from '../Common/Loader';

type Props = RootStackScreenProps<'Notification'>;

const NotificationScreen: FC<Props> = ({ navigation }) => {

  const { data, loading } = useGetNotifications();

  if (loading) {
    return <Loader />
  }



  const renderItem = ({ item }: { item: Notification }) => (
    <HStack
    py={1}
      minHeight={50}
      justifyContent={'space-between'}
      my={0.9}
      backgroundColor={'#faebd7'}
    >
      <VStack flex={1}>
        <Text ml={1} bold fontSize={'lg'}>{item.notificationTitle}</Text>
        <Text px={2} color={'gray.500'} fontSize={'sm'}>{item.notificationBody}</Text>
      </VStack>
      <Text pr={2} fontWeight={'light'}>{moment(item.createdAt).format("DD MM,YYYY")}</Text>
    </HStack>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList mt={4} data={data} renderItem={renderItem} />
    </View>
  );
};

export default NotificationScreen;
