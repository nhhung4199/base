import {CardStyleInterpolators} from '@react-navigation/stack';
import {Platform} from 'react-native';
import transition from './transition';
const isIos = Platform.OS === 'ios';

export const stackNavigationConfigs: any = {
  cardStyle: {
    backgroundColor: '#fff',
  },
  headerShown: false,
  gestureEnabled: isIos,
  keyboardHandlingEnabled: isIos,
  cardShadowEnabled: true,
  cardOverlayEnabled: true,
  transitionSpec: {
    open: transition,
    close: transition,
  },
};

const navigationConfigs: any = {
  cardStyle: {
    backgroundColor: '#fff',
  },
  headerShown: false,
  gestureEnabled: isIos,
  keyboardHandlingEnabled: isIos,
  cardShadowEnabled: true,
  cardOverlayEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: transition,
    close: transition,
  },
};

export default navigationConfigs;
