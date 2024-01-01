import notifee, {
  AndroidImportance,
  AndroidVisibility,
  // EventType,
} from '@notifee/react-native';
import {Platform, AppState} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NOTIFICATION_CHANNEL = 'UpHello';
export const NOTIFICATION_TOKEN = 'notification:token';

export const getPermissions = async () => {
  await notifee.requestPermission();

  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: NOTIFICATION_CHANNEL,
      name: NOTIFICATION_CHANNEL,
      sound: 'default',
      vibration: true,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });
  } else {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }

  return true;
};

export const registerNotification = async () => {
  try {
    const enabled = await getPermissions();
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // console.log({ [Platform.OS]: fcmToken });
        // const result = await saveToken(fcmToken);
        await AsyncStorage.setItem(NOTIFICATION_TOKEN, fcmToken);
      }
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export const getNotificationToken = async () =>
  await AsyncStorage.getItem(NOTIFICATION_TOKEN);

export async function onMessageReceived(remoteMessage: any) {
  const {data} = remoteMessage;

  const extra = data?.extra ? JSON.parse(data?.extra) : {};

  if (
    extra?.chatType == 'chat_notifcation' &&
    AppState.currentState == 'active'
  ) {
    return null;
  }

  // if(){
  try {
    await notifee.displayNotification({
      title: data.title,
      body: data.body,
      data: data?.extra ? JSON.parse(data?.extra) : {},
      android: {
        sound: 'default',
        channelId: NOTIFICATION_CHANNEL,
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (e: any) {
    console.log(e.message);
  }
  // }
}
