import {
  FlatList,
  Text,
  View,
  VStack,
  Divider,
  HStack,
  Pressable,
  Image,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/auth';
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigation/types';
import {Loader} from '../../Common/Loader';
import ImageBackground from '../../components/ImageBackground';
import Config from '../../config';
import moment from 'moment';
import {CHATS, Chats} from '../chat/ChatScreen';
import {useTranslation} from 'react-i18next';

export type ChatMessage = {
  _id: string;
  chatId: string;
  text: string;
  user: {
    _id: string;
    username: string | undefined;
  };
  createdAt: any;
};

const BuyingScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const {userId} = useContext(AuthContext);

  const [messages, setMessages] = useState<Chats[]>([]);

  const [loading, setLoading] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    const getAllMessages = async () => {
      setLoading(true);
      try {
        const chatMessages = await firebase
          .firestore()
          .collection(CHATS)
          .orderBy('createdAt', 'desc')
          .where('buyerId.id', '==', userId)
          .get();

        if (chatMessages) {
          const firestoreMessages = chatMessages?.docs?.map(doc => {
            const item = doc.data();
            return {
              ...item,
              createdAt: item.createdAt.toDate(),
            } as any;
          });

          setMessages(firestoreMessages);
        }

        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        console.log(e?.message);
      }
    };

    getAllMessages();

    const unsubscribe = firebase
      .firestore()
      .collection(CHATS)
      .orderBy('createdAt', 'desc')
      .where('buyerId.id', '==', userId)
      .onSnapshot(snapshot => {
        const newMessage = snapshot?.docs?.map(doc => {
          const item = doc.data();
          return {
            ...item,
            createdAt: item.createdAt.toDate(),
          } as any;
        });

        setMessages(newMessage);
      });

    return unsubscribe;
  }, [userId, navigation]);

  if (loading) {
    return <Loader />;
  }

  if (messages.length === 0) {
    return (
      <View
        pb={10}
        justifyContent={'center'}
        alignItems={'center'}
        flex={1}
        backgroundColor={'white'}>
        <Image
          width={350}
          h={300}
          alt="img"
          source={{
            uri: 'https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-1172.jpg?size=626&ext=jpg&uid=R108125796&ga=GA1.2.973041845.1687870079&semt=ais',
          }}
        />
        <Text fontSize={'xl'} bold>
          {t('You currently have no message')}
        </Text>
        <Text fontSize={'sm'} bold>
          {t('You can buy easily from the other sellers')}
        </Text>
      </View>
    );
  }

  const renderItem = ({item}: {item: Chats}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Chat', {
            chatId: item._id,
            itemId: Number(item.productId),
            itemImage: item.productImg,
            itemTitle: item.itemTitle,
            sellerId: Number(item.seller.id),
            sellerName: item.seller.name,
          });
        }}
        w={'100%'}
        mt={3}>
        <HStack>
          <ImageBackground
            key={item._id}
            source={{uri: `${Config.API_URL}/public/${item.productImg}`}}
            style={{width: 50, height: 50, alignSelf: 'center', marginLeft: 5}}
            resizeMode={'contain'}
            alt="no img"
          />
          <VStack flex={1} ml={3}>
            <Text bold fontSize={'lg'}>
              {item.seller.name}
            </Text>
            <Text fontSize="lg" color={'black'} numberOfLines={1}>
              {item.itemTitle}
            </Text>
            <Text color={'grey'} numberOfLines={1}>
              {item.latestMessage}
            </Text>
          </VStack>
          <Text fontWeight={'light'} mr={2}>
            {moment(item.createdAt).format('DD MMM,YYYY')}
          </Text>
        </HStack>
        <Divider mt={2} />
      </Pressable>
    );
  };

  return (
    <View pb={10} flex={1} backgroundColor={'white'}>
      <FlatList data={messages} renderItem={renderItem} />
    </View>
  );
};

export default BuyingScreen;
