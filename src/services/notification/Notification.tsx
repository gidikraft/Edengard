import { isAndroid } from '@/theme/platform';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';
import { getFromLS, saveToLS } from '../localStorage/storage';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

   isAndroid && PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  if (enabled) {
    console.log('Authorization status:', authStatus);
		getToken()
  }
};

const getToken = async () => {
	let fcmToken = await getFromLS('@fcmtoken');
	// let fcmToken = await AsyncStorage.getItem('@fcmtoken');

	console.log(fcmToken, "OLD TOKEN");
	if (!fcmToken) {
		try {
			fcmToken = await messaging().getToken()
			if (fcmToken) {
				console.log(fcmToken, "NEW TOKEN");
				await saveToLS('@fcmtoken', fcmToken)
			}
		} catch (error) {
			console.log("ERROR OCCUURRED TOKEN: ", isAndroid, error)
		}
	}
}

export const NoficationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body)
    console.log('Notification caused the app to open:', remoteMessage.notification);
  })

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('Notification caused app to open from quit state: ', remoteMessage.notification)
    }
  });

  messaging().onMessage(async remoteMessage => {
    Alert.alert(remoteMessage?.notification?.title, remoteMessage?.notification?.body);
    console.log("notification on foreground state", remoteMessage)
  })
};
