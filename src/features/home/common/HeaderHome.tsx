import Images from 'assets/images';
import {Themes} from 'assets/themes';
import StyledText from 'components/base/StyledText';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from 'state-management/userReducer/action';

const HeaderHome = () => {
  const place = useSelector((state: any) => state?.resourceReducer?.place);
  const placeIdUser = useSelector(
    (state: any) => state?.userReducer?.place?.id,
  );
  const dispatch = useDispatch();
  const onPress = place => {
    dispatch(setUserInfo({place}));
  };
  return (
    <View style={styles.header}>
      <FastImage source={Images.logo_EVN_row} style={styles.logo} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: Themes.Light.COLORS.neutral03,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.switch}>
        {place?.map(item => (
          <TouchableOpacity
            key={item?.id}
            onPress={() => {
              onPress(item);
            }}
            style={[
              styles.optionHeader,
              placeIdUser === item?.id && {
                backgroundColor: Themes.Light.COLORS.primary,
              },
            ]}>
            <StyledText
              originText={item?.name}
              customStyle={styles.textHeader}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HeaderHome;

const styles = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '16@s',
  },
  logo: {
    width: '120@ms',
    height: '32@ms',
  },
  switch: {
    flexDirection: 'row',
    borderRadius: '3@ms',
    overflow: 'hidden',
    marginLeft: '50@s',
  },
  optionHeader: {
    paddingHorizontal: '8@s',
    paddingVertical: '4@vs',
  },
  textHeader: {
    fontFamily: Themes.Fonts.medium,
    fontSize: '12@ms',
    color: Themes.Light.COLORS.white,
  },
});
