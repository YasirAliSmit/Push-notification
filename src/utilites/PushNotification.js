import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance} from '@notifee/react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('old Fcm Token:', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new Genrated Fcm Token:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default2',
    name: 'Default Channel 2',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title:`<p style="color: #4caf50;"><b>${data?.notification.title}</span></p></b></p> #0b223f;`,
    //data?.notification.title,
      //'<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
    subtitle: 'Plentys.Pk',
    //'&#129395;',
    body: `${data?.notification.body}&#128064   &#128069    `,
    //'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
    android: {
      channelId,
      //color: '#4caf50',
      // actions: [
      //   {
      //     title: '<b>Dance</b> &#128111;',
      //     pressAction: {id: 'dance'},
      //   },
      //   {
      //     title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
      //     pressAction: {id: 'cry'},
      //   },
      // ],
    },
  });
}

export const notificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    onDisplayNotification(remoteMessage)
  });
    //forground Messeges
    messaging().onMessage(async remoteMessage => {
      console.log('Notification caused app to open from forground state:',remoteMessage);
      onDisplayNotification(remoteMessage)
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          
            onDisplayNotification(remoteMessage)
          );
        }
      });

};
