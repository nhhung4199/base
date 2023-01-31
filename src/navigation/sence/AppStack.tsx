import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'features/home/HomeScreen';
import navigationConfigs from 'navigation/config/options';
import {APP_ROUTE, TAB_NAVIGATION_ROOT} from 'navigation/config/routes';
import React from 'react';
import MainTabContainer from './TabSence';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationConfigs}>
      <Stack.Screen
        name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_SCREEN}
        component={HomeScreen}
      />
      <Stack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
    </Stack.Navigator>
  );
};

export default AppStack;
