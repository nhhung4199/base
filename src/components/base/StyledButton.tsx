import {Themes} from 'assets/themes';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import StyledText, {I18Type} from './StyledText';
interface StyledTextProps {
  title: I18Type;
  onPress(): void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleTitle?: StyleProp<TextStyle>;
  disable?: boolean;
  loading?: boolean;
  i18nParams?: any;
}
const StyledButton = ({
  title,
  onPress,
  customStyle,
  disable,
  customStyleTitle,
  loading,
  i18nParams,
}: StyledTextProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, customStyle]}
      disabled={disable || loading}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <StyledText
          i18nText={title}
          customStyle={[styles.title, customStyleTitle]}
          i18nParams={i18nParams}
        />
      )}
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '13@vs',
    alignItems: 'center',
    borderRadius: '4@ms',
    backgroundColor: Themes.Light.COLORS.black,
    flexDirection: 'row',
    justifyContent: 'center',
    lineHeight: '18@ms',
  },
  title: {
    color: Themes.Light.COLORS.white,
    // fontFamily: Themes.Fonts.bold,
  },
});
