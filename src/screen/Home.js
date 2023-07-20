import { StyleSheet, Text, View } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { NavigationActions, StackActions } from '@react-navigation/native';
import { AppState } from 'react-native';

const Home = () => {



 
 
 
  const navigation = useNavigation()
  // messaging().onMessage(remoteMessage => {
  //   // messaging().OnMessage() trigger when our app is on forground mean our app is open  and you can get you data json using this methode
  //   const {notification} = remoteMessage;
   


  // navigation.navigate(remoteMessage.data.screenName);

    
  // });
  // messaging()
  //   .getInitialNotification() //When the app is in the kill mode (also known as the "closed app" mode):If the user taps on a notification to open the app, the notification data is passed to the app through getInitialNotification(). You can use this method to retrieve the notification data when the app is launched from a notification click
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       // Extract the message or text from the remoteMessage object
  //       const {notification} = remoteMessage;
     

  //       // Display the message or text using an alert, console log, or any other UI component
  //       navigation.navigate(remoteMessage.data.screenName);
  //     }
  //   });
  // messaging().onNotificationOpenedApp(remoteMessage => {   //Here's how you can use messaging().onNotificationOpenedApp to handle notification clicks when the app is in the background mode:
  //   // Extract the message or text from the remoteMessage object
  //   const {notification} = remoteMessage;
  //   const {body} = notification;

  //   // Display the message or text using an alert, console log, or any other UI component
  //   navigation.navigate(remoteMessage.data.screenName);

  // });
 
  return (
    <View>
      <Text>Homesssss</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})