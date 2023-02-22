import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  values?: string[];
  initialSelected?: string;
  onSelected?(value: string): void;
  disabled?: boolean;
}

export const RadioButton = (props: Props) => {
  const {
    values = [],
    initialSelected = values[0],
    onSelected = () => {},
    disabled,
  } = props;
  const [x, setX] = useState(initialSelected);
  const onChangeSelected = value => {
    onSelected(value);
    setX(value);
  };
  return (
    <View style={[styles.container]}>
      {values.map((item: any, index) => {
        return (
          <View key={index} style={styles.ratioFemale}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => !disabled && onChangeSelected(item)}>
              <View style={styles.btnRatio}>
                {item === x ? <View style={styles.ratioCircle} /> : null}
              </View>
              <StyledText i18nText={item} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratioFemale: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '30@s',
  },
  btnRatio: {
    height: '24@ms',
    width: '24@ms',
    borderRadius: '12@ms',
    borderWidth: 1,
    borderColor: Themes.Light.COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10@ms',
  },
  ratioCircle: {
    height: '16@ms',
    width: '16@ms',
    borderRadius: '8@ms',
    backgroundColor: Themes.Light.COLORS.black,
  },
});
