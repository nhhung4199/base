import i18next from 'i18next';
import * as React from 'react';
import {memo} from 'react';
import isEqual from 'react-fast-compare';
import {Normalize, useTranslation} from 'react-i18next';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Resource} from 'utilities/i18next';

export type I18Type = Normalize<Resource>;
interface StyledTextProps extends TextProps {
  customStyle?: StyleProp<TextStyle>;
  i18nParams?: any;
}

interface StyledTextWithOriginValue extends StyledTextProps {
  originText: string;
  i18nText?: never;
}

interface StyledTextWithI18nValue extends StyledTextProps {
  originText?: never;
  i18nText: I18Type;
}

type StyledTextCombineProps =
  | StyledTextWithOriginValue
  | StyledTextWithI18nValue;

const StyledText = (props: StyledTextCombineProps) => {
  const {t} = useTranslation();
  const {originText, i18nText, i18nParams, customStyle} = props;
  let value: any;

  if (originText) {
    value = originText;
  } else if (i18nText || i18next.exists(i18nText || '', i18nParams)) {
    value = t(i18nText as I18Type, i18nParams);
  } else {
    value = i18nText || '';
  }

  return (
    <Text style={[styles.text, customStyle]} {...props}>
      {value}
    </Text>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: '14@ms',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(StyledText, isEqual);
