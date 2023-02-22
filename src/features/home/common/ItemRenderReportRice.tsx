import IconTickCircle from 'assets/svgs/ic_tick_circle.svg';
import StyledText from 'components/base/StyledText';
import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
const ItemRenderReportRice = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        <StyledText originText={item?.fullName} customStyle={styles.label} />
      </View>
      <View style={styles.col2}>
        <StyledText
          originText={item?.departmentName}
          customStyle={styles.label}
        />
      </View>
      <View style={styles.col3}>
        {item?.morningAttended && <IconTickCircle />}
      </View>
      <View style={styles.col4}>
        {item?.afternoonAttended && <IconTickCircle />}
      </View>
    </View>
  );
};

export default ItemRenderReportRice;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  col1: {
    flex: 119,
    paddingVertical: '15@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col2: {
    flex: 70,
    borderRightWidth: 1,
    paddingVertical: '15@vs',
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col3: {
    flex: 78,
    paddingVertical: '15@vs',
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col4: {
    flex: 78,
    paddingVertical: '15@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingHorizontal: '5@s',
  },
});
