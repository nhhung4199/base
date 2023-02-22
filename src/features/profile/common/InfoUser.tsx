import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const InfoUser = ({value, icon, label}) => {
  return (
    <View style={styles.container}>
      {icon}
      <StyledText i18nText={label} customStyle={styles.label} />
      <StyledText originText={value} customStyle={styles.value} />
    </View>
  );
};

export default InfoUser;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '14@vs',
    borderBottomWidth: 0.75,
    borderBottomColor: Themes.Light.COLORS.neutral02,
  },
  label: {
    flex: 1,
    marginHorizontal: '14@s',
    color: Themes.Light.COLORS.neutral01,
  },
  value: {
    color: Themes.Light.COLORS.neutral01,
  },
});
