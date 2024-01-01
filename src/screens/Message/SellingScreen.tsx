import { Box, Divider, FlatList, Text, VStack, View, HStack, Pressable, Image } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { RootNavigationProps } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import { AuthContext } from '../../context/auth';
import { Loader } from '../../Common/Loader';
import ImageBackground from '../../components/ImageBackground';
import Config from '../../config';
import { CHATS, Chats } from '../chat/ChatScreen';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const SellingScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const [messages, setMessages] = useState<Chats[]>([]);

  const [loading, setLoading] = useState(false)

  const { userId } = useContext(AuthContext)

  const {t} = useTranslation()


  useEffect(() => {
    const getAllMessages = async () => {
      setLoading(true)
      try {
        const chatMessages = await firebase
          .firestore()
          .collection(CHATS)
          .orderBy('createdAt', 'desc')
          .where('seller.id', "==", userId)
          .get();

        if (chatMessages) {
          const firestoreMessages = chatMessages.docs.map(doc => {
            const item = doc.data();

            return {
              ...item,
              createdAt: item.createdAt.toDate(),
            } as any;
          });


          setMessages(firestoreMessages);

        }
        setLoading(false)
      } catch (e: any) {
        console.log(e?.message);
        setLoading(false)
      }
    };
    
    getAllMessages();


    const unsubscribe = firebase
      .firestore()
      .collection(CHATS)
      .where('seller.id', "==", userId)
      .onSnapshot(snapshot => {
        const newMessage = snapshot.docs.map(doc => {
          const item = doc.data();
          return {
            ...item,
            createdAt: item.createdAt.toDate(),
          } as any;
        });

        setMessages(newMessage);
      });

    return unsubscribe;

  }, [navigation, userId])



  if (loading) {
    return <Loader />
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
          uri: 'https://cdn01.alison-static.net/courses/5118/alison_courseware_intro_5118.jpg',
        }}
      />
      <Text fontSize={'xl'} bold>
        {t("You currently have no message")}
      </Text>
      <Text fontSize={'sm'} bold>
        {t("Upload your item to market and sell easily")}
      </Text>
      
    </View>

    )
  }




  const renderItem = ({ item }: { item: Chats }) => {

    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Chat', {
            chatId: item._id,
            itemId: Number(item.productId),
            itemImage: item.productImg,
            itemTitle: item.itemTitle,
            sellerId: Number(item.seller.id),
            sellerName: item.seller.name
          })
        }}
        w={'100%'}
        mt={3}>
        <HStack>
          <Box>

            <ImageBackground key={item._id} source={{ uri: `${Config.API_URL}/public/${item.productImg}` }}
              style={{
                width: 50,
                height: 50,
                alignSelf: 'center',
                marginLeft: 5,
              }}
              resizeMode={'contain'}
              alt="no img"
            />
          </Box>

          <VStack flex={1} ml={3}>
            <Text bold fontSize={'lg'}>{item.buyerId.username}</Text>
            <Text fontSize="lg" color={'black'} numberOfLines={1}>{item.itemTitle}</Text>
            <Text color={'grey'} numberOfLines={1}>{item.latestMessage}</Text>
          </VStack>
          <Text fontWeight={'light'} mr={2}>{moment(item.createdAt).format("DD MMM,YYYY")}</Text>
        </HStack>
        <Divider mt={2} />
      </Pressable>
    )
  }


  return (
    <View
      flex={1}
      backgroundColor={'white'}>
      <FlatList
        data={messages}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SellingScreen;
