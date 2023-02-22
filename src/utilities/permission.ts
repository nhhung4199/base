// /* eslint-disable consistent-return */
// import {Alert} from 'react-native';
// import {
//   check,
//   openSettings,
//   PERMISSIONS,
//   request,
//   RESULTS,
// } from 'react-native-permissions';
// import TouchID from 'react-native-touch-id';
// import dummyData from './dummyData';
// import SimpleToast from 'react-native-simple-toast';

// import {isIos} from './metric';

// const messages = {
//   camera:
//     'Bạn đã từ chỗi quyền truy cập camera. Hãy tới cài đặt để đặt lại quyền cho ứng dụng.',

//   photo: 'Bạn có muốn đặt lại quyền truy cập ảnh và video cho ứng dụng.',

//   location:
//     'Bạn đã từ chỗi quyền truy cập vị trí. Hãy tới cài đặt để đặt lại quyền cho ứng dụng.',
//   microPhone:
//     'Bạn đã từ chỗi quyền truy cập MicroPhone. Hãy tới cài đặt để đặt lại quyền cho ứng dụng.',
// };

// const showRequestPermission = type => {
//   Alert.alert(
//     '',
//     messages?.[type],
//     [
//       {
//         text: 'Không',
//         style: 'default',
//       },
//       {
//         text: 'Đi tới cài đặt',
//         onPress: openSettings,
//       },
//     ],
//     {cancelable: false},
//   );
// };

// export const checkCamera = async () => {
//   try {
//     const permissionCode = isIos
//       ? PERMISSIONS.IOS.CAMERA
//       : PERMISSIONS.ANDROID.CAMERA;
//     const checkPermission = await check(permissionCode);
//     switch (checkPermission) {
//       case RESULTS.UNAVAILABLE:
//         const unavailableRequest = await request(permissionCode);
//         if (unavailableRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.DENIED:
//         const resultRequest = await request(permissionCode);
//         if (resultRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.LIMITED:
//         return true;
//       case RESULTS.GRANTED:
//         return true;
//       case RESULTS.BLOCKED:
//         showRequestPermission('camera');
//         return false;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const checkPhoto = async () => {
//   try {
//     const permissionCode = isIos
//       ? PERMISSIONS.IOS.PHOTO_LIBRARY
//       : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
//     const checkPermission = await check(permissionCode);
//     switch (checkPermission) {
//       case RESULTS.UNAVAILABLE:
//         const unavailableRequest = await request(permissionCode);
//         if (unavailableRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.DENIED:
//         const resultRequest = await request(permissionCode);
//         if (resultRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.LIMITED:
//         return true;
//       case RESULTS.GRANTED:
//         return true;
//       case RESULTS.BLOCKED:
//         showRequestPermission('photo');
//         return false;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const checkLocation = async () => {
//   try {
//     const permissionCode = isIos
//       ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//       : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//     const checkPermission = await check(permissionCode);
//     switch (checkPermission) {
//       case RESULTS.UNAVAILABLE:
//         const unavailableRequest = await request(permissionCode);
//         if (unavailableRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.DENIED:
//         const resultRequest = await request(permissionCode);
//         if (resultRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.LIMITED:
//         const permission = await request(permissionCode);
//         if (permission === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.GRANTED:
//         return true;
//       case RESULTS.BLOCKED:
//         showRequestPermission('location');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const checkMicroPhone = async () => {
//   try {
//     const permissionCode = isIos
//       ? PERMISSIONS.IOS.MICROPHONE
//       : PERMISSIONS.ANDROID.RECORD_AUDIO;
//     const checkPermission = await check(permissionCode);
//     switch (checkPermission) {
//       case RESULTS.UNAVAILABLE:
//         const unavailableRequest = await request(permissionCode);
//         if (unavailableRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.DENIED:
//         const resultRequest = await request(permissionCode);
//         if (resultRequest === RESULTS.GRANTED) return true;
//         return false;
//       case RESULTS.LIMITED:
//         return true;
//       case RESULTS.GRANTED:
//         return true;
//       case RESULTS.BLOCKED:
//         showRequestPermission('microPhone');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const checkTouchIdSupport = () =>
//   TouchID.isSupported(dummyData.optionalConfigObject).catch(error => {
//     if (error.code === 'NOT_SUPPORTED' || error.code === 'NOT_PRESENT') {
//       SimpleToast.show('errorMessage.NotSupported', 2000);
//       return false;
//     }
//     if (error.code === 'NOT_AVAILABLE') {
//       SimpleToast.show('errorMessage.NotAvailable', 2000);
//       return false;
//     }
//     if (error.code === 'NOT_ENROLLED') {
//       SimpleToast.show('errorMessage.NotEnrolled', 2000);
//       return false;
//     }
//     return true;
//   });
