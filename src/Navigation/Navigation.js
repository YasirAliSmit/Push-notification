import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import Detail from '../screen/Detail';
import Splash from '../screen/Splash';
import Sale from '../screen/Sale';
import Notification from '../screen/Notification';
import {NavigationContainer} from '@react-navigation/native';
import Shoes from '../screen/Shoes';
import Shirt from '../screen/Shirt';
import Pant from '../screen/Pant';
import Shampoo from '../screen/Shampoo';
import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationActions, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Navigation = () => {
   const Stack = createNativeStackNavigator()
  // const appState = useRef(AppState.currentState);
  // const navigationRef = useRef(null);

  // useEffect(() => {
  //   // Set up push notification handling
  //   const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
  //     if (appState.current === 'active') {
  //       const { screenName } = remoteMessage.data;
  //       navigateToScreen(screenName);
  //     }
  //   });

  //   AppState.addEventListener('change', handleAppStateChange);

  //   checkStoredNotificationData();

  //   return () => {
  //     unsubscribeForeground();
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  // const handleAppStateChange = async (nextAppState) => {
  //   if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //     // App is coming from the background or inactive state to active (foreground) state.
  //     const storedNotificationData = await AsyncStorage.getItem('notificationData');

  //     if (storedNotificationData) {
  //       const { screenName } = JSON.parse(storedNotificationData);
  //       navigateToScreen(screenName);
  //       // Clear the stored notification data after navigating
  //       await AsyncStorage.removeItem('notificationData');
  //     }
  //   }
  //   appState.current = nextAppState;
  // };

  // // Function to handle navigation to the screen
  // const navigateToScreen = (screenName) => {
  //   // Assuming you have defined the correct screen names in your navigation stack
  //   // Replace 'Home' and 'Detail' with the actual screen names you have defined in your app
  //  switch (screenName) {
  // case 'Home':
  //   // Navigate to the Home screen
  //   navigationRef.current?.dispatch(StackActions.replace('Home'));
  //   break;
  // case 'Detail':
  //   // Navigate to the Detail screen
  //   navigationRef.current?.dispatch(StackActions.replace('Detail'));
  //   break;
  //   case 'Sale':
  //   // Navigate to the Detail screen
  //   navigationRef.current?.dispatch(StackActions.replace('Sale'));
  //   break;
  //   case 'Shoes':
  //     // Navigate to the Detail screen
  //     navigationRef.current?.dispatch(StackActions.replace('Shoes'));
  //     break;
  //     case 'Shirt':
  //       // Navigate to the Detail screen
  //       navigationRef.current?.dispatch(StackActions.replace('Shirt'));
  //       break;
  // default:
  //   // If the screenName is not recognized, show an error message
  //   console.warn(`Screen ${screenName} not recognized.`);
  // }
  // };

  // // Function to check for stored notification data when the app starts
  // const checkStoredNotificationData = async () => {
  //   const storedNotificationData = await AsyncStorage.getItem('notificationData');
  //   if (storedNotificationData) {
  //     const { screenName } = JSON.parse(storedNotificationData);
  //     navigateToScreen(screenName);
  //     // Clear the stored notification data after navigating
  //     await AsyncStorage.removeItem('notificationData');
  //   }
  // };
  const appState = useRef(AppState.currentState);
  const navigationRef = useRef(null);

  useEffect(() => {
    // Set up push notification handling for the foreground
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      if (appState.current === 'active') {
        const {screenName} = remoteMessage.data;
        navigateToScreen(screenName);
      }
    });

    // Set up push notification handling for the background/killed mode
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const {screenName} = remoteMessage.data;
      await AsyncStorage.setItem(
        'notificationData',
        JSON.stringify(remoteMessage.data),
      );
      return null; // Return null or a Promise
    });

    AppState.addEventListener('change', handleAppStateChange);

    checkStoredNotificationData();

    return () => {
      unsubscribeForeground();
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // App is coming from the background or inactive state to active (foreground) state.
      const storedNotificationData = await AsyncStorage.getItem(
        'notificationData',
      );

      if (storedNotificationData) {
        const {screenName} = JSON.parse(storedNotificationData);
        navigateToScreen(screenName);
        // Clear the stored notification data after navigating
        await AsyncStorage.removeItem('notificationData');
      }
    }
    appState.current = nextAppState;
  };

  // Function to handle navigation to the screen
  const navigateToScreen = screenName => {
    // Assuming you have defined the correct screen names in your navigation stack
    // Replace 'Home' and 'Detail' with the actual screen names you have defined in your app
    switch (screenName) {
      case 'Home':
        // Navigate to the Home screen
        navigationRef.current?.dispatch(StackActions.replace('Home'));
        break;
      case 'Detail':
        // Navigate to the Detail screen
        navigationRef.current?.dispatch(StackActions.replace('Detail'));
        break;
      case 'Sale':
        // Navigate to the Detail screen
        navigationRef.current?.dispatch(StackActions.replace('Sale'));
        break;
      case 'Shoes':
        // Navigate to the Detail screen
        navigationRef.current?.dispatch(StackActions.replace('Shoes'));
        break;
      case 'Shirt':
        // Navigate to the Detail screen
        navigationRef.current?.dispatch(StackActions.replace('Shirt'));
        break;
      default:
        // If the screenName is not recognized, show an error message
        console.warn(`Screen ${screenName} not recognized.`);
    }
  };

  // Function to check for stored notification data when the app starts
  const checkStoredNotificationData = async () => {
    const storedNotificationData = await AsyncStorage.getItem(
      'notificationData',
    );
    if (storedNotificationData) {
      const {screenName} = JSON.parse(storedNotificationData);
      navigateToScreen(screenName);
      // Clear the stored notification data after navigating
      await AsyncStorage.removeItem('notificationData');
    }
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Sale" component={Sale} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Shoes" component={Shoes} />
        <Stack.Screen name="Shirt" component={Shirt} />
        <Stack.Screen name="Pant" component={Pant} />
        <Stack.Screen name="Shampoo" component={Shampoo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
