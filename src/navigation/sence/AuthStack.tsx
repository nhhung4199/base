import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'features/auth/LoginScreen';
import {stackNavigationConfigs} from 'navigation/config/options';
import {AUTHENTICATE_ROUTE} from 'navigation/config/routes';
import React from 'react';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigationConfigs}>
      <Stack.Screen
        name={AUTHENTICATE_ROUTE.LOGIN_SCREEN}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
