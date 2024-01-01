import React, {FC, useState, useEffect, useContext} from 'react';
import {RootStackScreenProps} from '../../navigation/types';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {AuthContext} from '../../context/auth';
import {View} from 'native-base';
import {firebase} from '@react-native-firebase/firestore';
import {useGetProfileDetails} from '../../hooks/profile/useGetProfileDetails';
import {ChatMessage} from '../Message/BuyingScreen';
import {chatNotifications} from '../../services/notifications/chatNotification';
import {t} from 'i18next';

type Props = RootStackScreenProps<'Chat'>;

export const MESSAGES = 'ChatMessages';
export const CHATS = 'Chats';

export type Chats = {
  _id: string;
  productImg: string;
  seller: {
    id: number;
    name: string;
  };
  buyerId: {
    id: number;
    username: string;
  };
  latestMessage: string;
  createdAt: any;
  productId: string;
  itemTitle: string;
};

const ChatScreen: FC<Props> = ({navigation, route}) => {
  const {chatId, sellerId, itemImage, sellerName, itemId, itemTitle} =
    route.params;

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [seenMessage, setSeenMessage] = useState(true);

  const {profile} = useGetProfileDetails();

  const {userId, userToken} = useContext(AuthContext);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const chatMessages = await firebase
          .firestore()
          .collection(MESSAGES)
          .orderBy('createdAt', 'desc')
          .where('chatId', '==', chatId)
          .get();

        if (chatMessages?.docs) {
          const firestoreMessages = chatMessages?.docs?.map(doc => {
            const item = doc.data();

            return {
              ...item,
              createdAt: item.createdAt.toDate(),
            } as any;
          });

          setMessages(firestoreMessages);
        }
      } catch (e: any) {
        console.log(e?.message);
      }
    };

    getAllMessages();

    const unsubscribe = firebase
      .firestore()
      .collection(MESSAGES)
      .orderBy('createdAt', 'desc')
      .where('chatId', '==', chatId)
      ?.onSnapshot(snapshot => {
        if (snapshot?.docs) {
          const newMessage = snapshot.docs.map(doc => {
            const item = doc.data();
            return {
              ...item,
              createdAt: item.createdAt.toDate(),
            } as any;
          });
          setMessages(newMessage);
        }
      });

    return unsubscribe;
  }, [sellerId, userId]);

  const onSend = async (msg = []) => {
    const {createdAt, text} = msg[0];

    // check if chat exists, if not exists than create chat else send msg directly.
    const chat = await firebase
      .firestore()
      .collection(CHATS)
      .where('_id', '==', chatId)
      .get();

    let exists = false;

    if (chat) {
      chat.docs.map(doc => {
        exists = true;
      });
    }

    // create a chat if not exists
    if (!exists) {
      firebase
        .firestore()
        .collection(CHATS)
        .add({
          _id: chatId,
          productImg: itemImage,
          seller: {
            id: sellerId,
            name: sellerName,
          },
          buyerId: {
            id: userId,
            username: profile?.username,
          },
          latestMessage: text,
          createdAt: createdAt,
          productId: itemId,
          itemTitle: itemTitle,
        });
    }

    // send message
    const myMsg: ChatMessage = {
      _id: Math.random().toString(),
      chatId,
      text: text,
      user: {
        _id: String(userId),
        username: profile?.username,
      },
      createdAt: createdAt,
    };

    setMessages((previousMessages: ChatMessage[]) =>
      GiftedChat.append(previousMessages, myMsg as any),
    );

    await firebase.firestore().collection(MESSAGES).add(myMsg);

    let notificationUserId = '';

    const d = await firebase
      .firestore()
      .collection(CHATS)
      .where('_id', '==', chatId)
      .get();
    if (d?.docs) {
      d.docs.map((doc: any) => {
        doc.id;

        const bId = doc._data.buyerId.id;
        const sId = doc._data.seller.id;

        if (+bId === Number(userId)) {
          notificationUserId = sId;
        }

        if (+sId === Number(userId)) {
          notificationUserId = bId;
        }

        doc.ref.update({
          latestMessage: text,
          createdAt: createdAt,
          // seenMessage:seenMessage
        });
      });
    }

    if (notificationUserId) {
      try {
        await chatNotifications(notificationUserId, itemId, text, userToken);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <View flex={1} bg={'white'}>
      <GiftedChat
        placeholder={t('Type a message')}
        alwaysShowSend={true}
        messages={messages}
        onSend={(messages: []) => onSend(messages)}
        user={{
          _id: String(userId),
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'red',
                },
              }}
            />
          );
        }}
        renderAvatar={null}
      />
    </View>
  );
};

export default ChatScreen;
