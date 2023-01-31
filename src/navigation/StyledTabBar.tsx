import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Metrics from 'utilities/metric';
interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}
const StyledTabBar = (props: Props) => {
  const {state, descriptors, navigation} = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={[styles.tabButton]}>
            <Image
              source={isFocused ? options?.icon_active : options?.icon}
              style={styles.tabIcon}
            />
            <Text style={styles.label}>{options?.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingBottom: Metrics.safeBottomPadding,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  tabButton: {
    marginHorizontal: 5,
    paddingTop: 5,
    alignItems: 'center',
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#ffffff',
  },
  tabIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 10,
    marginTop: 5,
  },
});

export default StyledTabBar;
