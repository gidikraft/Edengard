/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body)
  console.log('Message handled in the background!', remoteMessage);
});

database().setPersistenceEnabled(true);

AppRegistry.registerComponent(appName, () => App);
