// import PushNotification from 'react-native-push-notification';
// import NotificationHandler from './NotificationHandler';

// export default class NotifService {
//   [x: string]: any;
//   constructor(onRegister?: any, onNotification?: any) {
//     this.lastChannelCounter = 0;
//     this.messageIdT = 0;
//     this.createDefaultChannels();

//     NotificationHandler.attachRegister(onRegister);
//     NotificationHandler.attachNotification(onNotification);

//     PushNotification.getApplicationIconBadgeNumber(function (number) {
//       if (number > 0) {
//         PushNotification.setApplicationIconBadgeNumber(0);
//       }
//     });
//   }

//   createDefaultChannels() {
//     PushNotification.createChannel(
//       {
//         channelId: 'channel-id-default',
//         channelName: `Default channel`,
//         channelDescription: 'A default channel',
//         smallIcon: 'ic_stat_notification',
//       },
//       created =>
//         console.log(`createChannel 'default-channel-id' returned '${created}'`),
//     );
//   }

//   popInitialNotification() {
//     PushNotification.popInitialNotification(notification =>
//       console.log('InitialNotication:', notification),
//     );
//   }

//   localNotif(remoteMessage) {
//     if (this.messageIdT === remoteMessage.messageId) return;
//     this.messageIdT = remoteMessage.messageId;
//     PushNotification.localNotification({
//       smallIcon: 'ic_launcher',
//       channelId: 'channel-id-default',
//       id: remoteMessage.messageId,
//       title: remoteMessage?.notification?.title,
//       message: remoteMessage?.notification?.body,
//       userInfo: remoteMessage?.data,
//     });
//   }

//   scheduleNotif(remoteMessage) {
//     PushNotification.localNotificationSchedule({
//       channelId: 'channel-id-default',
//       id: new Date().getUTCMilliseconds(),
//       title: remoteMessage?.notification?.title,
//       message: remoteMessage?.notification?.body,
//     });
//   }

//   checkPermission(cbk) {
//     return PushNotification.checkPermissions(cbk);
//   }

//   requestPermissions() {
//     return PushNotification.requestPermissions();
//   }

//   cancelNotif(id) {
//     PushNotification.cancelLocalNotification(id);
//   }

//   cancelAll() {
//     PushNotification.cancelAllLocalNotifications();
//   }

//   abandonPermissions() {
//     PushNotification.abandonPermissions();
//   }

//   getScheduledLocalNotifications(callback) {
//     PushNotification.getScheduledLocalNotifications(callback);
//   }

//   getDeliveredNotifications(callback) {
//     PushNotification.getDeliveredNotifications(callback);
//   }
// }
