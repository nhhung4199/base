import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const ButtonAction = ({
  title,
  subTitle,
  onPress,
  customStyleTitle = {},
  status,
  show,
  date,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonAction, show && {opacity: 1}]}
      onPress={onPress}>
      <StyledText
        i18nText={title}
        customStyle={[styles.dateAction, customStyleTitle]}
      />
      <StyledText originText={date} customStyle={styles.titleAction} />
      <StyledText originText={status} customStyle={styles.status} />

      <StyledText originText={subTitle} customStyle={styles.noteAction} />
    </TouchableOpacity>
  );
};

export default ButtonAction;

const styles = ScaledSheet.create({
  buttonAction: {
    backgroundColor: Themes.Light.COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 4,
    padding: '14@ms',
    borderRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: Themes.Light.COLORS.neutral03,
    opacity: 0.5,
  },
  titleAction: {
    fontFamily: Themes.Fonts.bold,
    fontSize: '20@ms',
    marginVertical: '4@vs',
  },
  noteAction: {
    fontSize: '8@ms',
  },
  dateAction: {
    fontFamily: Themes.Fonts.bold,
    color: Themes.Light.COLORS.primary,
  },
  status: {
    fontSize: '10@ms',
    color: Themes.Light.COLORS.accent01,
    marginBottom: '4@vs',
  },
});
