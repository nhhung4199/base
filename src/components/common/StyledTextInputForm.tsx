import React, {useState} from 'react';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import {
  KeyboardType,
  Pressable,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import StyledText, {I18Type} from '../base/StyledText';
interface StyledTextInputFormProps {
  control: Control;
  name: string;
  rules?: RegisterOptions;
  onPress?(): void;
  onPressRight?(): void;
  customStyle?: StyleProp<ViewStyle>;
  customStyleInput?: StyleProp<TextStyle>;
  placeholderTx?: any;
  multiline?: boolean;
  isPassword?: boolean;
  editable?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardType;
  iconLeft?: any;
  iconRight?: any;
  textAlign?: 'center' | 'left' | 'right' | undefined;
  placeholderTextColor?: string;
}

const StyledTextInputForm = (props: StyledTextInputFormProps) => {
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
    placeholderTextColor,
  } = props;

  const [showSecure, setShowSecure] = useState(isPassword);

  const {field, fieldState} = useController({
    name,
    rules,
    control,
  });

  return (
    <View style={styles.container}>
      <Pressable
        disabled={!editable}
        onPress={onPress}
        style={[styles.body, customStyle]}>
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
        {iconRight}
      </Pressable>
      {fieldState?.error && (
        <StyledText
          i18nText={fieldState?.error.message as I18Type}
          customStyle={styles.txtError}
        />
      )}
    </View>
  );
};
export default React.memo(StyledTextInputForm);
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
  },
  txtError: {
    color: 'red',
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
