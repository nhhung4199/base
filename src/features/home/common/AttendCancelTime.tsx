import {useFocusEffect} from '@react-navigation/native';
import {getMealCloseTargetDay} from 'api/model/user';
import {Themes} from 'assets/themes';
import ModalSelectPlace from 'components/modal/ModalSelectPlace';
import moment from 'moment';
import {TAB_NAVIGATION_ROOT} from 'navigation/config/routes';
import {navigate} from 'navigation/NavigationService';
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import dummyData from 'utilities/dummyData';
import {
  getAttended,
  getCancel,
  getStatusDisableAttend,
  getStatusDisableCancel,
  getSubTitleAttend,
  getSubTitleCancel,
} from 'utilities/helper';
import ButtonAction from './ButtonAction';

const AttendCancelTime = ({targetDay}) => {
  const modalPlaceRef = useRef<any>();
  const setting = useSelector((state: any) => state?.resourceReducer?.setting);
  const refInternal = useRef<any>();
  const [status, setStatus] = useState({
    afternoonAttended: false,
    afternoonCanceled: false,
    morningAttended: false,
    morningCanceled: false,
  });

  const onPressAttend = () => {
    modalPlaceRef.current.showModal({
      submit: () =>
        navigate(TAB_NAVIGATION_ROOT.HISTORY_ROUTE.HISTORY_SCREEN, {
          actionType: dummyData.attend,
        }),
    });
  };

  const onPressCancel = () => {
    modalPlaceRef.current.showModal({
      submit: () =>
        navigate(TAB_NAVIGATION_ROOT.HISTORY_ROUTE.HISTORY_SCREEN, {
          actionType: dummyData.cancel,
        }),
    });
  };

  const realTime = () => {
    refInternal.current = setInterval(loop, 30000);
  };

  useFocusEffect(
    useCallback(() => {
      clearInterval(refInternal.current);
      loop();
      realTime();
      return () => clearInterval(refInternal.current);
    }, [targetDay]),
  );

  const loop = async () => {
    try {
      if (!setting) return;
      const res: any = await getMealCloseTargetDay(
        moment(targetDay).add(1, 'days').format('YYYY-MM-DD'),
      );
      setStatus(res);
    } catch (error) {
      setStatus({
        afternoonAttended: false,
        afternoonCanceled: false,
        morningAttended: false,
        morningCanceled: false,
      });
    }
  };

  return (
    <View style={styles.actionRow}>
      <ButtonAction
        title="labels.reportRice"
        subTitle={getSubTitleAttend(setting, targetDay)}
        onPress={onPressAttend}
        status={getAttended(status)}
        show={getStatusDisableAttend(status)}
        date={moment(targetDay).add(1, 'day').format('DD/MM')}
      />
      <ButtonAction
        show={getStatusDisableCancel(status)}
        status={getCancel(status)}
        title="labels.cropRice"
        subTitle={getSubTitleCancel(setting, targetDay)}
        onPress={onPressCancel}
        customStyleTitle={{color: Themes.Light.COLORS.red}}
        date={moment(targetDay).add(1, 'day').format('DD/MM')}
      />
      <ModalSelectPlace ref={modalPlaceRef} />
    </View>
  );
};

export default AttendCancelTime;

const styles = ScaledSheet.create({
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: '12@s',
    marginTop: '30@vs',
  },
});
