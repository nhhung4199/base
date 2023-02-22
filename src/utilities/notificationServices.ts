// import messaging from '@react-native-firebase/messaging';
// import NotifService from '../../NotifService';
// const createNoti = new NotifService();

// export const getTokenMessage = async () => {
//   const token = await messaging().getToken();
//   if (!token) return undefined;
//   return token;
// };
// export async function requestUserPermission() {
//   await messaging().requestPermission({
//     sound: false,
//     announcement: true,
//     badge: true,
//     carPlay: true,
//     provisional: false,
//   });
// }

// export async function checkApplicationPermission() {
//   const authorizationStatus = await messaging().requestPermission();
//   if (
//     authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
//   ) {
//     getTokenMessage();
//   } else if (
//     authorizationStatus === messaging.AuthorizationStatus.DENIED // value === 0
//   ) {
//     console.log('Notification permissions DENIED');
//   } else {
//     console.log('Notification permissions disabled');
//   }
// }

// export const notificationListener = () => {
//   messaging().onNotificationOpenedApp(async remoteMessage => {
//     console.log(remoteMessage);
//   });
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(remoteMessage);
//       }
//     });
//   const onMessage = messaging().onMessage(async remoteMessage => {
//     console.log(remoteMessage);
//     createNoti.localNotif(remoteMessage);
//   });
//   return onMessage;
// };
