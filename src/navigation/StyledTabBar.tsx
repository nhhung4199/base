import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
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
            {isFocused ? options?.icon_active : options?.icon}
            <StyledText
              i18nText={options?.title}
              customStyle={[
                styles.label,
                {
                  color: isFocused
                    ? Themes.Light.COLORS.black
                    : Themes.Light.COLORS.gray,
                },
              ]}
              numberOfLines={1}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = ScaledSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingBottom: Metrics.safeBottomPadding,
    shadowColor: Themes.Light.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Themes.Light.COLORS.white,
    alignItems: 'center',
  },
  tabButton: {
    marginHorizontal: 5,
    paddingTop: '5@vs',
    alignItems: 'center',
    flex: 1,
    borderTopWidth: '2@vs',
    borderTopColor: Themes.Light.COLORS.white,
  },
  tabIcon: {
    width: '20@ms',
    height: '20@ms',
    resizeMode: 'contain',
  },
  label: {
    fontSize: '10@ms',
    marginTop: '5@vs',
  },
});

export default StyledTabBar;
