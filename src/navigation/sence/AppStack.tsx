import {createStackNavigator} from '@react-navigation/stack';
import {stackNavigationConfigs} from 'navigation/config/options';
import {APP_ROUTE} from 'navigation/config/routes';
import React from 'react';
import {StyleSheet} from 'react-native';
import MainTabContainer from './TabSence';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigationConfigs}>
      <Stack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
