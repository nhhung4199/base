import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Images from 'assets';
import HomeScreen from 'features/home/HomeScreen';
import navigationConfigs from 'navigation/config/options';
import React from 'react';
import {TAB_NAVIGATION_ROOT} from '../../navigation/config/routes';
import StyledTabBar from '../StyledTabBar';
const MainTab = createBottomTabNavigator();

const MainTabContainer = () => {
  const ArrayTabs = [
    {
      name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
      component: HomeScreen,
      title: 'Home',
      icon: Images.ic_home,
      icon_active: Images.ic_home_active,
    },
    {
      name: TAB_NAVIGATION_ROOT.CATEGORY_ROUTE.ROOT,
      component: HomeScreen,
      title: 'Home',
      icon: Images.ic_home,
      icon_active: Images.ic_home_active,
    },
    {
      name: TAB_NAVIGATION_ROOT.PROFILE_ROUTE.ROOT,
      component: HomeScreen,
      title: 'Home',
      icon: Images.ic_home,
      icon_active: Images.ic_home_active,
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
