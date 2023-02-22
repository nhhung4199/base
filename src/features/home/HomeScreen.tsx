import StyledText from 'components/base/StyledText';
import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StyledText i18nText={'bottomTab.home'} />
    </View>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
