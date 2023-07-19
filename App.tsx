import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect} from 'react';
import {
  requestUserPermission,
  notificationServices,
} from './src/utilites/PushNotification';
import Notification from './src/utilites/screen/Notification';

const App = () => {
  //There are Three type of Notification
  //1.Forground Mode it means our app is open
  //2.background Mode Notication it means our is not open
  //3.Kill Mode it means our app is properly close
  useEffect(() => {
    requestUserPermission();
    notificationServices();
  }, []);

   
  return (
  <Notification/>
  );
};
//https://www.youtube.com/watch?v=p0w-1Xcc4tE

export default App;

const styles = StyleSheet.create({});
