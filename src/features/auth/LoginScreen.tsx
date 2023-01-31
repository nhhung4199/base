import StyledTextInputForm from 'components/common/StyledTextInputForm';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';

const LoginScreen = () => {
  const {control, handleSubmit} = useForm({reValidateMode: 'onChange'});
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <StyledTextInputForm control={control} name={'username'} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
