import {useFocusEffect} from '@react-navigation/native';
import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import moment from 'moment';
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const Clock = () => {
  const [time, setTime] = useState(moment().format('HH:mm'));
  const ref = useRef<any>();
  const realTime = () => {
    ref.current = setInterval(() => {
      setTime(moment().format('HH:mm'));
    }, 30000);
  };
  useFocusEffect(
    useCallback(() => {
      realTime();
      return () => clearInterval(ref.current);
    }, []),
  );
  return (
    <View style={styles.container}>
      <StyledText originText={time} customStyle={styles.text} />
    </View>
  );
};

export default React.memo(Clock);

const styles = ScaledSheet.create({
  container: {
    borderWidth: 0.7,
    borderRadius: '2@ms',
    paddingHorizontal: '10@s',
    paddingVertical: '6@vs',
  },
  text: {
    fontFamily: Themes.Fonts.bold,
    fontSize: '20@ms',
  },
});
