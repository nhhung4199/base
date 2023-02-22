import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import IconHome from 'assets/svgs/ic_home.svg';
import IconHomeActive from 'assets/svgs/ic_home_active.svg';
import IconProfile from 'assets/svgs/ic_profile.svg';
import IconProfileActive from 'assets/svgs/ic_profile_active.svg';
import IconReceiptEdit from 'assets/svgs/ic_receipt_edit.svg';
import IconReceiptEditActive from 'assets/svgs/ic_receipt_edit_active.svg';
import IconSetting from 'assets/svgs/ic_setting.svg';
import IconSettingActive from 'assets/svgs/ic_setting_active.svg';
import HomeScreen from 'features/home/HomeScreen';
import ProfileScreen from 'features/profile/ProfileScreen';
import SettingScreen from 'features/setting/SettingScreen';
import StatisticalScreen from 'features/statistical/StatisticalScreen';
import navigationConfigs from 'navigation/config/options';
import React from 'react';
import {TAB_NAVIGATION_ROOT} from '../../navigation/config/routes';
import StyledTabBar from '../StyledTabBar';

const MainStack = createStackNavigator();

const MainTab = createBottomTabNavigator();

const HomeStack = () => (
  <MainStack.Navigator screenOptions={navigationConfigs}>
    <MainStack.Screen
      name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_SCREEN}
      component={HomeScreen}
    />
  </MainStack.Navigator>
);

const SettingStack = () => (
  <MainStack.Navigator screenOptions={navigationConfigs}>
    <MainStack.Screen
      name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.SETTING_SCREEN}
      component={SettingScreen}
    />
  </MainStack.Navigator>
);

const StatisticalStack = () => (
  <MainStack.Navigator screenOptions={navigationConfigs}>
    <MainStack.Screen
      name={TAB_NAVIGATION_ROOT.STATISTICAL_ROUTE.STATISTICAL_SCREEN}
      component={StatisticalScreen}
    />
  </MainStack.Navigator>
);

const ProfileStack = () => (
  <MainStack.Navigator screenOptions={navigationConfigs}>
    <MainStack.Screen
      name={TAB_NAVIGATION_ROOT.PROFILE_ROUTE.PROFILE_SCREEN}
      component={ProfileScreen}
    />
  </MainStack.Navigator>
);
const MainTabContainer = () => {
  const ArrayTabs = [
    {
      name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
      component: HomeStack,
      title: 'bottomTab.home',
      icon: <IconHome />,
      icon_active: <IconHomeActive />,
    },
    {
      name: TAB_NAVIGATION_ROOT.STATISTICAL_ROUTE.ROOT,
      component: StatisticalStack,
      title: 'bottomTab.statistical',
      icon: <IconReceiptEdit />,
      icon_active: <IconReceiptEditActive />,
    },
    {
      name: TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT,
      component: SettingStack,
      title: 'bottomTab.setting',
      icon: <IconSetting />,
      icon_active: <IconSettingActive />,
    },
    {
      name: TAB_NAVIGATION_ROOT.PROFILE_ROUTE.ROOT,
      component: ProfileStack,
      title: 'bottomTab.profile',
      icon: <IconProfile />,
      icon_active: <IconProfileActive />,
    },
  ];

  return (
    <MainTab.Navigator
      backBehavior={'order'}
      screenOptions={navigationConfigs}
      tabBar={props => <StyledTabBar {...props} />}>
      {ArrayTabs.map((item, index) => (
        <MainTab.Screen
          key={`${index}`}
          options={({navigation}) => {
            const {routes} = navigation.getState();
            const {state} = routes[index];
            if (state) {
              if (state.index !== 0) {
                return {
                  title: item.title,
                  icon: item.icon,
                  tabBarVisible: false,
                  icon_active: item?.icon_active,
                };
              }
            }
            return {
              title: item.title,
              icon: item.icon,
              tabBarVisible: true,
              icon_active: item?.icon_active,
            };
          }}
          {...item}
        />
      ))}
    </MainTab.Navigator>
  );
};

export default MainTabContainer;
