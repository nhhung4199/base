import {adminGetDailyStatistics} from 'api/model/admin';
import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const Statistical = ({targetDay}) => {
  const [data, setData] = useState<any>();
  const placeId = useSelector((state: any) => state?.userReducer?.place?.id);
  const getData = async () => {
    try {
      const res = await adminGetDailyStatistics({targetDay, placeId});
      setData(res);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [targetDay, placeId]);
  return (
    <View style={styles.container}>
      <StyledText
        i18nText="labels.riceProductivityTotal"
        i18nParams={{date: moment(targetDay).format('DD/MM')}}
        customStyle={styles.title}
      />
      <View style={styles.body}>
        <View style={styles.buttonLeft}>
          <View style={styles.viewLabel}>
            <StyledText i18nText="labels.lunch" customStyle={styles.label} />
          </View>
          <View style={styles.viewCount}>
            <StyledText
              originText={`${data?.morningMealsCount || 0}`}
              customStyle={styles.count}
            />
          </View>
        </View>
        <View style={styles.buttonRight}>
          <View style={styles.viewLabel}>
            <StyledText
              i18nText="labels.afternoon"
              customStyle={styles.label}
            />
          </View>
          <View style={styles.viewCount}>
            <StyledText
              originText={`${data?.afternoonMealsCount || 0}`}
              customStyle={styles.count}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Statistical;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Themes.Light.COLORS.white,
    paddingVertical: '20@vs',
    paddingHorizontal: '12@s',
  },
  title: {
    fontFamily: Themes.Fonts.bold,
    fontSize: '18@ms',
    color: Themes.Light.COLORS.primary,
    textAlign: 'center',
  },
  body: {
    flexDirection: 'row',
    marginTop: '18@vs',
  },
  buttonLeft: {
    borderRadius: '5@ms',
    overflow: 'hidden',
    flex: 1,
    marginRight: '16@s',
  },
  viewLabel: {
    backgroundColor: Themes.Light.COLORS.accent04,
    paddingVertical: '5@vs',
    alignItems: 'center',
  },
  label: {
    color: Themes.Light.COLORS.accent01,
  },
  buttonRight: {
    borderRadius: '5@ms',
    overflow: 'hidden',
    flex: 1,
  },
  viewCount: {
    backgroundColor: Themes.Light.COLORS.accent01,
    paddingTop: '10@vs',
    paddingBottom: '12@vs',
    alignItems: 'center',
  },
  count: {
    fontFamily: Themes.Fonts.bold,
    fontSize: '18@ms',
    color: Themes.Light.COLORS.white,
  },
});
