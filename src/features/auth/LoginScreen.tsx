import IconUser from 'assets/svgs/ic_user.svg';
import StyledButton from 'components/base/StyledButton';
import {StyledTextInputForm} from 'components/common/StyledTextInputForm';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Metrics from 'utilities/metric';
const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      username: __DEV__ ? 'nhhung4199@gmail.com' : '',
      password: __DEV__ ? 'Hanoi@123' : '',
    },
  });
  const {control, handleSubmit} = form;

  const submit = async data => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.body}>
        <StyledTextInputForm
          iconLeft={<IconUser />}
          control={control}
          name={'username'}
          placeholderTx={'Tên đăng nhập'}
          rules={{
            required: {
              value: true,
              message: 'Tên đăng nhập không được bỏ trống',
            },
          }}
        />

        <StyledButton
          title={'button.login'}
          onPress={handleSubmit(submit)}
          customStyle={styles.buttonSubmit}
          loading={loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: '35@s',
    paddingTop: Metrics.safeTopPadding + Dimensions.get('screen').height / 3,
  },

  buttonSubmit: {
    alignSelf: 'center',
    paddingHorizontal: '30@s',
    marginTop: '30@vs',
  },
});
