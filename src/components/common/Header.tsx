import {Themes} from 'assets/themes';
import StyledText, {I18Type} from 'components/base/StyledText';
import {goBack} from 'navigation/NavigationService';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Metrics from 'utilities/metric';
interface Props {
  title?: I18Type | any;
  onPressLeft?(): void;
  iconRight?: any;
  iconLeft?: any;
  customStyle?: StyleProp<ViewStyle>;
  onPressRight?(): void;
}
const Header = ({
  title,
  onPressLeft,
  iconRight,
  iconLeft,
  customStyle,
  onPressRight,
}: Props) => {
  const back = async () => {
    try {
      if (onPressLeft) {
        onPressLeft();
        return;
      }
      goBack();
    } catch (error) {}
  };

  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.left}>
        {iconLeft && (
          <TouchableOpacity style={styles.buttonLeft} onPress={back}>
            {iconLeft}
          </TouchableOpacity>
        )}
      </View>
      <StyledText i18nText={title} customStyle={styles.title} />
      <View style={styles.right}>
        {iconRight && (
          <TouchableOpacity style={styles.buttonRight} onPress={onPressRight}>
            {iconRight}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = ScaledSheet.create({
  container: {
    paddingTop: Metrics.safeTopPadding,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '10@ms',
    backgroundColor: Themes.Light.COLORS.white,
  },

  title: {
    color: Themes.Light.COLORS.black,
    textAlign: 'center',
    fontSize: '20@ms',
    fontFamily: Themes.Fonts.bold,
  },

  buttonRight: {
    paddingRight: '16@ms',
  },
  buttonLeft: {
    paddingLeft: '16@ms',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
