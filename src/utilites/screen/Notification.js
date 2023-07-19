import {StyleSheet, Text, View, Button} from 'react-native';
import React, { useEffect } from 'react';
import notifee, {AndroidImportance} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const Notification = () => {

messaging().onMessage(remoteMessage => {
    
    const { notification } = remoteMessage;
    const { body } = notification;

    alert(remoteMessage.data.name);
  
  });
  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      // Extract the message or text from the remoteMessage object
      const { notification } = remoteMessage;
      const { body } = notification;
  
      // Display the message or text using an alert, console log, or any other UI component
      alert(remoteMessage.data.name);
    }
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    // Extract the message or text from the remoteMessage object
    const { notification } = remoteMessage;
    const { body } = notification;
  
    // Display the message or text using an alert, console log, or any other UI component
    alert(remoteMessage.data.name);
  });
  async function onDisplayNotification() {
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
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }
 
  return (
    <View>
      <Button title="Click Me" onPress={onDisplayNotification} />
<Text>Hello </Text>   
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
