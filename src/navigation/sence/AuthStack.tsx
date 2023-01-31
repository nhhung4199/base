import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'features/auth/LoginScreen';
import {stackNavigationConfigs} from 'navigation/config/options';
import {APP_ROUTE, AUTHENTICATE_ROUTE} from 'navigation/config/routes';
import React from 'react';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={stackNavigationConfigs}
      initialRouteName={APP_ROUTE.MAIN_TAB}>
      <Stack.Screen
        name={AUTHENTICATE_ROUTE.LOGIN_SCREEN}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
