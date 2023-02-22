import IconHide from 'assets/svgs/ic_hide.svg';
import IconShow from 'assets/svgs/ic_show.svg';

import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {
  KeyboardType,
  Pressable,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Themes} from '../../assets/themes';
import StyledText from '../base/StyledText';
interface StyledTextInputFormProps {
  control: any;
  name: string;
  rules?: any;
  onPress?(): void;
  iconRight?: any;
  customStyle?: StyleProp<ViewStyle>;
  customStyleInput?: StyleProp<TextStyle>;
  placeholderTx?: any;
  multiline?: number;
  isPassword?: boolean;
  editable?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardType;
  iconLeft?: any;
  textAlign?: string;
  placeholderTextColor?: any;
}
export const StyledTextInputForm = React.memo(
  (props: StyledTextInputFormProps) => {
    return <ControlledTextField {...props} />;
  },
);

/**
 * A component which has a label and an input together.
 */
const ControlledTextField = props => {
  const {
    name,
    placeholderTx,
    isPassword,
    control,
    rules,
    multiline,
    onPress,
    iconRight,
    customStyle,
    customStyleInput,
    editable = true,
    maxLength,
    keyboardType,
    iconLeft,
    textAlign,
    placeholderTextColor = Themes.Light.COLORS.gray,
  } = props;

  const [showSecure, setShowSecure] = useState(isPassword);

  const {field, fieldState}: any = useController({
    name,
    rules,
    control,
  });

  const toggleSecure = () => {
    setShowSecure(showSecure => !showSecure);
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          styles.body,
          {
            borderColor: fieldState?.error
              ? Themes.Light.COLORS.red
              : Themes.Light.COLORS.black,
          },
          customStyle,
        ]}>
        {iconLeft}
        <TextInput
          pointerEvents={editable ? undefined : 'none'}
          style={[styles.input, customStyleInput]}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholderTx}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          multiline={multiline}
          editable={editable}
          secureTextEntry={showSecure}
          maxLength={maxLength}
          keyboardType={keyboardType}
          textAlign={textAlign}
        />
        {isPassword && (
          <TouchableOpacity onPress={toggleSecure}>
            {showSecure ? <IconHide /> : <IconShow />}
          </TouchableOpacity>
        )}

        {iconRight}
      </Pressable>
      {fieldState?.error && (
        <StyledText
          i18nText={fieldState?.error.message}
          customStyle={styles.txtError}
        />
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  body: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: '10@ms',
    alignItems: 'center',
    paddingHorizontal: '16@ms',
  },
  input: {
    paddingVertical: '15@ms',
    flex: 1,
    paddingHorizontal: '10@s',
  },
  txtError: {
    color: Themes.Light.COLORS.red,
    paddingTop: '5@ms',
  },
  eye: {
    width: '16@ms',
    height: '16@ms',
  },
  label: {
    marginBottom: '5@ms',
  },
  customStyleIconLeft: {
    width: '16@ms',
    height: '16@ms',
    marginLeft: '10@s',
  },
  container: {
    marginTop: '16@vs',
  },
});
