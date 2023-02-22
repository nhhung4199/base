import {useFocusEffect} from '@react-navigation/native';
import {getSettingApi} from 'api/model/setting';
import IconClock from 'assets/svgs/ic_clock.svg';
import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import {TAB_NAVIGATION_ROOT} from 'navigation/config/routes';
import {navigate} from 'navigation/NavigationService';
import React, {useCallback, useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
interface Props {
  customStyle?: StyleProp<ViewStyle>;
}
const TimeReportCrop = ({customStyle}: Props) => {
  const [data, setData] = useState<any>();
  const editTime = () => {
    navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.EDIT_TIME_SCREEN);
  };
  const getData = async () => {
    try {
      const res = await getSettingApi();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  return (
    <View>
      <StyledText i18nText="labels.timeReportCrop" customStyle={styles.title} />
      <View style={styles.container}>
        <View style={[styles.actionLeft, customStyle]}>
          <View style={styles.top}>
            <StyledText
              i18nText="labels.reportRice"
              customStyle={styles.label}
            />
            <TouchableOpacity onPress={editTime}>
              <IconClock />
            </TouchableOpacity>
          </View>
          <StyledText
            originText={data?.attendingTime}
            customStyle={styles.input}
          />
        </View>
        <View style={[styles.actionRight, customStyle]}>
          <View style={styles.top}>
            <StyledText i18nText="labels.cropRice" customStyle={styles.label} />
            <TouchableOpacity onPress={editTime}>
              <IconClock />
            </TouchableOpacity>
          </View>
          <StyledText
            originText={data?.cancelingTime}
            customStyle={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

export default TimeReportCrop;

const styles = ScaledSheet.create({
  title: {
    fontFamily: Themes.Fonts.bold,
    fontSize: '18@ms',
    textAlign: 'center',
    marginTop: '40@vs',
    color: Themes.Light.COLORS.primary,
  },
  container: {
    flexDirection: 'row',
    marginTop: '15@vs',
  },
  actionLeft: {
    backgroundColor: Themes.Light.COLORS.white,
    flex: 1,
    marginRight: '8@s',
    borderRadius: '5@ms',
    paddingHorizontal: '14@s',
    paddingVertical: '7@vs',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionRight: {
    backgroundColor: Themes.Light.COLORS.white,
    flex: 1,
    borderRadius: '5@ms',
    paddingHorizontal: '14@s',
    paddingVertical: '7@vs',
  },
  input: {
    fontSize: '20@ms',
    fontFamily: Themes.Fonts.bold,
    marginTop: '8@vs',
  },
  label: {
    color: Themes.Light.COLORS.primary,
    fontFamily: Themes.Fonts.bold,
  },
});
